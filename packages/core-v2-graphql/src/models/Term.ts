import { Term } from "src/generated";
import { V2Context } from "src/context";
import { getDataSourceByAddress } from "src/utils/getDataSourceByAddress";

interface TermModel {
  getAll: (options: { context: V2Context }) => (Term | undefined)[];
  getByAddress: (options: {
    address: string;
    context: V2Context;
  }) => Term | undefined;
}

export const TermModel: TermModel = {
  getAll({ context }) {
    return [
      {
        address: "0x1",
        name: "PLACEHOLDER TERM 1",
      },
      {
        address: "0x2",
        name: "PLACEHOLDER TERM 2",
      },
    ];
  },
  getByAddress({ address, context }) {
    const dataSource = getDataSourceByAddress(
      address,
      context.elementDataSources,
    );
    if (dataSource) {
      return {
        address: dataSource.address,
        name: "PLACEHOLDER TERM",
      };
    }
  },
};
