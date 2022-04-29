export function calcSwapOutGivenInCCPoolUNSAFE(
  xAmount: string,
  xReserves: string,
  yReserves: string,
  totalSupply: string,
  timeRemainingSeconds: number,
  tParamSeconds: number,
  baseAssetIn: boolean,
): number {
  const tS = +totalSupply;
  const amountX = +xAmount;

  let xR = +xReserves;
  let yR = +yReserves + tS;

  if (baseAssetIn) {
    xR = +xReserves + tS;
    yR = +yReserves;
  }

  const t = timeRemainingSeconds / tParamSeconds;

  const xBefore = xR ** (1 - t);
  const yBefore = yR ** (1 - t);

  const xAfter = (xR + amountX) ** (1 - t);

  // this is the real equation, make ascii art for it
  const yAfter = (xBefore + yBefore - xAfter) ** (1 / (1 - t));

  const amountY = yR - yAfter;

  // This can happen if the reserve amounts can't cover the amount being swapped
  if (Number.isNaN(amountY)) {
    return 0;
  }

  return amountY;
}

export function calcSwapInGivenOutCCPoolUNSAFE(
  xAmount: string,
  yReserves: string,
  xReserves: string,
  totalSupply: string,
  timeRemainingSeconds: number,
  tParamSeconds: number,
  baseAssetIn: boolean,
): number {
  const tS = +totalSupply;
  const amountX = +xAmount;

  let xR = +xReserves;
  let yR = +yReserves + tS;

  if (baseAssetIn) {
    xR = +xReserves + tS;
    yR = +yReserves;
  }

  const t = timeRemainingSeconds / tParamSeconds;

  const xBefore = xR ** (1 - t);
  const yBefore = yR ** (1 - t);

  const xAfter = (xR - amountX) ** (1 - t);

  // this is the real equation, make ascii art for it
  const yAfter = (xBefore + yBefore - xAfter) ** (1 / (1 - t));

  const amountY = yAfter - yR;

  return amountY;
}

export function calcSwapCCPoolUNSAFE(
  xAmount: string,
  xReserves: string,
  yReserves: string,
  timeRemainingSeconds: number,
  tParamSeconds: number,
  getOutputQuote: boolean,
): number {
  const amountX = +xAmount;

  const xR = +xReserves;
  const yR = +yReserves;

  const t = timeRemainingSeconds / tParamSeconds;

  const xBefore = xR ** (1 - t);
  const yBefore = yR ** (1 - t);

  const xAfter = getOutputQuote
    ? (xR + amountX) ** (1 - t)
    : (xR - amountX) ** (1 - t);

  // this is the real equation, make ascii art for it
  const yAfter = (xBefore + yBefore - xAfter) ** (1 / (1 - t));

  const amountY = getOutputQuote ? yR - yAfter : yAfter - yR;

  return amountY;
}

// Computes how many tokens can be taken out of a pool if `amountIn` are sent, given the current
// balances and weights.  In our case the weights are the same so we don't need to add them to our
// calcs
/**********************************************************************************************
// outGivenIn                                                                                //
// aO = amountOut                                                                            //
// bO = balanceOut                                                                           //
// bI = balanceIn              /      /            bI             \    (wI / wO) \           //
// aI = amountIn    aO = bO * |  1 - | --------------------------  | ^            |          //
// wI = weightIn               \      \       ( bI + aI )         /              /           //
// wO = weightOut                                                                            //
**********************************************************************************************/
export function calcSwapOutGivenInWeightedPoolUNSAFE(
  amountIn: string,
  balanceOut: string,
  balanceIn: string,
): number {
  const aI = +amountIn;
  const bO = +balanceOut;
  const bI = +balanceIn;

  const amountOut = bO * (1 - bI / (bI + aI));

  return amountOut;
}

// Computes how many tokens must be sent to a pool in order to take `amountOut`, given the current
// balances and weights.  In our case the weights are the same so we don't need to add them to our
// calcs.
/**********************************************************************************************
// inGivenOut                                                                                //
// aO = amountOut                                                                            //
// bO = balanceOut                                                                           //
// bI = balanceIn              /  /            bO             \    (wO / wI)      \          //
// aI = amountIn    aI = bI * |  | --------------------------  | ^            - 1  |         //
// wI = weightIn               \  \       ( bO - aO )         /                   /          //
// wO = weightOut                                                                            //
**********************************************************************************************/
export function calcSwapInGivenOutWeightedPoolUNSAFE(
  amountOut: string,
  balanceOut: string,
  balanceIn: string,
): number {
  const aO = +amountOut;
  const bO = +balanceOut;
  const bI = +balanceIn;

  const amountIn = bI * (bO / (bO - aO) - 1);

  return amountIn;
}
