// import LRUCache from "lru-cache";
// import { cached } from "@elementfi/base";
// import { ElementClient } from "src/client";
// import { MultiPool } from "src/models/MultiPool";
// import { MultiTerm } from "src/models/MultiTerm";
// import { Factory } from "./Factory";

// export class MultiPoolFactory implements Factory<MultiPool | null> {
//   client: ElementClient;
//   cache: LRUCache<string, any>;

//   constructor(client: ElementClient) {
//     this.client = client;
//     this.cache = new LRUCache({ max: 500 });
//   }

//   get(address: string): MultiPool | null {
//     return cached({
//       cacheKey: address,
//       cache: this.cache,
//       callback: () => {
//         const dataSource = this.client.context.multiPools.find(
//           (multiPool) => multiPool.address === address,
//         );
//         if (!dataSource) {
//           return null;
//         }
//         const multiTermAddress = dataSource.multiTerm.address;
//         return new MultiPool({
//           address,
//           multiTerm: this.client.multiTerms.get(multiTermAddress) as MultiTerm,
//         });
//       },
//     });
//   }

//   getAll(): MultiPool[] {
//     return [];
//   }
// }
