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
    name: 'Wrapped Telos',
    symbol: 'WTLOS',
    color: '#9151b6',
    icon: icons.wtlos,
    aIcon: aIcons.awtlos,
  },
  {
    name: 'Telos',
    symbol: 'TLOS',
    color: '#9151b6',
    icon: icons.wtlos,
    aIcon: aIcons.awtlos,
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
    name: 'USD Coin',
    symbol: 'USDC',
    formattedSymbol: 'USDC',
    color: '#2775ca',
    icon: icons.usdc,
    aIcon: aIcons.ausdc,
  },
  {
    name: 'USDT Coin',
    symbol: 'USDT',
    formattedSymbol: 'USDT',
    color: '#28b171',
    icon: icons.usdt,
    aIcon: aIcons.ausdt,
  },
  {
    name: 'Staked TLOS',
    symbol: 'STLOS',
    formattedSymbol: 'STLOS',
    color: '#9151b6',
    icon: icons.stlos,
    aIcon: aIcons.stlos,
  },
];

export const getAssetInfoFactory =
  (_assetsList: Asset[]) =>
  (_assetSymbol: string): Asset => {
    const assetSymbol = _assetSymbol.toUpperCase();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const asset = _assetsList.find((asset: Asset) => asset.symbol === assetSymbol);
    const symbolFormatted = (asset && asset.formattedSymbol) || (asset && asset.symbol);
    const symbolsArray = symbolFormatted?.split('_').filter((e) => String(e).trim());

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
