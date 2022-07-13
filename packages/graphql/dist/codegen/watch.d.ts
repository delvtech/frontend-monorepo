/**
 * A function to watch a given path and call a handler whenever a change is made.
 * @param path A path to watch for changes. The path can be a file, directory,
 *   or glob. Globs are matched using [minimatch](https://github.com/isaacs/minimatch).
 * @param handler The handler to call each time a file matching the path is
 *   changed.
 */
export declare function watch(path: string, handler: (filename: string) => void): void;
