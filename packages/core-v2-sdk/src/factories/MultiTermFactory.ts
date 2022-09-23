// import { cached } from "@elementfi/base";
// import LRUCache from "lru-cache";
// import { ElementClient } from "src/client";
// import { MultiTerm } from "src/models/MultiTerm";
// import { YieldSource } from "src/models/YieldSource";
// import { Factory } from "./Factory";

// export class MultiTermFactory implements Factory<MultiTerm | null> {
//   client: ElementClient;
//   cache: LRUCache<string, any>;

//   constructor(client: ElementClient) {
//     this.client = client;
//     this.cache = new LRUCache({ max: 500 });
//   }

//   get(address: string): MultiTerm | null {
//     return cached({
//       cacheKey: address,
//       cache: this.cache,
//       callback: () => {
//         const multiPoolDataSource = this.client.context.multiPools.find(
//           (multiPool) => multiPool.multiTerm.address === address,
//         );
//         if (!multiPoolDataSource) {
//           return null;
//         }
//         const yieldSourceAddress =
//           multiPoolDataSource.multiTerm.yieldSource.address;
//         return new MultiTerm({
//           address,
//           yieldSource: this.client.yieldSources.get(
//             yieldSourceAddress,
//           ) as YieldSource,
//         });
//       },
//     });
//   }

//   getAll(): MultiTerm[] {
//     return [];
//   }
// }
