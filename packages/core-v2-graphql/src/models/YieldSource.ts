import { CoreV2Context } from "src/context";
import { YieldSource } from "src/generated";

export const YieldSourceModel = {
  getByName,
  getByNames,
};

interface GetByNameOptions {
  name: string;
  context: CoreV2Context;
}

function getByName({ name, context }: GetByNameOptions): YieldSource {
  // TODO: look up yield source by name (possibly from registry)
  return {
    name,
    protocol: "yearn",
    address: "0x0000000000000000000000000",
  };
}

interface GetByNamesOptions {
  names: string[];
  context: CoreV2Context;
}

function getByNames({
  names,
  context,
}: GetByNamesOptions): (YieldSource | undefined)[] {
  // TODO: look up yield source by name (possibly from registry)
  return names.map((name) => {
    return {
      name,
      protocol: "yearn",
      address: '"0xd1eda2c4213d9c63a6f48ee5fdb23b7991ad90a9"',
    };
  });
}
