import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import toggleLocalStorageClick from '../../../../helpers/toggle-local-storage-click';
import TopPanelWrapper from '../../../../components/wrappers/TopPanelWrapper';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import MarketTable from '../../components/MarketTable';
import DesktopPageTitle from '../../../../components/DesktopPageTitle';
import MarketTableItem from '../../components/MarketTableItem';
import TotalMarketsSize from '../../components/TotalMarketsSize';
import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import MarketMobileCard from '../../components/MarketMobileCard';

import messages from './messages';
import staticStyles from './style';
import { useIncentivesDataContext } from '../../../../libs/pool-data-provider/hooks/use-incentives-data-context';

export default function Markets() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { reserves } = useDynamicPoolDataContext();
  const { reserveIncentives } = useIncentivesDataContext();
  const [isPriceInUSD, setIsPriceInUSD] = useState(
    localStorage.getItem('marketsIsPriceInUSD') === 'true'
  );
  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);
  let totalLockedInUsd = valueToBigNumber('0');
  let sortedData = reserves.map((reserve) => {
    totalLockedInUsd = totalLockedInUsd.plus(
      valueToBigNumber(reserve.totalLiquidity)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd)
    );

    const totalLiquidity = Number(reserve.totalLiquidity);
    const totalLiquidityInUSD = valueToBigNumber(reserve.totalLiquidity)
      .multipliedBy(reserve.priceInMarketReferenceCurrency)
      .multipliedBy(marketRefPriceInUsd)
      .toNumber();

    const totalBorrows = Number(reserve.totalDebt);
    const totalBorrowsInUSD = valueToBigNumber(reserve.totalDebt)
      .multipliedBy(reserve.priceInMarketReferenceCurrency)
      .multipliedBy(marketRefPriceInUsd)
      .toNumber();
    const reserveIncentiveData = reserveIncentives[reserve.underlyingAsset.toLowerCase()];
    return {
      totalLiquidity,
      totalLiquidityInUSD,
      totalBorrows: reserve.borrowingEnabled ? totalBorrows : -1,
      totalBorrowsInUSD: reserve.borrowingEnabled ? totalBorrowsInUSD : -1,
      id: reserve.id,
      underlyingAsset: reserve.underlyingAsset,
      currencySymbol: reserve.symbol,
      depositAPY: reserve.borrowingEnabled ? Number(reserve.supplyAPY) : -1,
      avg30DaysLiquidityRate: Number(reserve.avg30DaysLiquidityRate),
      stableBorrowRate:
        reserve.stableBorrowRateEnabled && reserve.borrowingEnabled
          ? Number(reserve.stableBorrowAPY)
          : -1,
      variableBorrowRate: reserve.borrowingEnabled ? Number(reserve.variableBorrowAPY) : -1,
      avg30DaysVariableRate: Number(reserve.avg30DaysVariableBorrowRate),
      borrowingEnabled: reserve.borrowingEnabled,
      stableBorrowRateEnabled: reserve.stableBorrowRateEnabled,
      aincentivesAPR: reserveIncentiveData ? reserveIncentiveData.aIncentives.incentiveAPR : '0',
      vincentivesAPR: reserveIncentiveData ? reserveIncentiveData.vIncentives.incentiveAPR : '0',
      sincentivesAPR: reserveIncentiveData ? reserveIncentiveData.sIncentives.incentiveAPR : '0',
    };
  });

  if (sortDesc) {
    if (sortName === 'currencySymbol') {
      sortedData.sort((a, b) =>
        b.currencySymbol.toUpperCase() < a.currencySymbol.toUpperCase() ? -1 : 0
      );
    } else {
      // @ts-ignore
      sortedData.sort((a, b) => a[sortName] - b[sortName]);
    }
  } else {
    if (sortName === 'currencySymbol') {
      sortedData.sort((a, b) =>
        a.currencySymbol.toUpperCase() < b.currencySymbol.toUpperCase() ? -1 : 0
      );
    } else {
      // @ts-ignore
      sortedData.sort((a, b) => b[sortName] - a[sortName]);
    }
  }

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      className="Markets"
      withMobileGrayBg={true}
    >
      <TopPanelWrapper isCollapse={true} withoutCollapseButton={true}>
        <div className="Markets__top-content">
          <DesktopPageTitle title="" subTitle={intl.formatMessage(messages.pageSubtitle)} />
          <TotalMarketsSize value={totalLockedInUsd.toNumber()} />
        </div>
      </TopPanelWrapper>

      <div className="Markets__content">
        <div className="Markets__price-switcher">
          <LabeledSwitcher
            value={!isPriceInUSD}
            leftOption="USD"
            rightOption={intl.formatMessage(messages.native)}
            onToggle={() =>
              toggleLocalStorageClick(isPriceInUSD, setIsPriceInUSD, 'marketsIsPriceInUSD')
            }
          />
        </div>

        <MarketTable
          sortName={sortName}
          setSortName={setSortName}
          sortDesc={sortDesc}
          setSortDesc={setSortDesc}
        >
          {sortedData.map((item, index) => (
            <MarketTableItem {...item} isPriceInUSD={isPriceInUSD} key={index} />
          ))}
        </MarketTable>

        <div className="Markets__mobile--cards">
          {sortedData.map((item, index) => (
            <MarketMobileCard {...item} key={index} />
          ))}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Markets {
          &__content {
            background: ${currentTheme.whiteElement.hex};
            border: 1px solid ${currentTheme.border.hex};
          }
          &__top-content {
            color: ${currentTheme.white.hex};
          }
          &__marketSwitcher--title {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </ScreenWrapper>
  );
}
