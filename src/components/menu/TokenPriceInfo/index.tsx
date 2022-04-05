import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';
import { normalize } from '@aave/protocol-js';

import { useMenuContext } from '../../../libs/menu';
import { getTokenPrice } from '../../../helpers/get-token-price';
import staticStyles from './style';
import messages from './messages';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';
import useGetEnsName from '../../../libs/hooks/use-get-ens-name';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';

interface TokenPriceInfoProps {
  symbol: string;
}
export default function TokenPriceInfo({ symbol }: TokenPriceInfoProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const asset = symbol && getAssetInfo(symbol);
  const [visible, setVisible] = useState(false);
  const config = getNetworkConfig(41);
  const networkName = config && config.name;
  if (asset == '' || config == undefined) {
    return null;
  }
  const priceData = getTokenPrice({ symbol: config.rewardTokenSymbol });
  return (
    <>
      <a
        href={
          'https://omnidex.finance/swap?outputCurrency=0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df'
        }
        className="TokenPriceInfo"
      >
        <img src={asset.icon} width={'24px'} />
        <span>${(priceData && priceData.market_data.current_price.usd.toFixed(3)) || 0}</span>
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
