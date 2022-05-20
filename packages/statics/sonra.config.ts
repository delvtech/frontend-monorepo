import { SonraConfig } from "sonra";
import { ElementModel, elementModel, elementFetch } from "./src";
import "tsconfig-paths/register"

const config: SonraConfig<ElementModel> = {
  dir: "sonra-types",
  model: elementModel,
  fetch: elementFetch,
};

export default config;
