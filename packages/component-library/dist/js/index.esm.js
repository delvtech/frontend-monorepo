import {jsx as $aCh37$jsx, jsxs as $aCh37$jsxs} from "react/jsx-runtime";
import $aCh37$classnames from "classnames";

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
var $fc442c0e59a07833$exports = {};


var $4b922c411b6b6fb4$exports = {};

$parcel$export($4b922c411b6b6fb4$exports, "Button", () => $4b922c411b6b6fb4$export$353f5b6fc5456de1);


function $4b922c411b6b6fb4$export$353f5b6fc5456de1({ children: children , variant: variant = "accent" , outline: outline , onClick: onClick  }) {
    return /*#__PURE__*/ (0, $aCh37$jsx)("button", {
        className: (0, $aCh37$classnames)("daisy-btn", {
            "daisy-btn-outline": outline,
            "daisy-btn-accent": variant === "accent",
            "daisy-btn-info": variant === "info",
            "daisy-btn-warning": variant === "warning",
            "daisy-btn-success": variant === "success",
            "daisy-btn-error": variant === "error"
        }),
        onClick: onClick,
        children: children
    });
}


var $ac5eabe48ee37674$exports = {};

$parcel$export($ac5eabe48ee37674$exports, "Toast", () => $ac5eabe48ee37674$export$8d8dc7d5f743331b);

function $ac5eabe48ee37674$export$8d8dc7d5f743331b({ message: message  }) {
    return /*#__PURE__*/ (0, $aCh37$jsx)("div", {
        className: "daisy-alert max-w-md justify-center shadow-lg",
        children: /*#__PURE__*/ (0, $aCh37$jsx)("span", {
            children: message
        })
    });
}


var $fa498bc7bee5d7e7$exports = {};

$parcel$export($fa498bc7bee5d7e7$exports, "Navbar", () => $fa498bc7bee5d7e7$export$42cfbb80f7861e77);

function $fa498bc7bee5d7e7$export$42cfbb80f7861e77({ children: children  }) {
    return /*#__PURE__*/ (0, $aCh37$jsx)("div", {
        className: "daisy-navbar bg-base-100",
        children: children
    });
}


var $24b747ab2140c055$exports = {};

$parcel$export($24b747ab2140c055$exports, "Card", () => $24b747ab2140c055$export$60332b2344f7fe41);
$parcel$export($24b747ab2140c055$exports, "CardTitle", () => $24b747ab2140c055$export$474db65c3c394e1c);

function $24b747ab2140c055$export$60332b2344f7fe41({ children: children  }) {
    return /*#__PURE__*/ (0, $aCh37$jsx)("div", {
        className: "daisy-card w-96 bg-neutral",
        children: /*#__PURE__*/ (0, $aCh37$jsx)("div", {
            className: "daisy-card-body",
            children: children
        })
    });
}
function $24b747ab2140c055$export$474db65c3c394e1c({ title: title , action: action  }) {
    return /*#__PURE__*/ (0, $aCh37$jsxs)("h2", {
        className: "daisy-card-title justify-between",
        children: [
            title,
            action
        ]
    });
}


$parcel$exportWildcard($7c4abec25e5caac1$exports, $4b922c411b6b6fb4$exports);
$parcel$exportWildcard($7c4abec25e5caac1$exports, $ac5eabe48ee37674$exports);
$parcel$exportWildcard($7c4abec25e5caac1$exports, $fa498bc7bee5d7e7$exports);
$parcel$exportWildcard($7c4abec25e5caac1$exports, $24b747ab2140c055$exports);
$parcel$exportWildcard($7c4abec25e5caac1$exports, $fc442c0e59a07833$exports);




export {$4b922c411b6b6fb4$export$353f5b6fc5456de1 as Button, $ac5eabe48ee37674$export$8d8dc7d5f743331b as Toast, $fa498bc7bee5d7e7$export$42cfbb80f7861e77 as Navbar, $24b747ab2140c055$export$60332b2344f7fe41 as Card, $24b747ab2140c055$export$474db65c3c394e1c as CardTitle};
//# sourceMappingURL=index.esm.js.map
