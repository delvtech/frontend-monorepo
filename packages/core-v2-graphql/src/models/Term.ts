import { CoreV2Context } from "src/context";
import { MultiTerm, Term } from "src/generated";

export const TermModel = {
  getByMaturity,
};

interface GetByMaturityOptions {
  maturity: string;
  multiTerm: MultiTerm;
  context: CoreV2Context;
}

function getByMaturity({
  maturity,
  multiTerm,
  context,
}: GetByMaturityOptions): Term | undefined {
  // TODO: look up term by multiterm and maturity
  return {
    id: "1",
    multiTerm,
    name: "Term 1",
    maturity,
  };
}
