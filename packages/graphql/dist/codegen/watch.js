"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var md5_1 = __importDefault(require("md5"));
var minimatch_1 = __importDefault(require("minimatch"));
/**
 * A function to watch a given path and call a handler whenever a change is made.
 * @param path A path to watch for changes. The path can be a file, directory,
 *   or glob. Globs are matched using [minimatch](https://github.com/isaacs/minimatch).
 * @param handler The handler to call each time a file matching the path is
 *   changed.
 */
function watch(path, handler) {
    // create a set to carry the unique directory paths to watch.
    var watchDirs = new Set();
    // use minimatch to create a 2d array of matchers for the path glob.
    // e.g., "src/graphql/*.{gql,graphql}" results in:
    // [
    //   [ 'src', 'graphql', /^(?!\.)(?=.)[^/]*?\.gql$/ ],
    //   [ 'src', 'graphql', /^(?!\.)(?=.)[^/]*?\.graphql$/ ]
    // ]
    var pathMatchers = new minimatch_1.default.Minimatch(path).set;
    for (var _i = 0, pathMatchers_1 = pathMatchers; _i < pathMatchers_1.length; _i++) {
        var pathMatcher = pathMatchers_1[_i];
        var dirParts = [];
        for (var _a = 0, pathMatcher_1 = pathMatcher; _a < pathMatcher_1.length; _a++) {
            var part = pathMatcher_1[_a];
            // wildcard parts will be converted to RegExp objects or globstar symbols,
            // so we break the loop once we've reached the first non-string part to
            // get the closest directory we can watch.
            if (typeof part !== "string") {
                break;
            }
            dirParts.push(part);
        }
        watchDirs.add(path_1.default.join.apply(path_1.default, dirParts));
    }
    var _loop_1 = function (watchDir) {
        var previousMD5 = "";
        var timeout = null;
        // fs.watch uses underlying OS events to be notified asynchronously.
        fs_1.default.watch(watchDir, { recursive: true }, function (event, filename) {
            // string concatenation is used instead of path.join() here because
            // path.join strips out the leading `./` which causes patterns starting
            // with `./` to fail. So we can either strip the leading `./` from the
            // pattern or string concat.
            var changedPath = "".concat(watchDir, "/").concat(filename);
            var isMatch = (0, minimatch_1.default)(changedPath, path);
            // ignore renames
            if (isMatch && event === "change") {
                // The underlying event may be fired multiple times in the process of
                // saving the file so we debounce.
                if (timeout) {
                    return;
                }
                timeout = setTimeout(function () {
                    timeout = null;
                }, 100);
                // don't run if the file contents weren't changed.
                var currentMD5 = (0, md5_1.default)(fs_1.default.readFileSync(changedPath));
                if (currentMD5 === previousMD5) {
                    return;
                }
                previousMD5 = currentMD5;
                handler(changedPath);
            }
        });
    };
    for (var _b = 0, _c = Array.from(watchDirs); _b < _c.length; _b++) {
        var watchDir = _c[_b];
        _loop_1(watchDir);
    }
}
exports.watch = watch;
