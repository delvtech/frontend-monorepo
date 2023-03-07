var $kVMNA$lrucache = require("lru-cache");
var $kVMNA$fastjsonstablestringify = require("fast-json-stable-stringify");
var $kVMNA$react = require("react");
var $kVMNA$reactuse = require("react-use");
var $kVMNA$lodashisequal = require("lodash.isequal");
var $kVMNA$etherslibutils = require("ethers/lib/utils");
var $kVMNA$ethers = require("ethers");
var $kVMNA$merkletreejs = require("merkletreejs");
var $kVMNA$buffer = require("buffer");
var $kVMNA$reactquery = require("react-query");
var $kVMNA$d3timeformat = require("d3-time-format");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $f34c70895ba47bf3$exports = {};

$parcel$export($f34c70895ba47bf3$exports, "cached", () => $f34c70895ba47bf3$export$ade7a147f5129058);


function $f34c70895ba47bf3$export$ade7a147f5129058({ cache: cache = new (0, ($parcel$interopDefault($kVMNA$lrucache)))({
    max: 500
}) , cacheKey: cacheKey , callback: callback , options: options  }) {
    const key = (0, ($parcel$interopDefault($kVMNA$fastjsonstablestringify)))(cacheKey);
    if (cache.has(key)) // console.log("✅ cache hit", key);
    return cache.get(key, options);
    else {
        // console.log("❌ cache miss", key);
        const value = callback();
        cache.set(key, value, options);
        return value;
    }
}


var $a199ce3284f2ec67$exports = {};

$parcel$export($a199ce3284f2ec67$exports, "EMPTY_ARRAY", () => $a199ce3284f2ec67$export$2c66e96878bf4792);
const $a199ce3284f2ec67$export$2c66e96878bf4792 = [];


var $070df8e59a3d40c0$exports = {};

$parcel$export($070df8e59a3d40c0$exports, "useConsole", () => $070df8e59a3d40c0$export$7b92a9e9dcf639e8);



function $070df8e59a3d40c0$export$7b92a9e9dcf639e8(...consoleArgs) {
    const previousArgs = (0, $kVMNA$reactuse.usePrevious)(consoleArgs);
    const changed = (0, ($parcel$interopDefault($kVMNA$lodashisequal)))(previousArgs, consoleArgs);
    (0, $kVMNA$react.useEffect)(()=>{
        // eslint-disable-next-line no-console
        console.log(...consoleArgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        changed
    ]);
}


var $17cb476856efe655$exports = {};

$parcel$export($17cb476856efe655$exports, "ChainId", () => $17cb476856efe655$export$c06e1e7429de6283);
$parcel$export($17cb476856efe655$exports, "ETHEREUM_BLOCK_PER_DAY", () => $17cb476856efe655$export$bb242f449f295e97);
$parcel$export($17cb476856efe655$exports, "ETHEREUM_BLOCKS_PER_WEEK", () => $17cb476856efe655$export$d2f565a827ab012f);
$parcel$export($17cb476856efe655$exports, "ChainNames", () => $17cb476856efe655$export$b3ea0c2306f884e1);
$parcel$export($17cb476856efe655$exports, "DEFAULT_CHAIN_IDS", () => $17cb476856efe655$export$aa618d5381c5cd48);
$parcel$export($17cb476856efe655$exports, "isLocalnet", () => $17cb476856efe655$export$f68b30b973603526);
$parcel$export($17cb476856efe655$exports, "isGoerli", () => $17cb476856efe655$export$112421be00e64d10);
$parcel$export($17cb476856efe655$exports, "isMainnet", () => $17cb476856efe655$export$5cb72704ec8022bd);
$parcel$export($17cb476856efe655$exports, "NUM_ETH_DECIMALS", () => $17cb476856efe655$export$199d09866564123d);
$parcel$export($17cb476856efe655$exports, "ONE_ETHER", () => $17cb476856efe655$export$99abd183ce604255);
$parcel$export($17cb476856efe655$exports, "ETH_ZERO_ADDRESS", () => $17cb476856efe655$export$883ac2ca342d37f3);

let $17cb476856efe655$export$c06e1e7429de6283;
(function(ChainId1) {
    ChainId1[ChainId1["MAINNET"] = 1] = "MAINNET";
    ChainId1[ChainId1["GOERLI"] = 5] = "GOERLI";
    ChainId1[ChainId1["LOCAL"] = 31337] = "LOCAL";
})($17cb476856efe655$export$c06e1e7429de6283 || ($17cb476856efe655$export$c06e1e7429de6283 = {}));
const $17cb476856efe655$export$bb242f449f295e97 = 5760;
const $17cb476856efe655$export$d2f565a827ab012f = $17cb476856efe655$export$bb242f449f295e97 * 7;
const $17cb476856efe655$export$b3ea0c2306f884e1 = {
    [$17cb476856efe655$export$c06e1e7429de6283.MAINNET]: "Ethereum Mainnet",
    [$17cb476856efe655$export$c06e1e7429de6283.GOERLI]: "Goerli Testnet",
    [$17cb476856efe655$export$c06e1e7429de6283.LOCAL]: "Local development"
};
const $17cb476856efe655$export$aa618d5381c5cd48 = [
    $17cb476856efe655$export$c06e1e7429de6283.MAINNET,
    $17cb476856efe655$export$c06e1e7429de6283.GOERLI,
    $17cb476856efe655$export$c06e1e7429de6283.LOCAL, 
];
function $17cb476856efe655$export$f68b30b973603526(chainId) {
    return chainId === $17cb476856efe655$export$c06e1e7429de6283.LOCAL;
}
function $17cb476856efe655$export$112421be00e64d10(chainId) {
    return chainId === $17cb476856efe655$export$c06e1e7429de6283.GOERLI;
}
function $17cb476856efe655$export$5cb72704ec8022bd(chainId) {
    return chainId === $17cb476856efe655$export$c06e1e7429de6283.MAINNET || chainId === $17cb476856efe655$export$c06e1e7429de6283.LOCAL && false;
}
const $17cb476856efe655$export$199d09866564123d = 18;
const $17cb476856efe655$export$99abd183ce604255 = (0, $kVMNA$etherslibutils.parseUnits)("1", $17cb476856efe655$export$199d09866564123d);
const $17cb476856efe655$export$883ac2ca342d37f3 = "0x0000000000000000000000000000000000000000";


var $f7ae3a6e80060616$exports = {};

$parcel$export($f7ae3a6e80060616$exports, "getLocalStorage", () => $f7ae3a6e80060616$export$d3720feff416e85b);
function $f7ae3a6e80060616$export$d3720feff416e85b() {
    const isBrowser = typeof window !== "undefined";
    const getItem = (key)=>{
        return isBrowser ? window.localStorage[key] : "";
    };
    const setItem = (key, value)=>{
        if (isBrowser) {
            window.localStorage.setItem(key, value);
            return true;
        }
        return false;
    };
    const clear = ()=>{
        window.localStorage.clear();
    };
    return {
        getItem: getItem,
        setItem: setItem,
        clear: clear
    };
}


var $68a1eb75299460be$exports = {};

$parcel$export($68a1eb75299460be$exports, "getSafeFixedNumber", () => $68a1eb75299460be$export$18a3d1c69191c29e);
$parcel$export($68a1eb75299460be$exports, "clipStringValueToDecimals", () => $68a1eb75299460be$export$735b087916fcd24e);
$parcel$export($68a1eb75299460be$exports, "clipFixNumberToStringDecimals", () => $68a1eb75299460be$export$887f17e12b783cf7);
$parcel$export($68a1eb75299460be$exports, "getPlacesAfterDecimal", () => $68a1eb75299460be$export$69ac86cfdeba39d7);

const $68a1eb75299460be$var$NUM_ETH_DECIMALS = 18;
const $68a1eb75299460be$var$defaultFormat = {
    decimals: $68a1eb75299460be$var$NUM_ETH_DECIMALS,
    signed: false,
    width: 256,
    name: "18POINT",
    _multiplier: "1"
};
function $68a1eb75299460be$export$18a3d1c69191c29e(value, formatOptions) {
    const format = {
        ...$68a1eb75299460be$var$defaultFormat,
        ...formatOptions
    };
    const { decimals: decimals  } = format;
    // ok to cast because defaultFormat will always return a value
    const safeValue = $68a1eb75299460be$export$735b087916fcd24e(value, decimals);
    return (0, $kVMNA$ethers.FixedNumber).from(safeValue, format);
}
function $68a1eb75299460be$export$887f17e12b783cf7(value, decimals) {
    const unsafeString = value.toString();
    const safeValue = $68a1eb75299460be$export$735b087916fcd24e(unsafeString, decimals);
    return safeValue;
}
function $68a1eb75299460be$export$735b087916fcd24e(value, maxDecimals) {
    if (value === undefined) return "";
    if (value === ".") return "0.";
    if ($68a1eb75299460be$export$69ac86cfdeba39d7(value) <= maxDecimals) return value;
    const [integerPart, decimalPart] = value.split(".");
    const clippedDecimals = decimalPart.slice(0, maxDecimals);
    return `${integerPart || 0}.${clippedDecimals}`;
}
function $68a1eb75299460be$export$69ac86cfdeba39d7(stringValue) {
    if (stringValue === undefined) return 0;
    const hasDecimal = stringValue.indexOf(".") !== -1;
    if (hasDecimal) return stringValue.split(".")[1].length ?? 0;
    return 0;
}


var $97d843f38382edc0$exports = {};

$parcel$export($97d843f38382edc0$exports, "getMerkleTree", () => $97d843f38382edc0$export$bde2602fd07d5cd7);
$parcel$export($97d843f38382edc0$exports, "hashAccount", () => $97d843f38382edc0$export$94df4b1ba6ed894d);



var $97d843f38382edc0$require$Buffer = $kVMNA$buffer.Buffer;
function $97d843f38382edc0$export$bde2602fd07d5cd7(accounts) {
    const leaves = accounts.map((account)=>$97d843f38382edc0$export$94df4b1ba6ed894d(account));
    return new (0, $kVMNA$merkletreejs.MerkleTree)(leaves, $97d843f38382edc0$var$keccak256Custom, {
        hashLeaves: false,
        sortPairs: true
    });
}
function $97d843f38382edc0$export$94df4b1ba6ed894d(account) {
    return (0, $kVMNA$ethers.ethers).utils.solidityKeccak256([
        "address",
        "uint256"
    ], [
        account.address,
        account.value
    ]);
}
// Horrible hack because the keccak256 package as used by openzepplin in tests is failing on our
// system somehow
function $97d843f38382edc0$var$keccak256Custom(bytes) {
    const buffHash = (0, $kVMNA$ethers.ethers).utils.solidityKeccak256([
        "bytes"
    ], [
        `0x${bytes.toString("hex")}`
    ]);
    return $97d843f38382edc0$require$Buffer.from(buffHash.slice(2), "hex");
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


var $cc3fa230b27e0bf9$exports = {};

$parcel$export($cc3fa230b27e0bf9$exports, "convertToFiatBalance", () => $cc3fa230b27e0bf9$export$322d0207dec006d8);
$parcel$export($cc3fa230b27e0bf9$exports, "convertNumberToFiatBalance", () => $cc3fa230b27e0bf9$export$66665394091af12e);

function $cc3fa230b27e0bf9$export$322d0207dec006d8(fiatValue, cryptoFractionalValue, cryptoDecimals) {
    // formatUnits will always create a string that can be converted to a number without overflow problems
    const cryptoBalance = Number((0, $kVMNA$etherslibutils.formatUnits)(cryptoFractionalValue, cryptoDecimals));
    // Now we can safely multiply the crypto price by the balance to get the fiat balance
    return fiatValue.multiply(cryptoBalance, Math.round);
}
function $cc3fa230b27e0bf9$export$66665394091af12e(fiatValue, cryptoNominalValue) {
    // Now we can safely multiply the crypto price by the balance to get the fiat balance
    return fiatValue.multiply(cryptoNominalValue, Math.round);
}


var $790f9f51db2ea0ee$exports = {};

$parcel$export($790f9f51db2ea0ee$exports, "formatMoney", () => $790f9f51db2ea0ee$export$a17b3c2052469c69);
const $790f9f51db2ea0ee$var$defaultOptions = {
    defaultMoney: undefined,
    wholeAmounts: false
};
function $790f9f51db2ea0ee$export$a17b3c2052469c69(money, options = $790f9f51db2ea0ee$var$defaultOptions) {
    const { defaultMoney: defaultMoney , wholeAmounts: wholeAmounts  } = options;
    if (!money && !defaultMoney) return undefined;
    // we know at least one is defined by the check above, safe to cast
    const value = money ?? defaultMoney;
    const fractionDigits = wholeAmounts ? 0 : value.getCurrencyInfo().decimal_digits;
    // This is how you express `(10000).toFixed(precision).toLocaleString()` such
    // that you get commmas inserted where they belong and the correct number of
    // digits after the decimal point.
    const formatted = value.toDecimal().toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    });
    const currencyInfo = value.getCurrencyInfo();
    return `${currencyInfo.symbol}${formatted}`;
}


var $6f1c40978ac1640b$exports = {};

$parcel$export($6f1c40978ac1640b$exports, "usePref", () => $6f1c40978ac1640b$export$967ec28199d3ad70);
var $cba8d800ce7bcb4e$exports = {};

$parcel$export($cba8d800ce7bcb4e$exports, "makePrefEnvelope", () => $cba8d800ce7bcb4e$export$456e5585408a0e3b);
const $cba8d800ce7bcb4e$var$PREF_ENVELOPE_VERSION = "1.0.0";
function $cba8d800ce7bcb4e$export$456e5585408a0e3b(pref) {
    return {
        pref: pref,
        version: $cba8d800ce7bcb4e$var$PREF_ENVELOPE_VERSION
    };
}





function $6f1c40978ac1640b$export$967ec28199d3ad70(id, defaultValue) {
    const efiLocalStorage = (0, $f7ae3a6e80060616$export$d3720feff416e85b)();
    const getPrefFromLocalStorage = $6f1c40978ac1640b$var$useGetPrefFromLocalStorage(efiLocalStorage);
    const queryClient = (0, $kVMNA$reactquery.useQueryClient)();
    const queryKey = $6f1c40978ac1640b$var$usePrefQueryKey(id);
    const { data: prefEnvelope1  } = (0, $kVMNA$reactquery.useQuery)({
        queryKey: queryKey,
        queryFn: ()=>{
            return getPrefFromLocalStorage(id) ?? (0, $cba8d800ce7bcb4e$export$456e5585408a0e3b)(defaultValue);
        },
        initialData: ()=>getPrefFromLocalStorage(id) ?? (0, $cba8d800ce7bcb4e$export$456e5585408a0e3b)(defaultValue)
    });
    const setPref = (0, $kVMNA$react.useCallback)((newPref)=>{
        // Use an envelope because JSON.stringify likes serializable objects and
        // prefs could be anything
        const prefEnvelope = (0, $cba8d800ce7bcb4e$export$456e5585408a0e3b)(newPref);
        efiLocalStorage.setItem(id, JSON.stringify(prefEnvelope));
        // Invalidate this pref so callers will re-ensure the data as needed
        queryClient.invalidateQueries(queryKey);
    }, [
        id,
        queryClient,
        queryKey,
        efiLocalStorage
    ]);
    return {
        pref: prefEnvelope1.pref,
        setPref: setPref
    };
}
function $6f1c40978ac1640b$var$usePrefQueryKey(id) {
    const queryKey = (0, $kVMNA$react.useMemo)(()=>[
            [
                "efi",
                "prefs"
            ],
            {
                id: id
            }
        ], [
        id
    ]);
    return queryKey;
}
function $6f1c40978ac1640b$var$useGetPrefFromLocalStorage(efiLocalStorage) {
    return (0, $kVMNA$react.useCallback)(function(id) {
        const prefString = efiLocalStorage.getItem(id);
        if (!prefString) return;
        const prefEnvelope = JSON.parse(prefString);
        return prefEnvelope;
    }, [
        efiLocalStorage
    ]);
}



var $e017be62a0c705d6$exports = {};

$parcel$export($e017be62a0c705d6$exports, "getQueryData", () => $e017be62a0c705d6$export$a8185c52fc9e2680);
$parcel$export($e017be62a0c705d6$exports, "getQueriesData", () => $e017be62a0c705d6$export$541bc0d5d3d58e1c);
function $e017be62a0c705d6$export$a8185c52fc9e2680(queryResult) {
    return queryResult.data;
}
function $e017be62a0c705d6$export$541bc0d5d3d58e1c(queryResults) {
    return queryResults.map((result)=>$e017be62a0c705d6$export$a8185c52fc9e2680(result));
}


var $0c8525cb9040694d$exports = {};

$parcel$export($0c8525cb9040694d$exports, "formatDay", () => $0c8525cb9040694d$export$a7f242eff11c1345);
$parcel$export($0c8525cb9040694d$exports, "formatFullDate", () => $0c8525cb9040694d$export$6f25eb35eacda85b);
$parcel$export($0c8525cb9040694d$exports, "formatAbbreviatedDate", () => $0c8525cb9040694d$export$30b172ccaef86308);
$parcel$export($0c8525cb9040694d$exports, "formatAbbreviatedMonthAndDay", () => $0c8525cb9040694d$export$48a32b34c69b0d84);
$parcel$export($0c8525cb9040694d$exports, "formatYear", () => $0c8525cb9040694d$export$2979e79cc7cbf15b);

const $0c8525cb9040694d$export$a7f242eff11c1345 = (0, $kVMNA$d3timeformat.timeFormat)("%d");
const $0c8525cb9040694d$export$6f25eb35eacda85b = (0, $kVMNA$d3timeformat.timeFormat)("%B %d, %Y");
const $0c8525cb9040694d$export$30b172ccaef86308 = (0, $kVMNA$d3timeformat.timeFormat)("%b %d, %Y");
const $0c8525cb9040694d$export$48a32b34c69b0d84 = (0, $kVMNA$d3timeformat.timeFormat)("%b %d");
const $0c8525cb9040694d$export$2979e79cc7cbf15b = (0, $kVMNA$d3timeformat.timeFormat)("%Y");


var $ad28989426833e8e$exports = {};

$parcel$export($ad28989426833e8e$exports, "ONE_MINUTE_IN_SECONDS", () => $ad28989426833e8e$export$5a6b55f8dbb0d34);
$parcel$export($ad28989426833e8e$exports, "ONE_HOUR_IN_SECONDS", () => $ad28989426833e8e$export$cb35ad678b61c779);
$parcel$export($ad28989426833e8e$exports, "ONE_DAY_IN_SECONDS", () => $ad28989426833e8e$export$c3df4e96b54fcc7);
$parcel$export($ad28989426833e8e$exports, "ONE_WEEK_IN_SECONDS", () => $ad28989426833e8e$export$569c3f5d39917057);
$parcel$export($ad28989426833e8e$exports, "THIRTY_DAYS_IN_SECONDS", () => $ad28989426833e8e$export$dcabcde36a89149e);
$parcel$export($ad28989426833e8e$exports, "ONE_YEAR_IN_SECONDS", () => $ad28989426833e8e$export$fd0023aaea78d8ed);
$parcel$export($ad28989426833e8e$exports, "ONE_MINUTE_IN_MILLISECONDS", () => $ad28989426833e8e$export$6fba758ec36a5528);
$parcel$export($ad28989426833e8e$exports, "ONE_HOUR_IN_MILLISECONDS", () => $ad28989426833e8e$export$94def635c43dedab);
$parcel$export($ad28989426833e8e$exports, "TWELVE_HOUR_IN_MILLISECONDS", () => $ad28989426833e8e$export$4865375e6d8c4009);
$parcel$export($ad28989426833e8e$exports, "ONE_DAY_IN_MILLISECONDS", () => $ad28989426833e8e$export$2cf27d95188f1c13);
$parcel$export($ad28989426833e8e$exports, "ONE_WEEK_IN_MILLISECONDS", () => $ad28989426833e8e$export$fa561709697f8f37);
$parcel$export($ad28989426833e8e$exports, "ONE_YEAR_IN_MILLISECONDS", () => $ad28989426833e8e$export$fe77a6ad9c93ac8);
$parcel$export($ad28989426833e8e$exports, "THIRTY_DAYS_IN_MILLISECONDS", () => $ad28989426833e8e$export$885b9d72bc39ecdb);
const $ad28989426833e8e$export$5a6b55f8dbb0d34 = 60;
const $ad28989426833e8e$export$cb35ad678b61c779 = 60 * $ad28989426833e8e$export$5a6b55f8dbb0d34;
const $ad28989426833e8e$export$c3df4e96b54fcc7 = 24 * $ad28989426833e8e$export$cb35ad678b61c779;
const $ad28989426833e8e$export$569c3f5d39917057 = 7 * $ad28989426833e8e$export$c3df4e96b54fcc7;
const $ad28989426833e8e$export$dcabcde36a89149e = 30 * $ad28989426833e8e$export$c3df4e96b54fcc7;
const $ad28989426833e8e$export$fd0023aaea78d8ed = 365 * $ad28989426833e8e$export$c3df4e96b54fcc7;
const $ad28989426833e8e$export$6fba758ec36a5528 = 1000 * $ad28989426833e8e$export$5a6b55f8dbb0d34;
const $ad28989426833e8e$export$94def635c43dedab = 60 * $ad28989426833e8e$export$6fba758ec36a5528;
const $ad28989426833e8e$export$4865375e6d8c4009 = 12 * $ad28989426833e8e$export$94def635c43dedab;
const $ad28989426833e8e$export$2cf27d95188f1c13 = 24 * $ad28989426833e8e$export$94def635c43dedab;
const $ad28989426833e8e$export$fa561709697f8f37 = 7 * $ad28989426833e8e$export$2cf27d95188f1c13;
const $ad28989426833e8e$export$fe77a6ad9c93ac8 = 365 * $ad28989426833e8e$export$2cf27d95188f1c13;
const $ad28989426833e8e$export$885b9d72bc39ecdb = 30 * $ad28989426833e8e$export$2cf27d95188f1c13;


var $a02536f8d3f9ea20$exports = {};

$parcel$export($a02536f8d3f9ea20$exports, "convertEpochSecondsToDate", () => $a02536f8d3f9ea20$export$e76c9fc34db009b3);
function $a02536f8d3f9ea20$export$e76c9fc34db009b3(seconds) {
    const epochMilliseconds = seconds * 1000;
    return new Date(epochMilliseconds);
}


var $c0a0e83131955b16$exports = {};

$parcel$export($c0a0e83131955b16$exports, "assertNever", () => $c0a0e83131955b16$export$cbadc5a7223772a8);
function $c0a0e83131955b16$export$cbadc5a7223772a8(never) {
    throw new Error(`Was not never: ${never}`);
}


var $aa095137cbdb3739$exports = {};

$parcel$export($aa095137cbdb3739$exports, "typeAassertNever", () => $aa095137cbdb3739$export$327684fd9171161);
function $aa095137cbdb3739$export$327684fd9171161(checkNever) {}


var $007c93864194fbc4$exports = {};

$parcel$export($007c93864194fbc4$exports, "formatBalance", () => $007c93864194fbc4$export$cc3bc0b518c1c6b8);
$parcel$export($007c93864194fbc4$exports, "formatBalance2", () => $007c93864194fbc4$export$7fa9619042492a8a);


const $007c93864194fbc4$var$defaultOptions = {
    formatCommas: true
};
function $007c93864194fbc4$export$cc3bc0b518c1c6b8(balance, decimals, maxPrecision = 4, options = $007c93864194fbc4$var$defaultOptions) {
    if (!balance || !decimals) return "0.0000";
    const stringBalance = (0, $kVMNA$etherslibutils.formatUnits)(balance, decimals);
    const clipped = (0, $68a1eb75299460be$export$735b087916fcd24e)(stringBalance, maxPrecision);
    const { formatCommas: formatCommas  } = options;
    if (formatCommas) return (0, $kVMNA$etherslibutils.commify)(clipped);
    return clipped;
}
function $007c93864194fbc4$export$7fa9619042492a8a(balance, decimals, maxPrecision = 4, options = $007c93864194fbc4$var$defaultOptions) {
    if (!balance || !decimals) return "0";
    const clipped = (0, $68a1eb75299460be$export$735b087916fcd24e)(balance, maxPrecision);
    const { formatCommas: formatCommas  } = options;
    if (formatCommas) return (0, $kVMNA$etherslibutils.commify)(clipped);
    return clipped;
}


var $442ca5bd0d176a13$exports = {};

$parcel$export($442ca5bd0d176a13$exports, "formatPercent", () => $442ca5bd0d176a13$export$32e6b1ae352e94d6);
function $442ca5bd0d176a13$export$32e6b1ae352e94d6(decimalAmount, precision = 2) {
    const percent = (decimalAmount * 100).toFixed(precision);
    return `${percent}%`;
}


var $fafb4c330ddc06a8$exports = {};

$parcel$export($fafb4c330ddc06a8$exports, "sortAddresses", () => $fafb4c330ddc06a8$export$fa295b83bf634638);
function $fafb4c330ddc06a8$export$fa295b83bf634638(addresses) {
    const lowerCaseAddresses = addresses.map((address)=>address.toLowerCase());
    // map of lower case addresses to mixed case addresses
    const addressMap = {};
    lowerCaseAddresses.forEach((lowerCaseAddress, index)=>{
        addressMap[lowerCaseAddress] = addresses[index];
    });
    const sortedLowerCaseAddresses = lowerCaseAddresses.map((a)=>a).sort();
    const sortedAddresses = sortedLowerCaseAddresses.map((lowerCaseAddress)=>addressMap[lowerCaseAddress]);
    return sortedAddresses;
}


var $3578c23aa56390e6$exports = {};

$parcel$export($3578c23aa56390e6$exports, "validateAddresses", () => $3578c23aa56390e6$export$30140dd01348b2a4);

function $3578c23aa56390e6$export$30140dd01348b2a4(addresses) {
    addresses.forEach((address)=>{
        const isAddress = (0, $kVMNA$ethers.utils).isAddress(address);
        if (!isAddress) throw new Error(`Invalid parameter ${address} is not a valid address!`);
    });
}


$parcel$exportWildcard(module.exports, $f34c70895ba47bf3$exports);
$parcel$exportWildcard(module.exports, $a199ce3284f2ec67$exports);
$parcel$exportWildcard(module.exports, $070df8e59a3d40c0$exports);
$parcel$exportWildcard(module.exports, $17cb476856efe655$exports);
$parcel$exportWildcard(module.exports, $f7ae3a6e80060616$exports);
$parcel$exportWildcard(module.exports, $68a1eb75299460be$exports);
$parcel$exportWildcard(module.exports, $97d843f38382edc0$exports);
$parcel$exportWildcard(module.exports, $cc3fa230b27e0bf9$exports);
$parcel$exportWildcard(module.exports, $790f9f51db2ea0ee$exports);
$parcel$exportWildcard(module.exports, $6f1c40978ac1640b$exports);
$parcel$exportWildcard(module.exports, $cba8d800ce7bcb4e$exports);
$parcel$exportWildcard(module.exports, $e017be62a0c705d6$exports);
$parcel$exportWildcard(module.exports, $0c8525cb9040694d$exports);
$parcel$exportWildcard(module.exports, $ad28989426833e8e$exports);
$parcel$exportWildcard(module.exports, $a02536f8d3f9ea20$exports);
$parcel$exportWildcard(module.exports, $c0a0e83131955b16$exports);
$parcel$exportWildcard(module.exports, $aa095137cbdb3739$exports);
$parcel$exportWildcard(module.exports, $007c93864194fbc4$exports);
$parcel$exportWildcard(module.exports, $442ca5bd0d176a13$exports);
$parcel$exportWildcard(module.exports, $fafb4c330ddc06a8$exports);
$parcel$exportWildcard(module.exports, $3578c23aa56390e6$exports);


//# sourceMappingURL=index.js.map
