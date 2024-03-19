import {
  AZTEC_TICKER,
  DBSP_TICKER,
} from '../../../shared/store/slices/aztc-deposits/aztc-deposits.types';

export const COINS = {
  BITCOIN: require('./bitcoin.png'),
  ETHEREUM: require('./eth.png'),
  USDT: require('./USDT.png'),
  USDT_ROUND: require('./usdtRound.png'),
  RIPPLE: require('./mer.png'),
  DASH: require('./dash.png'),
  NEM: require('./nem.png'),
  EMC: require('./emc.png'),
  ETP: require('./etp.png'),
  FLUX: require('./flux.png'),
  GDB: require('./gdb.png'),
  CDN: require('./cdn.png'),
  LUN: require('./lun.png'),
  XRP: require('./xrp.png'),
  DAI: require('./DAI.png'),
  XMR: require('./XMR.png'),
  BUSD: require('./BUSD.png'),
  BSP: require('./bsp.png'),
  BSD: require('./bspDollar.png'),
  BSP_AZTECA: require('./azteca.png'),
  BNB: require('./bnbAmarillo.png'),
  USD: require('./usd_icon.png'),
  MXN: require('./mxn.png'),
};

export function GetImageForCoin(COIN: string) {
  switch (COIN.toUpperCase()) {
    case 'MXN':
      return COINS.MXN;
    case 'BTC':
      return COINS.BITCOIN;
    case 'ETH':
      return COINS.ETHEREUM;
    case 'XMR':
      return COINS.XMR;
    case 'DAI':
      return COINS.DAI;
    case 'BUSD':
      return COINS.BUSD;
    case 'USDT':
      return COINS.USDT;
    case 'BNB':
      return COINS.BNB;
    case 'BSP':
      return COINS.BSP;
    case AZTEC_TICKER.toUpperCase():
      return COINS.BSP_AZTECA;
    case DBSP_TICKER.toUpperCase():
      return COINS.BSD;
    case 'USD':
      return COINS.USD;
    default:
      return null;
  }
}
