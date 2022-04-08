import React from 'react';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import Row from '../../basic/Row';
import CompositionBar from '../CompositionBar';

import { getAssetColor, getAssetInfo } from '../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

interface BorrowCompositionBarProps {
  colorTitle?: 'white' | 'dark' | 'lightBlue';
}
export default function BorrowCompositionBar({ colorTitle = 'white' }: BorrowCompositionBarProps) {
  const intl = useIntl();
  const { user } = useDynamicPoolDataContext();

  if (!user) {
    return null;
  }

  const {
    totalBorrowsMarketReferenceCurrency,
    availableBorrowsMarketReferenceCurrency,
    userReservesData,
  } = user;
  const maxBorrowAmount = new BigNumber(totalBorrowsMarketReferenceCurrency).plus(
    availableBorrowsMarketReferenceCurrency
  );
  const borrowComposition = userReservesData
    .filter((reserve) => reserve.totalBorrows !== '0')
    .map((userReserve) => ({
      title: getAssetInfo(userReserve.reserve.symbol).formattedName || '',
      value: userReserve.totalBorrows,
      percentage: new BigNumber(userReserve.totalBorrowsMarketReferenceCurrency)
        .div(maxBorrowAmount)
        .multipliedBy(100)
        .precision(20, BigNumber.ROUND_UP)
        .toNumber(),
      color: getAssetColor(userReserve.reserve.symbol),
    }));

  return (
    <Row
      title={intl.formatMessage(messages.title)}
      className="BorrowCompositionBar"
      weight="light"
      color={colorTitle}
      isColumn={true}
    >
      <CompositionBar dataset={borrowComposition} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
