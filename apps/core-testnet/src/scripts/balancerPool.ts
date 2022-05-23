// import { Signer } from "ethers";

// // TODO: Fix this import before uncommenting out this file
// import { BFactory } from "src/types/BFactory";
// import { BPool__factory } from "src/types/factories/BPool__factory";

// export async function deployBalancerPool(
//   bFactoryContract: BFactory,
//   signer: Signer
// ) {
//   await bFactoryContract.newBPool();
//   const bPoolContract = await getLastDeployedBPool(bFactoryContract, signer);

//   return bPoolContract;
// }

// // TODO: figure out a better way to get the bPool address
// const getLastDeployedBPool = async (
//   bFactoryContract: BFactory,
//   signer: Signer
// ) => {
//   const signerAddress = await signer.getAddress();
//   const filter = bFactoryContract.filters.LOG_NEW_POOL(signerAddress, null);
//   const results = await bFactoryContract.queryFilter(filter);
//   // ugly line to grab the second argument passed to the event, which is the pool address.
//   const bPoolAddress = results[results.length - 1]?.args?.pool as string;
//   const bPoolContract = BPool__factory.connect(bPoolAddress, signer);
//   await bPoolContract.deployed();

//   return bPoolContract;
// };
