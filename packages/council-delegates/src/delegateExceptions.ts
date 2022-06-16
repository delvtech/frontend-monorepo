import { Delegate } from "src/types";

const mainnetDelegateExceptions: Delegate[] = [
  {
    commonwealthCommentId: 17924,
    commonwealthName: "moshimo",
    commonwealthPostedFromAddress: "0x32C2741DC6621CcD32D868727bE74dCdC7aB332F",
    // moshimo is an exception because their post included an ENS instead of an
    // ethereum wallet address. Because ENS names can be re-assigned, a snapshot
    // of there ENS address has been taken. Note that it matches the commonwealthPostedFromAddress
    address: "0x32C2741DC6621CcD32D868727bE74dCdC7aB332F",
    createdAt: "2022-03-29T02:16:21.531Z",
  },
  {
    commonwealthCommentId: 19561,
    commonwealthName: "simona pop",
    commonwealthPostedFromAddress: "0x54BeCc7560a7Be76d72ED76a1f5fee6C5a2A7Ab6",
    // simona is an exception because their post included an ENS instead of an
    // ethereum wallet address. Because ENS names can be re-assigned, a snapshot
    // of there ENS address has been taken. Note that it matches the
    // commonwealthPostedFromAddress
    address: "0x54BeCc7560a7Be76d72ED76a1f5fee6C5a2A7Ab6",
    createdAt: "2022-04-30T09:24:29.359Z",
  },
];
