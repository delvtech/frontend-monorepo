import { IPFSData } from "./IPFSData";
const IPFS_BASE_URL = "https://ipfs.io/ipfs/";

export async function fetchIPFSData(ipfsHash: string): Promise<IPFSData> {
  const response = await fetch(`${IPFS_BASE_URL}${ipfsHash}`);
  const data = await response.json();
  return data as IPFSData;
}
