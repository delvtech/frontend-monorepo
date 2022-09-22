import { CoreV2Context } from "src/context";
import { MultiPoolGetter } from "src/getters/MultiPoolGetter";
import { MultiTermGetter } from "src/getters/MultiTermGetter";
import { YieldSourceGetter } from "src/getters/YieldSourceGetter";

export class ElementClient {
  context: CoreV2Context;
  multiPools: MultiPoolGetter;
  multiTerms: MultiTermGetter;
  yieldSources: YieldSourceGetter;

  constructor(context: CoreV2Context) {
    this.context = context;
    this.multiPools = new MultiPoolGetter(this);
    this.multiTerms = new MultiTermGetter(this);
    this.yieldSources = new YieldSourceGetter(this);
  }
}
