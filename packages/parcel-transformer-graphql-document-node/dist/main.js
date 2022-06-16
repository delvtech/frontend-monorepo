var $fo5Ih$parcelplugin = require("@parcel/plugin");
var $fo5Ih$graphql = require("graphql");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, "__esModule", { value: true, configurable: true });
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(
  module.exports,
  "default",
  () => $ccf926d2e52e99d1$export$2e2bcd8739ae039,
);

var $ccf926d2e52e99d1$export$2e2bcd8739ae039 = new (0,
$fo5Ih$parcelplugin.Transformer)({
  async transform({ asset: asset }) {
    const code = await asset.getCode();
    const source = new (0, $fo5Ih$graphql.Source)(code, asset.filePath);
    const document = (0, $fo5Ih$graphql.parse)(source);
    asset.type = "js";
    asset.setCode(`module.exports=${JSON.stringify(document)};`);
    return [asset];
  },
});

//# sourceMappingURL=main.js.map
