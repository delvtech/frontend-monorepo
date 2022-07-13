import fs from "fs";
import Path from "path";
import md5 from "md5";
import minimatch from "minimatch";

/**
 * A function to watch a given path and call a handler whenever a change is made.
 * @param path A path to watch for changes. The path can be a file, directory,
 *   or glob. Globs are matched using [minimatch](https://github.com/isaacs/minimatch).
 * @param handler The handler to call each time a file matching the path is
 *   changed.
 */
export function watch(path: string, handler: (filename: string) => void): void {
  // create a set to carry the unique directory paths to watch.
  const watchDirs = new Set<string>();

  // use minimatch to create a 2d array of matchers for the path glob.
  // e.g., "src/graphql/*.{gql,graphql}" results in:
  // [
  //   [ 'src', 'graphql', /^(?!\.)(?=.)[^/]*?\.gql$/ ],
  //   [ 'src', 'graphql', /^(?!\.)(?=.)[^/]*?\.graphql$/ ]
  // ]
  const pathMatchers = new minimatch.Minimatch(path).set;

  for (const pathMatcher of pathMatchers) {
    const dirParts = [];
    for (const part of pathMatcher) {
      // wildcard parts will be converted to RegExp objects or globstar symbols,
      // so we break the loop once we've reached the first non-string part to
      // get the closest directory we can watch.
      if (typeof part !== "string") {
        break;
      }
      dirParts.push(part);
    }
    watchDirs.add(Path.join(...dirParts));
  }

  for (const watchDir of Array.from(watchDirs)) {
    let previousMD5 = "";
    let timeout: NodeJS.Timeout | null = null;

    // fs.watch uses underlying OS events to be notified asynchronously.
    fs.watch(watchDir, { recursive: true }, (event, filename) => {
      // string concatenation is used instead of path.join() here because
      // path.join strips out the leading `./` which causes patterns starting
      // with `./` to fail. So we can either strip the leading `./` from the
      // pattern or string concat.
      const changedPath = `${watchDir}/${filename}`;
      const isMatch = minimatch(changedPath, path);
      // ignore renames
      if (isMatch && event === "change") {
        // The underlying event may be fired multiple times in the process of
        // saving the file so we debounce.
        if (timeout) {
          return;
        }
        timeout = setTimeout(() => {
          timeout = null;
        }, 100);

        // don't run if the file contents weren't changed.
        const currentMD5 = md5(fs.readFileSync(changedPath));
        if (currentMD5 === previousMD5) {
          return;
        }
        previousMD5 = currentMD5;
        handler(changedPath);
      }
    });
  }
}
