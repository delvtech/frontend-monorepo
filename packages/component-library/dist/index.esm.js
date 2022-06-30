import {jsx as $iKe9W$jsx} from "react/jsx-runtime";

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $7c4abec25e5caac1$exports = {};
var $4b922c411b6b6fb4$exports = {};

$parcel$export($4b922c411b6b6fb4$exports, "Button", () => $4b922c411b6b6fb4$export$353f5b6fc5456de1);

function $4b922c411b6b6fb4$export$353f5b6fc5456de1({ children: children , onClick: onClick  }) {
    return /*#__PURE__*/ (0, $iKe9W$jsx)("button", {
        className: "daisy-btn daisy-btn-outline daisy-btn-info",
        onClick: onClick,
        children: children
    });
}


var $ac5eabe48ee37674$exports = {};

$parcel$export($ac5eabe48ee37674$exports, "Toast", () => $ac5eabe48ee37674$export$8d8dc7d5f743331b);

function $ac5eabe48ee37674$export$8d8dc7d5f743331b({ message: message  }) {
    return /*#__PURE__*/ (0, $iKe9W$jsx)("div", {
        className: "daisy-alert max-w-md justify-center shadow-lg",
        children: /*#__PURE__*/ (0, $iKe9W$jsx)("span", {
            children: message
        })
    });
}


$parcel$exportWildcard($7c4abec25e5caac1$exports, $4b922c411b6b6fb4$exports);
$parcel$exportWildcard($7c4abec25e5caac1$exports, $ac5eabe48ee37674$exports);




export {$4b922c411b6b6fb4$export$353f5b6fc5456de1 as Button, $ac5eabe48ee37674$export$8d8dc7d5f743331b as Toast};
//# sourceMappingURL=index.esm.js.map
