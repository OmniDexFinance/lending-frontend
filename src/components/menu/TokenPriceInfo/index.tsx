import React from 'react';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import { getTokenPrice } from '../../../helpers/get-token-price';
import staticStyles from './style';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';
import { getAssetInfo } from '../../../helpers/config/assets-config';

interface TokenPriceInfoProps {
  symbol: string;
}
export default function TokenPriceInfo({ symbol }: TokenPriceInfoProps) {
  const { currentTheme } = useThemeContext();
  const asset = symbol && getAssetInfo(symbol);
  const config = getNetworkConfig(41);
  if (asset === '' || config === undefined) {
    return null;
  }
  // const priceData = getTokenPrice({ symbol: config.rewardTokenSymbol });
  const priceData = getTokenPrice()
  return (
    <>
      <a
        href={
          'https://omnidex.finance/swap?outputCurrency=0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df'
        }
        className="TokenPriceInfo"
      >
        <img src={asset.icon} width={'24px'} alt={'CHARM token'} />
        {/* <span>${(priceData && priceData.market_data.current_price.usd.toFixed(3)) || 0}</span> */}
        <span>${(priceData && priceData.toFixed(3)) || 0}</span>
      </a>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TokenPriceInfo:hover img {
          transform: scale(1.1);
        }
        .TokenPriceInfo {
          color: ${currentTheme.textDarkBlue.hex};
          img {
            transition: 300ms transform ease;
          }
        }
      `}</style>
    </>
  );
}
