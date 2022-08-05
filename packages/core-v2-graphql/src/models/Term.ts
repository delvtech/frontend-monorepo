import { CoreV2Context } from "src/context";
import { Term, YieldSource } from "src/generated";
import { MultiTermModel } from "./MultiTerm";

interface GetByYieldSourceOptions {
  maturity: string;
  yieldSource: YieldSource;
  context: CoreV2Context;
}

function getByMaturity({
  maturity,
  yieldSource,
  context,
}: GetByYieldSourceOptions): Term | undefined {
  const multiTerm = MultiTermModel.getByYieldSource({
    yieldSource,
    context,
  });

  if (!multiTerm) {
    return undefined;
  }

  // TODO: look up term by yield source name and maturity
  return {
    id: "1",
    multiTerm,
    name: "Term 1",
    maturity,
    yieldSource,
  };
}

export const TermModel = {
  getByMaturity,
};
