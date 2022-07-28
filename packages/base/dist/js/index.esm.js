import {
  useEffect as $5vxKx$useEffect,
  useCallback as $5vxKx$useCallback,
  useMemo as $5vxKx$useMemo,
} from "react";
import { usePrevious as $5vxKx$usePrevious } from "react-use";
import $5vxKx$lodashisequal from "lodash.isequal";
import {
  parseUnits as $5vxKx$parseUnits,
  formatUnits as $5vxKx$formatUnits,
  commify as $5vxKx$commify,
} from "ethers/lib/utils";
import {
  FixedNumber as $5vxKx$FixedNumber,
  ethers as $5vxKx$ethers,
} from "ethers";
import { MerkleTree as $5vxKx$MerkleTree } from "merkletreejs";
import { Buffer as $5vxKx$Buffer } from "buffer";
import {
  useQueryClient as $5vxKx$useQueryClient,
  useQuery as $5vxKx$useQuery,
} from "react-query";
import { timeFormat as $5vxKx$timeFormat } from "d3-time-format";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}
var $67b205b0d34a74dc$exports = {};

$parcel$export(
  $67b205b0d34a74dc$exports,
  "EMPTY_ARRAY",
  () => $67b205b0d34a74dc$export$2c66e96878bf4792,
);
const $67b205b0d34a74dc$export$2c66e96878bf4792 = [];

var $2d3f595eb50fcfec$exports = {};

$parcel$export(
  $2d3f595eb50fcfec$exports,
  "useConsole",
  () => $2d3f595eb50fcfec$export$7b92a9e9dcf639e8,
);

function $2d3f595eb50fcfec$export$7b92a9e9dcf639e8(...consoleArgs) {
  const previousArgs = (0, $5vxKx$usePrevious)(consoleArgs);
  const changed = (0, $5vxKx$lodashisequal)(previousArgs, consoleArgs);
  (0, $5vxKx$useEffect)(() => {
    // eslint-disable-next-line no-console
    console.log(...consoleArgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);
}

var $d59bee517dec3a5e$exports = {};

$parcel$export(
  $d59bee517dec3a5e$exports,
  "ChainId",
  () => $d59bee517dec3a5e$export$c06e1e7429de6283,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "ETHEREUM_BLOCK_PER_DAY",
  () => $d59bee517dec3a5e$export$bb242f449f295e97,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "ETHEREUM_BLOCKS_PER_WEEK",
  () => $d59bee517dec3a5e$export$d2f565a827ab012f,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "ChainNames",
  () => $d59bee517dec3a5e$export$b3ea0c2306f884e1,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "DEFAULT_CHAIN_IDS",
  () => $d59bee517dec3a5e$export$aa618d5381c5cd48,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "isLocalnet",
  () => $d59bee517dec3a5e$export$f68b30b973603526,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "isGoerli",
  () => $d59bee517dec3a5e$export$112421be00e64d10,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "isMainnet",
  () => $d59bee517dec3a5e$export$5cb72704ec8022bd,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "NUM_ETH_DECIMALS",
  () => $d59bee517dec3a5e$export$199d09866564123d,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "ONE_ETHER",
  () => $d59bee517dec3a5e$export$99abd183ce604255,
);
$parcel$export(
  $d59bee517dec3a5e$exports,
  "ETH_ZERO_ADDRESS",
  () => $d59bee517dec3a5e$export$883ac2ca342d37f3,
);

let $d59bee517dec3a5e$export$c06e1e7429de6283;
(function (ChainId1) {
  ChainId1[(ChainId1["MAINNET"] = 1)] = "MAINNET";
  ChainId1[(ChainId1["GOERLI"] = 5)] = "GOERLI";
  ChainId1[(ChainId1["LOCAL"] = 31337)] = "LOCAL";
})(
  $d59bee517dec3a5e$export$c06e1e7429de6283 ||
    ($d59bee517dec3a5e$export$c06e1e7429de6283 = {}),
);
const $d59bee517dec3a5e$export$bb242f449f295e97 = 5760;
const $d59bee517dec3a5e$export$d2f565a827ab012f =
  $d59bee517dec3a5e$export$bb242f449f295e97 * 7;
const $d59bee517dec3a5e$export$b3ea0c2306f884e1 = {
  [$d59bee517dec3a5e$export$c06e1e7429de6283.MAINNET]: "Ethereum Mainnet",
  [$d59bee517dec3a5e$export$c06e1e7429de6283.GOERLI]: "Goerli Testnet",
  [$d59bee517dec3a5e$export$c06e1e7429de6283.LOCAL]: "Local development",
};
const $d59bee517dec3a5e$export$aa618d5381c5cd48 = [
  $d59bee517dec3a5e$export$c06e1e7429de6283.MAINNET,
  $d59bee517dec3a5e$export$c06e1e7429de6283.GOERLI,
  $d59bee517dec3a5e$export$c06e1e7429de6283.LOCAL,
];
function $d59bee517dec3a5e$export$f68b30b973603526(chainId) {
  return chainId === $d59bee517dec3a5e$export$c06e1e7429de6283.LOCAL;
}
function $d59bee517dec3a5e$export$112421be00e64d10(chainId) {
  return chainId === $d59bee517dec3a5e$export$c06e1e7429de6283.GOERLI;
}
function $d59bee517dec3a5e$export$5cb72704ec8022bd(chainId) {
  return (
    chainId === $d59bee517dec3a5e$export$c06e1e7429de6283.MAINNET ||
    (chainId === $d59bee517dec3a5e$export$c06e1e7429de6283.LOCAL && false)
  );
}
const $d59bee517dec3a5e$export$199d09866564123d = 18;
const $d59bee517dec3a5e$export$99abd183ce604255 = (0, $5vxKx$parseUnits)(
  "1",
  $d59bee517dec3a5e$export$199d09866564123d,
);
const $d59bee517dec3a5e$export$883ac2ca342d37f3 =
  "0x0000000000000000000000000000000000000000";

var $56b3c55af2bf5bcd$exports = {};

$parcel$export(
  $56b3c55af2bf5bcd$exports,
  "useLocalStorage",
  () => $56b3c55af2bf5bcd$export$86e2cef2561044ac,
);
function $56b3c55af2bf5bcd$export$86e2cef2561044ac() {
  const isBrowser = typeof window !== "undefined";
  const getItem = (key) => {
    return isBrowser ? window.localStorage[key] : "";
  };
  const setItem = (key, value) => {
    if (isBrowser) {
      window.localStorage.setItem(key, value);
      return true;
    }
    return false;
  };
  const clear = () => {
    window.localStorage.clear();
  };
  return {
    getItem: getItem,
    setItem: setItem,
    clear: clear,
  };
}

var $625fbb756041e4d7$exports = {};

$parcel$export(
  $625fbb756041e4d7$exports,
  "getSafeFixedNumber",
  () => $625fbb756041e4d7$export$18a3d1c69191c29e,
);
$parcel$export(
  $625fbb756041e4d7$exports,
  "clipStringValueToDecimals",
  () => $625fbb756041e4d7$export$735b087916fcd24e,
);
$parcel$export(
  $625fbb756041e4d7$exports,
  "clipFixNumberToStringDecimals",
  () => $625fbb756041e4d7$export$887f17e12b783cf7,
);
$parcel$export(
  $625fbb756041e4d7$exports,
  "getPlacesAfterDecimal",
  () => $625fbb756041e4d7$export$69ac86cfdeba39d7,
);

const $625fbb756041e4d7$var$NUM_ETH_DECIMALS = 18;
const $625fbb756041e4d7$var$defaultFormat = {
  decimals: $625fbb756041e4d7$var$NUM_ETH_DECIMALS,
  signed: false,
  width: 256,
  name: "18POINT",
  _multiplier: "1",
};
function $625fbb756041e4d7$export$18a3d1c69191c29e(value, formatOptions) {
  const format = {
    ...$625fbb756041e4d7$var$defaultFormat,
    ...formatOptions,
  };
  const { decimals: decimals } = format;
  // ok to cast because defaultFormat will always return a value
  const safeValue = $625fbb756041e4d7$export$735b087916fcd24e(value, decimals);
  return (0, $5vxKx$FixedNumber).from(safeValue, format);
}
function $625fbb756041e4d7$export$887f17e12b783cf7(value, decimals) {
  const unsafeString = value.toString();
  const safeValue = $625fbb756041e4d7$export$735b087916fcd24e(
    unsafeString,
    decimals,
  );
  return safeValue;
}
function $625fbb756041e4d7$export$735b087916fcd24e(value, maxDecimals) {
  if (value === undefined) return "";
  if (value === ".") return "0.";
  if ($625fbb756041e4d7$export$69ac86cfdeba39d7(value) <= maxDecimals)
    return value;
  const [integerPart, decimalPart] = value.split(".");
  const clippedDecimals = decimalPart.slice(0, maxDecimals);
  return `${integerPart || 0}.${clippedDecimals}`;
}
function $625fbb756041e4d7$export$69ac86cfdeba39d7(stringValue) {
  if (stringValue === undefined) return 0;
  const hasDecimal = stringValue.indexOf(".") !== -1;
  if (hasDecimal) return stringValue.split(".")[1].length ?? 0;
  return 0;
}

var $1dba59548019060a$exports = {};

$parcel$export(
  $1dba59548019060a$exports,
  "getMerkleTree",
  () => $1dba59548019060a$export$bde2602fd07d5cd7,
);
$parcel$export(
  $1dba59548019060a$exports,
  "hashAccount",
  () => $1dba59548019060a$export$94df4b1ba6ed894d,
);

var $1dba59548019060a$require$Buffer = $5vxKx$Buffer;
function $1dba59548019060a$export$bde2602fd07d5cd7(accounts) {
  const leaves = accounts.map((account) =>
    $1dba59548019060a$export$94df4b1ba6ed894d(account),
  );
  return new (0, $5vxKx$MerkleTree)(
    leaves,
    $1dba59548019060a$var$keccak256Custom,
    {
      hashLeaves: false,
      sortPairs: true,
    },
  );
}
function $1dba59548019060a$export$94df4b1ba6ed894d(account) {
  return (0, $5vxKx$ethers).utils.solidityKeccak256(
    ["address", "uint256"],
    [account.address, account.value],
  );
}
// Horrible hack because the keccak256 package as used by openzepplin in tests is failing on our
// system somehow
function $1dba59548019060a$var$keccak256Custom(bytes) {
  const buffHash = (0, $5vxKx$ethers).utils.solidityKeccak256(
    ["bytes"],
    [`0x${bytes.toString("hex")}`],
  );
  return $1dba59548019060a$require$Buffer.from(buffHash.slice(2), "hex");
} // Examples:
//
// const proof = merkleTree.getHexProof(
//   await hashAccount({
//     address: signers[0].address,
//     value: FIFTY_ETHER,
//   })
// );
// const extraData = ethers.utils.defaultAbiCoder.encode(
//   ["uint256", "bytes32[]"],
//   [FIFTY_ETHER, proof]
// );

var $78cd2ca7b158658c$exports = {};

$parcel$export(
  $78cd2ca7b158658c$exports,
  "convertToFiatBalance",
  () => $78cd2ca7b158658c$export$322d0207dec006d8,
);
$parcel$export(
  $78cd2ca7b158658c$exports,
  "convertNumberToFiatBalance",
  () => $78cd2ca7b158658c$export$66665394091af12e,
);

function $78cd2ca7b158658c$export$322d0207dec006d8(
  fiatValue,
  cryptoFractionalValue,
  cryptoDecimals,
) {
  // formatUnits will always create a string that can be converted to a number without overflow problems
  const cryptoBalance = Number(
    (0, $5vxKx$formatUnits)(cryptoFractionalValue, cryptoDecimals),
  );
  // Now we can safely multiply the crypto price by the balance to get the fiat balance
  return fiatValue.multiply(cryptoBalance, Math.round);
}
function $78cd2ca7b158658c$export$66665394091af12e(
  fiatValue,
  cryptoNominalValue,
) {
  // Now we can safely multiply the crypto price by the balance to get the fiat balance
  return fiatValue.multiply(cryptoNominalValue, Math.round);
}

var $223d6cf3e1cd7b13$exports = {};

$parcel$export(
  $223d6cf3e1cd7b13$exports,
  "formatMoney",
  () => $223d6cf3e1cd7b13$export$a17b3c2052469c69,
);
const $223d6cf3e1cd7b13$var$defaultOptions = {
  defaultMoney: undefined,
  wholeAmounts: false,
};
function $223d6cf3e1cd7b13$export$a17b3c2052469c69(
  money,
  options = $223d6cf3e1cd7b13$var$defaultOptions,
) {
  const { defaultMoney: defaultMoney, wholeAmounts: wholeAmounts } = options;
  if (!money && !defaultMoney) return undefined;
  // we know at least one is defined by the check above, safe to cast
  const value = money ?? defaultMoney;
  const fractionDigits = wholeAmounts
    ? 0
    : value.getCurrencyInfo().decimal_digits;
  // This is how you express `(10000).toFixed(precision).toLocaleString()` such
  // that you get commmas inserted where they belong and the correct number of
  // digits after the decimal point.
  const formatted = value.toDecimal().toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  const currencyInfo = value.getCurrencyInfo();
  return `${currencyInfo.symbol}${formatted}`;
}

var $7a8c7ec10f643837$exports = {};

$parcel$export(
  $7a8c7ec10f643837$exports,
  "usePref",
  () => $7a8c7ec10f643837$export$967ec28199d3ad70,
);
var $d55f72fa3e9a5dd1$exports = {};

$parcel$export(
  $d55f72fa3e9a5dd1$exports,
  "makePrefEnvelope",
  () => $d55f72fa3e9a5dd1$export$456e5585408a0e3b,
);
const $d55f72fa3e9a5dd1$var$PREF_ENVELOPE_VERSION = "1.0.0";
function $d55f72fa3e9a5dd1$export$456e5585408a0e3b(pref) {
  return {
    pref: pref,
    version: $d55f72fa3e9a5dd1$var$PREF_ENVELOPE_VERSION,
  };
}

function $7a8c7ec10f643837$export$967ec28199d3ad70(id, defaultValue) {
  const efiLocalStorage = (0, $56b3c55af2bf5bcd$export$86e2cef2561044ac)();
  const getPrefFromLocalStorage =
    $7a8c7ec10f643837$var$useGetPrefFromLocalStorage(efiLocalStorage);
  const queryClient = (0, $5vxKx$useQueryClient)();
  const queryKey = $7a8c7ec10f643837$var$usePrefQueryKey(id);
  const { data: prefEnvelope1 } = (0, $5vxKx$useQuery)({
    queryKey: queryKey,
    queryFn: () => {
      return (
        getPrefFromLocalStorage(id) ??
        (0, $d55f72fa3e9a5dd1$export$456e5585408a0e3b)(defaultValue)
      );
    },
    initialData: () =>
      getPrefFromLocalStorage(id) ??
      (0, $d55f72fa3e9a5dd1$export$456e5585408a0e3b)(defaultValue),
  });
  const setPref = (0, $5vxKx$useCallback)(
    (newPref) => {
      // Use an envelope because JSON.stringify likes serializable objects and
      // prefs could be anything
      const prefEnvelope = (0, $d55f72fa3e9a5dd1$export$456e5585408a0e3b)(
        newPref,
      );
      efiLocalStorage.setItem(id, JSON.stringify(prefEnvelope));
      // Invalidate this pref so callers will re-ensure the data as needed
      queryClient.invalidateQueries(queryKey);
    },
    [id, queryClient, queryKey, efiLocalStorage],
  );
  return {
    pref: prefEnvelope1.pref,
    setPref: setPref,
  };
}
function $7a8c7ec10f643837$var$usePrefQueryKey(id) {
  const queryKey = (0, $5vxKx$useMemo)(
    () => [
      ["efi", "prefs"],
      {
        id: id,
      },
    ],
    [id],
  );
  return queryKey;
}
function $7a8c7ec10f643837$var$useGetPrefFromLocalStorage(efiLocalStorage) {
  return (0, $5vxKx$useCallback)(
    function (id) {
      const prefString = efiLocalStorage.getItem(id);
      if (!prefString) return;
      const prefEnvelope = JSON.parse(prefString);
      return prefEnvelope;
    },
    [efiLocalStorage],
  );
}

var $e765d4d6c0744573$exports = {};

$parcel$export(
  $e765d4d6c0744573$exports,
  "getQueryData",
  () => $e765d4d6c0744573$export$a8185c52fc9e2680,
);
$parcel$export(
  $e765d4d6c0744573$exports,
  "getQueriesData",
  () => $e765d4d6c0744573$export$541bc0d5d3d58e1c,
);
function $e765d4d6c0744573$export$a8185c52fc9e2680(queryResult) {
  return queryResult.data;
}
function $e765d4d6c0744573$export$541bc0d5d3d58e1c(queryResults) {
  return queryResults.map((result) =>
    $e765d4d6c0744573$export$a8185c52fc9e2680(result),
  );
}

var $79d6d779453d656e$exports = {};

$parcel$export(
  $79d6d779453d656e$exports,
  "formatDay",
  () => $79d6d779453d656e$export$a7f242eff11c1345,
);
$parcel$export(
  $79d6d779453d656e$exports,
  "formatFullDate",
  () => $79d6d779453d656e$export$6f25eb35eacda85b,
);
$parcel$export(
  $79d6d779453d656e$exports,
  "formatAbbreviatedDate",
  () => $79d6d779453d656e$export$30b172ccaef86308,
);
$parcel$export(
  $79d6d779453d656e$exports,
  "formatAbbreviatedMonthAndDay",
  () => $79d6d779453d656e$export$48a32b34c69b0d84,
);
$parcel$export(
  $79d6d779453d656e$exports,
  "formatYear",
  () => $79d6d779453d656e$export$2979e79cc7cbf15b,
);

const $79d6d779453d656e$export$a7f242eff11c1345 = (0, $5vxKx$timeFormat)("%d");
const $79d6d779453d656e$export$6f25eb35eacda85b = (0, $5vxKx$timeFormat)(
  "%B %d, %Y",
);
const $79d6d779453d656e$export$30b172ccaef86308 = (0, $5vxKx$timeFormat)(
  "%b %d, %Y",
);
const $79d6d779453d656e$export$48a32b34c69b0d84 = (0, $5vxKx$timeFormat)(
  "%b %d",
);
const $79d6d779453d656e$export$2979e79cc7cbf15b = (0, $5vxKx$timeFormat)("%Y");

var $cce8023e214136c1$exports = {};

$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_MINUTE_IN_SECONDS",
  () => $cce8023e214136c1$export$5a6b55f8dbb0d34,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_HOUR_IN_SECONDS",
  () => $cce8023e214136c1$export$cb35ad678b61c779,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_DAY_IN_SECONDS",
  () => $cce8023e214136c1$export$c3df4e96b54fcc7,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_WEEK_IN_SECONDS",
  () => $cce8023e214136c1$export$569c3f5d39917057,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "THIRTY_DAYS_IN_SECONDS",
  () => $cce8023e214136c1$export$dcabcde36a89149e,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_YEAR_IN_SECONDS",
  () => $cce8023e214136c1$export$fd0023aaea78d8ed,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_MINUTE_IN_MILLISECONDS",
  () => $cce8023e214136c1$export$6fba758ec36a5528,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_HOUR_IN_MILLISECONDS",
  () => $cce8023e214136c1$export$94def635c43dedab,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "TWELVE_HOUR_IN_MILLISECONDS",
  () => $cce8023e214136c1$export$4865375e6d8c4009,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_DAY_IN_MILLISECONDS",
  () => $cce8023e214136c1$export$2cf27d95188f1c13,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_WEEK_IN_MILLISECONDS",
  () => $cce8023e214136c1$export$fa561709697f8f37,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "ONE_YEAR_IN_MILLISECONDS",
  () => $cce8023e214136c1$export$fe77a6ad9c93ac8,
);
$parcel$export(
  $cce8023e214136c1$exports,
  "THIRTY_DAYS_IN_MILLISECONDS",
  () => $cce8023e214136c1$export$885b9d72bc39ecdb,
);
const $cce8023e214136c1$export$5a6b55f8dbb0d34 = 60;
const $cce8023e214136c1$export$cb35ad678b61c779 =
  60 * $cce8023e214136c1$export$5a6b55f8dbb0d34;
const $cce8023e214136c1$export$c3df4e96b54fcc7 =
  24 * $cce8023e214136c1$export$cb35ad678b61c779;
const $cce8023e214136c1$export$569c3f5d39917057 =
  7 * $cce8023e214136c1$export$c3df4e96b54fcc7;
const $cce8023e214136c1$export$dcabcde36a89149e =
  30 * $cce8023e214136c1$export$c3df4e96b54fcc7;
const $cce8023e214136c1$export$fd0023aaea78d8ed =
  365 * $cce8023e214136c1$export$c3df4e96b54fcc7;
const $cce8023e214136c1$export$6fba758ec36a5528 =
  1000 * $cce8023e214136c1$export$5a6b55f8dbb0d34;
const $cce8023e214136c1$export$94def635c43dedab =
  60 * $cce8023e214136c1$export$6fba758ec36a5528;
const $cce8023e214136c1$export$4865375e6d8c4009 =
  12 * $cce8023e214136c1$export$94def635c43dedab;
const $cce8023e214136c1$export$2cf27d95188f1c13 =
  24 * $cce8023e214136c1$export$94def635c43dedab;
const $cce8023e214136c1$export$fa561709697f8f37 =
  7 * $cce8023e214136c1$export$2cf27d95188f1c13;
const $cce8023e214136c1$export$fe77a6ad9c93ac8 =
  365 * $cce8023e214136c1$export$2cf27d95188f1c13;
const $cce8023e214136c1$export$885b9d72bc39ecdb =
  30 * $cce8023e214136c1$export$2cf27d95188f1c13;

var $81db7f6a623e3a87$exports = {};

$parcel$export(
  $81db7f6a623e3a87$exports,
  "convertEpochSecondsToDate",
  () => $81db7f6a623e3a87$export$e76c9fc34db009b3,
);
function $81db7f6a623e3a87$export$e76c9fc34db009b3(seconds) {
  const epochMilliseconds = seconds * 1000;
  return new Date(epochMilliseconds);
}

var $92c0779481e80c2c$exports = {};

$parcel$export(
  $92c0779481e80c2c$exports,
  "assertNever",
  () => $92c0779481e80c2c$export$cbadc5a7223772a8,
);
function $92c0779481e80c2c$export$cbadc5a7223772a8(never) {
  throw new Error(`Was not never: ${never}`);
}

var $facaa208d48b1127$exports = {};

$parcel$export(
  $facaa208d48b1127$exports,
  "typeAassertNever",
  () => $facaa208d48b1127$export$327684fd9171161,
);
function $facaa208d48b1127$export$327684fd9171161(checkNever) {}

var $29a98aa38f0bbc3a$exports = {};

$parcel$export(
  $29a98aa38f0bbc3a$exports,
  "formatBalance",
  () => $29a98aa38f0bbc3a$export$cc3bc0b518c1c6b8,
);
$parcel$export(
  $29a98aa38f0bbc3a$exports,
  "formatBalance2",
  () => $29a98aa38f0bbc3a$export$7fa9619042492a8a,
);

const $29a98aa38f0bbc3a$var$defaultOptions = {
  formatCommas: true,
};
function $29a98aa38f0bbc3a$export$cc3bc0b518c1c6b8(
  balance,
  decimals,
  maxPrecision = 4,
  options = $29a98aa38f0bbc3a$var$defaultOptions,
) {
  if (!balance || !decimals) return "0.0000";
  const stringBalance = (0, $5vxKx$formatUnits)(balance, decimals);
  const clipped = (0, $625fbb756041e4d7$export$735b087916fcd24e)(
    stringBalance,
    maxPrecision,
  );
  const { formatCommas: formatCommas } = options;
  if (formatCommas) return (0, $5vxKx$commify)(clipped);
  return clipped;
}
function $29a98aa38f0bbc3a$export$7fa9619042492a8a(
  balance,
  decimals,
  maxPrecision = 4,
  options = $29a98aa38f0bbc3a$var$defaultOptions,
) {
  if (!balance || !decimals) return "0";
  const clipped = (0, $625fbb756041e4d7$export$735b087916fcd24e)(
    balance,
    maxPrecision,
  );
  const { formatCommas: formatCommas } = options;
  if (formatCommas) return (0, $5vxKx$commify)(clipped);
  return clipped;
}

var $1e23852652f6a0af$exports = {};

$parcel$export(
  $1e23852652f6a0af$exports,
  "formatPercent",
  () => $1e23852652f6a0af$export$32e6b1ae352e94d6,
);
function $1e23852652f6a0af$export$32e6b1ae352e94d6(
  decimalAmount,
  precision = 2,
) {
  const percent = (decimalAmount * 100).toFixed(precision);
  return `${percent}%`;
}

var $be9bcc1d4b89dcc8$exports = {};

$parcel$export(
  $be9bcc1d4b89dcc8$exports,
  "sortAddresses",
  () => $be9bcc1d4b89dcc8$export$fa295b83bf634638,
);
function $be9bcc1d4b89dcc8$export$fa295b83bf634638(addresses) {
  const lowerCaseAddresses = addresses.map((address) => address.toLowerCase());
  // map of lower case addresses to mixed case addresses
  const addressMap = {};
  lowerCaseAddresses.forEach((lowerCaseAddress, index) => {
    addressMap[lowerCaseAddress] = addresses[index];
  });
  const sortedLowerCaseAddresses = lowerCaseAddresses.map((a) => a).sort();
  const sortedAddresses = sortedLowerCaseAddresses.map(
    (lowerCaseAddress) => addressMap[lowerCaseAddress],
  );
  return sortedAddresses;
}

export {
  $67b205b0d34a74dc$export$2c66e96878bf4792 as EMPTY_ARRAY,
  $2d3f595eb50fcfec$export$7b92a9e9dcf639e8 as useConsole,
  $d59bee517dec3a5e$export$c06e1e7429de6283 as ChainId,
  $d59bee517dec3a5e$export$bb242f449f295e97 as ETHEREUM_BLOCK_PER_DAY,
  $d59bee517dec3a5e$export$d2f565a827ab012f as ETHEREUM_BLOCKS_PER_WEEK,
  $d59bee517dec3a5e$export$b3ea0c2306f884e1 as ChainNames,
  $d59bee517dec3a5e$export$aa618d5381c5cd48 as DEFAULT_CHAIN_IDS,
  $d59bee517dec3a5e$export$f68b30b973603526 as isLocalnet,
  $d59bee517dec3a5e$export$112421be00e64d10 as isGoerli,
  $d59bee517dec3a5e$export$5cb72704ec8022bd as isMainnet,
  $d59bee517dec3a5e$export$199d09866564123d as NUM_ETH_DECIMALS,
  $d59bee517dec3a5e$export$99abd183ce604255 as ONE_ETHER,
  $d59bee517dec3a5e$export$883ac2ca342d37f3 as ETH_ZERO_ADDRESS,
  $56b3c55af2bf5bcd$export$86e2cef2561044ac as useLocalStorage,
  $625fbb756041e4d7$export$18a3d1c69191c29e as getSafeFixedNumber,
  $625fbb756041e4d7$export$735b087916fcd24e as clipStringValueToDecimals,
  $625fbb756041e4d7$export$887f17e12b783cf7 as clipFixNumberToStringDecimals,
  $625fbb756041e4d7$export$69ac86cfdeba39d7 as getPlacesAfterDecimal,
  $1dba59548019060a$export$bde2602fd07d5cd7 as getMerkleTree,
  $1dba59548019060a$export$94df4b1ba6ed894d as hashAccount,
  $78cd2ca7b158658c$export$322d0207dec006d8 as convertToFiatBalance,
  $78cd2ca7b158658c$export$66665394091af12e as convertNumberToFiatBalance,
  $223d6cf3e1cd7b13$export$a17b3c2052469c69 as formatMoney,
  $7a8c7ec10f643837$export$967ec28199d3ad70 as usePref,
  $d55f72fa3e9a5dd1$export$456e5585408a0e3b as makePrefEnvelope,
  $e765d4d6c0744573$export$a8185c52fc9e2680 as getQueryData,
  $e765d4d6c0744573$export$541bc0d5d3d58e1c as getQueriesData,
  $79d6d779453d656e$export$a7f242eff11c1345 as formatDay,
  $79d6d779453d656e$export$6f25eb35eacda85b as formatFullDate,
  $79d6d779453d656e$export$30b172ccaef86308 as formatAbbreviatedDate,
  $79d6d779453d656e$export$48a32b34c69b0d84 as formatAbbreviatedMonthAndDay,
  $79d6d779453d656e$export$2979e79cc7cbf15b as formatYear,
  $cce8023e214136c1$export$5a6b55f8dbb0d34 as ONE_MINUTE_IN_SECONDS,
  $cce8023e214136c1$export$cb35ad678b61c779 as ONE_HOUR_IN_SECONDS,
  $cce8023e214136c1$export$c3df4e96b54fcc7 as ONE_DAY_IN_SECONDS,
  $cce8023e214136c1$export$569c3f5d39917057 as ONE_WEEK_IN_SECONDS,
  $cce8023e214136c1$export$dcabcde36a89149e as THIRTY_DAYS_IN_SECONDS,
  $cce8023e214136c1$export$fd0023aaea78d8ed as ONE_YEAR_IN_SECONDS,
  $cce8023e214136c1$export$6fba758ec36a5528 as ONE_MINUTE_IN_MILLISECONDS,
  $cce8023e214136c1$export$94def635c43dedab as ONE_HOUR_IN_MILLISECONDS,
  $cce8023e214136c1$export$4865375e6d8c4009 as TWELVE_HOUR_IN_MILLISECONDS,
  $cce8023e214136c1$export$2cf27d95188f1c13 as ONE_DAY_IN_MILLISECONDS,
  $cce8023e214136c1$export$fa561709697f8f37 as ONE_WEEK_IN_MILLISECONDS,
  $cce8023e214136c1$export$fe77a6ad9c93ac8 as ONE_YEAR_IN_MILLISECONDS,
  $cce8023e214136c1$export$885b9d72bc39ecdb as THIRTY_DAYS_IN_MILLISECONDS,
  $81db7f6a623e3a87$export$e76c9fc34db009b3 as convertEpochSecondsToDate,
  $92c0779481e80c2c$export$cbadc5a7223772a8 as assertNever,
  $facaa208d48b1127$export$327684fd9171161 as typeAassertNever,
  $29a98aa38f0bbc3a$export$cc3bc0b518c1c6b8 as formatBalance,
  $29a98aa38f0bbc3a$export$7fa9619042492a8a as formatBalance2,
  $1e23852652f6a0af$export$32e6b1ae352e94d6 as formatPercent,
  $be9bcc1d4b89dcc8$export$fa295b83bf634638 as sortAddresses,
};
//# sourceMappingURL=index.esm.js.map
