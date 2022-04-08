import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import Row from '../../../../components/basic/Row';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Value from '../../../../components/basic/Value';
import HealthFactor from '../../../../components/HealthFactor';
import MaxLTVHelpModal from '../../../../components/HelpModal/MaxLTVHelpModal';
import ValuePercent from '../../../../components/basic/ValuePercent';
import RepayWithdrawWrapper from '../../../../components/wrappers/RepayWithdrawWrapper';
import CollateralCompositionBar from '../../../../components/compositionBars/CollateralCompositionBar';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';

interface RepayScreenWrapperProps {
  title: string;
  currencySymbol: string;
  currentBorrows: string;
  currentBorrowsInUSD: string;
  walletBalance: string;
  walletBalanceInUSD: string;
  totalCollateralUSD: string;
  totalCollateralMarketReferenceCurrency: string;
  healthFactor: string;
  loanToValue: string;
  children: ReactNode;
}

export default function RepayScreenWrapper({
  title,
  currencySymbol,
  currentBorrows,
  currentBorrowsInUSD,
  walletBalance,
  walletBalanceInUSD,
  totalCollateralUSD,
  totalCollateralMarketReferenceCurrency,
  healthFactor,
  loanToValue,
  children,
}: RepayScreenWrapperProps) {
  const intl = useIntl();
  const { networkConfig } = useProtocolDataContext();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  return (
    <>
      <RepayWithdrawWrapper className="RepayScreenWrapper" title={title}>
        <div className="RepayScreenWrapper__items-wrapper">
          <Row
            title={intl.formatMessage(messages.youBorrowed)}
            color={isCurrentThemeDark ? 'white' : 'dark'}
            weight="light"
          >
            <Value
              value={Number(currentBorrows)}
              subValue={Number(currentBorrowsInUSD)}
              color={isCurrentThemeDark ? 'white' : 'dark'}
              symbol={currencySymbol}
              subSymbol="USD"
              maximumValueDecimals={isAssetStable(currencySymbol) ? 4 : 18}
              minimumValueDecimals={isAssetStable(currencySymbol) ? 1 : 5}
              maximumSubValueDecimals={2}
              minimumSubValueDecimals={2}
            />
          </Row>

          <Row
            title={intl.formatMessage(messages.walletBalance)}
            color={isCurrentThemeDark ? 'white' : 'dark'}
            weight="light"
          >
            <Value
              value={Number(walletBalance)}
              subValue={Number(walletBalanceInUSD)}
              color={isCurrentThemeDark ? 'white' : 'dark'}
              symbol={currencySymbol}
              subSymbol="USD"
              maximumValueDecimals={isAssetStable(currencySymbol) ? 4 : 18}
              minimumValueDecimals={isAssetStable(currencySymbol) ? 1 : 5}
              maximumSubValueDecimals={2}
              minimumSubValueDecimals={2}
            />
          </Row>
        </div>

        <div className="RepayScreenWrapper__items-wrapper">
          <Row
            title={intl.formatMessage(messages.yourCollateral)}
            color={isCurrentThemeDark ? 'white' : 'dark'}
            weight="light"
          >
            <Value
              value={Number(totalCollateralUSD)}
              subValue={
                !networkConfig.usdMarket
                  ? Number(totalCollateralMarketReferenceCurrency)
                  : undefined
              }
              color={isCurrentThemeDark ? 'white' : 'dark'}
              symbol="USD"
              subSymbol="TLOS"
              maximumValueDecimals={2}
              minimumValueDecimals={2}
              maximumSubValueDecimals={18}
              minimumSubValueDecimals={5}
            />
          </Row>

          <CollateralCompositionBar
            isColumn={true}
            colorTitle={isCurrentThemeDark ? 'white' : 'dark'}
          />
        </div>

        <div className="RepayScreenWrapper__items-wrapper">
          <HealthFactor
            value={healthFactor}
            titleColor={isCurrentThemeDark ? 'white' : 'dark'}
            titleLightWeight={true}
          />
          <Row
            title={
              <MaxLTVHelpModal
                text={intl.formatMessage(messages.loanToValue)}
                color={isCurrentThemeDark ? 'white' : 'dark'}
                lightWeight={true}
              />
            }
            color={isCurrentThemeDark ? 'white' : 'dark'}
            weight="light"
          >
            <ValuePercent value={loanToValue} color={isCurrentThemeDark ? 'white' : 'dark'} />
          </Row>
        </div>
      </RepayWithdrawWrapper>

      <ContentWrapper
        withFullHeight={true}
        withBackButton={true}
        className="RepayScreenWrapper__content"
      >
        {children}
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>

      <style jsx={true} global={true}>
        {`
          .RepayScreenWrapper {
            border: 1px solid ${currentTheme.border.hex};
            border-radius: 15px;
          }
        `}
      </style>
    </>
  );
}
