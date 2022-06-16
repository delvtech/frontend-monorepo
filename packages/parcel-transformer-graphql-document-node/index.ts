import { Transformer } from "@parcel/plugin";
import { parse, Source } from "graphql";

export default new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    const source = new Source(code, asset.filePath);
    const document = parse(source);

    asset.type = "js";
    asset.setCode(`module.exports=${JSON.stringify(document)};`);

    return [asset];
  },
});
