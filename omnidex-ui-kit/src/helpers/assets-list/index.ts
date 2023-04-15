import aIcons from './aIcons';
import icons from './icons';

export interface Asset {
  name: string;
  symbol: string;
  formattedSymbol?: string;
  color?: string;
  icon?: string;
  aIcon?: string;
  symbolFormatted?: string;
  symbolsArray?: string[];
  formattedName?: string;
  shortSymbol?: string;
}

export const assetsList: Asset[] = [
  {
    name: 'Karma',
    symbol: 'KARMA',
    color: '#c75b01',
    icon: icons.karma,
    aIcon: aIcons.akarma,
  },
  {
    name: 'Telos',
    symbol: 'WTLOS',
    color: '#885bd3',
    icon: icons.wtlos,
    aIcon: aIcons.awtlos,
  },
  {
    name: 'Telos',
    symbol: 'TLOS',
    color: '#885bd3',
    icon: icons.tlos,
    aIcon: aIcons.atlos,
  },
  {
    name: 'Charm',
    symbol: 'CHARM',
    color: '#a66ef2',
    icon: icons.charm,
    aIcon: aIcons.acharm,
  },
  {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    color: '#000000',
    icon: icons.weth,
    aIcon: aIcons.aweth,
  },
  {
    name: 'ETH',
    symbol: 'ETH',
    color: '#000000',
    icon: icons.weth,
    aIcon: aIcons.aweth,
  },
  {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    color: '#eb9444',
    icon: icons.wbtc,
    aIcon: aIcons.awbtc,
  },
  {
    name: 'BTC',
    symbol: 'BTC',
    color: '#eb9444',
    icon: icons.wbtc,
    aIcon: aIcons.awbtc,
  },
  {
    name: 'Avax',
    symbol: 'AVAX',
    color: '#e84142',
    icon: icons.avax,
    aIcon: aIcons.aavax,
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    formattedSymbol: 'USDC',
    color: '#2775c9',
    icon: icons.usdc,
    aIcon: aIcons.ausdc,
  },
  {
    name: 'USDT Coin',
    symbol: 'USDT',
    formattedSymbol: 'USDT',
    color: '#26a17b',
    icon: icons.usdt,
    aIcon: aIcons.ausdt,
  },
];

export const getAssetInfoFactory = (_assetsList: Asset[]) => (_assetSymbol: string): Asset => {
  const assetSymbol = _assetSymbol.toUpperCase();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const asset = _assetsList.find((asset: Asset) => asset.symbol === assetSymbol);
  const symbolFormatted = (asset && asset.formattedSymbol) || (asset && asset.symbol);
  const symbolsArray = symbolFormatted?.split('_').filter(e => String(e).trim());

  const isSymbolsArrayMoreThanOne = !!symbolsArray && symbolsArray.length > 1;
  const formattedName = isSymbolsArrayMoreThanOne ? asset && asset.name : symbolFormatted;

  if (asset) {
    return {
      ...asset,
      symbolFormatted,
      symbolsArray,
      formattedName,
    };
  }

  return {
    name: assetSymbol,
    symbol: assetSymbol,
  };
};

export const getAssetInfo = getAssetInfoFactory(assetsList);
