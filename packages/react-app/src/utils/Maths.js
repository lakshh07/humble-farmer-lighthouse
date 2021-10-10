import Big from 'big.js';
import { getTokenPriceSeries  } from './testPrices';

//initial params
//klast, token quantities
/**
 * 
 * at each step
 * calculate new pool composition keeping klast constant
 * add fees into the pool with the quantity in the same order, recalculate klast
 * check if lp rewards have to be autocompounded into the pool
 */
function findNewPoolParams(klast, nToken1Price, nToken2Price) {
  let nTokenRatio = nToken1Price.div(nToken2Price)
  let nT1Q = klast.div(nTokenRatio).sqrt()
  let nT2Q = klast.div(nT1Q)
	let jCap = nT1Q.times(nToken1Price).plus(nT2Q.times(nToken2Price))
	return {
  	T1Q: nT1Q,
    T2Q: nT2Q,
  	totalVal: jCap
  }
}

function findInitPoolParams(initialCapital, T1P, T2P) {
    let T1Q = initialCapital.div(T1P).div(2);
    let T2Q = initialCapital.div(T2P).div(2)
    let klast = T1Q.times(T2Q)

    return {
        T1Q,
        T2Q,
        T1P,
        T2P,
        klast
    };
}

function* arrayToGen(arr){
    for(let i of arr){
        yield new Big(i);
    }
}

function hodlValue(nT1P, nT2P, iT1Q, iT2Q) {
	return nT1P.times(iT1Q).plus(nT2P.times(iT2Q));
}

function* generateFees(feePercentBase) {
    while(true){
        yield feePercentBase *  (1 + 0.2 * (Math.random() - 0.5)); 
    }
}

function* generateLpReturns(lpPercentBase, lpPriceGen) {

    for(let lp of lpPriceGen) {
        let lpTokenPrice = new Big(lp);
        let lpPercentVal = lpPercentBase * (1 + 0.1 * (Math.random() - 0.5));
        yield  { 
            percentVal: lpPercentVal,  
            price: lpTokenPrice 
        };
    }
}

function addFundsToPool(poolParams, fundValue) {
    let { T1Q, T2Q, T1P, T2P } = poolParams;
    let moreT1Q = fundValue.div(2).div(T1P);
    let moreT2Q = fundValue.div(2).div(T2P);
    let newT1Q = T1Q.add(moreT1Q);
    let newT2Q = T2Q.add(moreT2Q);
    let newKlast = newT1Q.times(newT2Q);
    return {
        T1Q: newT1Q,
        T2Q: newT2Q,
        T1P,
        T2P,
        klast: newKlast
    };
}


function* generateReturns(gT1P, gT2P, gFees, gLPs, initParams, strategy) {
    let poolParams = initParams; 
    
    let totalRewardTokens = 0;
	while(true) {

        let { klast, T1Q, T2Q } = poolParams;
        let nT1P = gT1P.next();
        let nT2P = gT2P.next();
        if(nT1P.done || nT2P.done) {
            break;
        }
        let res = findNewPoolParams(klast, nT1P.value, nT2P.value);
        res.T1P = nT1P.value;
        res.T2P = nT2P.value;
        let fees = gFees.next().value;
        let feesValue = res.totalVal.times(fees);
        poolParams = addFundsToPool(res, feesValue);
        let lp = gLPs.next();
        let lpValue = res.totalVal.times(lp.value.percentVal);
        if(strategy === 'autocompound') {
            poolParams = addFundsToPool(newPoolParams, lpValue);
        } else {
            let lpTokens = lpValue/lp.value.price ;
            totalRewardTokens = totalRewardTokens + lpTokens;
        }
        poolParams.hold_value = hodlValue(nT1P.value, nT2P.value, T1Q, T2Q);
        poolParams.total_value = res.totalVal;
        yield poolParams;
    }
}


function* modelFarm(feeBasePercent, lpFeesPercent, lpToken, initialCapital, poolToken1, poolToken2) {
    let lpTokenPrices = getTokenPriceSeries(lpToken);
    let token1Prices = getTokenPriceSeries(poolToken1);
    let token2Prices = getTokenPriceSeries(poolToken2);
    let initParams = findInitPoolParams(new Big(initialCapital), token1Prices[0], token2Prices[0]);

    yield* generateReturns(arrayToGen(token1Prices), arrayToGen(token2Prices), generateFees(feeBasePercent), generateLpReturns(lpFeesPercent, arrayToGen(lpTokenPrices)), initParams, "accumulate");

}


export  {
    generateReturns,
    modelFarm
}
