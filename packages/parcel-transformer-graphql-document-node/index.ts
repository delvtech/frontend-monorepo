import { Transformer } from "@parcel/plugin";
import { parse, Source } from "graphql";

/**
 * A custom Parcel transformer that converts GraphQL files into `DocumentNode`s
 *
 * This is needed because the plugin that is automatically installed by Parcel
 * for GraphQL files will cause the build to fail if the GraphQL doesn't
 * include any operations (e.g., queries, mutations).
 *
 * An important thing to note is that this transformer does not load other
 * GraphQL fragments imported with the `# import` syntax, while the default
 * GraphQL transformer does.
 */
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
