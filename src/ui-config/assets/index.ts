import {
  Asset,
  assetsList as assetsListFromKit,
  assetsOrder as assetsOrderFromKit,
  STABLE_ASSETS as stableAssetsFromKit,
} from '@omnidex/omnidex-ui-kit';

export const assetsList: Asset[] = assetsListFromKit;

export const assetsOrder: string[] = assetsOrderFromKit;
export const stableAssets: string[] = stableAssetsFromKit;
