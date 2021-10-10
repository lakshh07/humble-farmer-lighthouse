export const LP_TOKEN_PRICE = [
    1,
    1.1,
    0.9,
    0.8,
    0.75,
    0.7,
    0.65,
    0.6,
    0.55,
    0.5
];


export const TOKEN1PRICE = [
    11,
    11.1,
    12.2,
    12.4,
    13.1,
    12.1,
    14.2,
    13.2,
    11.2,
    12
];


export const TOKEN2PRICE = [
    1,1,1,1,1,1,1,1,1,1
];

export function getTokenPriceSeries(tokenName) {
    switch(tokenName) {
        case 'token1': 
            return TOKEN1PRICE;
        case 'token2':
            return TOKEN2PRICE;
        case 'lp':
            return LP_TOKEN_PRICE;
        default: 
            return TOKEN2PRICE;
    }
}