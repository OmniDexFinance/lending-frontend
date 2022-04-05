import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { gradient, useThemeContext } from '@omnidex/omnidex-ui-kit';

import Row from '../../../basic/Row';
import Value from '../../../basic/Value';
import ValuePercent from '../../../basic/ValuePercent';
import HealthFactor from '../../../HealthFactor';
import { ValidationWrapperComponentProps } from '../../../RouteParamsValidationWrapper';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

interface TopInfoPanelProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  walletBalance?: string;
  type: 'deposit' | 'borrow';
}

export default function TopInfoPanel({
  userReserve,
  user,
  currencySymbol,
  walletBalance,
  type,
}: TopInfoPanelProps) {
  const intl = useIntl();
  const { currentTheme, xl, lg, sm, xs, isCurrentThemeDark } = useThemeContext();

  const decimals = isAssetStable(currencySymbol) ? 4 : xs ? 5 : 8;
  const gradientLine = gradient(
    90,
    `${currentTheme.secondary.rgb}, 1`,
    0,
    `${currentTheme.primary.rgb}, 1`,
    100
  );
  const isDeposit = type === 'deposit';

  const currentBorrows = userReserve ? valueToBigNumber(userReserve.totalBorrows).toString() : '0';

  return (
    <div className="TopInfoPanel">
      {isDeposit ? (
        <>
          <Row
            className="TopInfoPanel__line"
            title={intl.formatMessage(messages.yourBalanceInAave)}
            color={(sm && 'white') || 'dark'}
            isColumn={sm}
          >
            {user && userReserve && Number(userReserve.underlyingBalance) > 0 ? (
              <Value
                value={userReserve.underlyingBalance}
                symbol={currencySymbol}
                maximumValueDecimals={decimals}
                minimumValueDecimals={decimals}
                color={(sm && 'white') || 'dark'}
              />
            ) : (
              <span className="TopInfoPanel__no-data">—</span>
            )}
          </Row>

          <Row
            className="TopInfoPanel__line"
            title={intl.formatMessage(messages.yourWalletBalance)}
            color={(sm && 'white') || 'dark'}
            isColumn={sm}
          >
            {user && Number(walletBalance) > 0 ? (
              <Value
                value={Number(walletBalance)}
                symbol={currencySymbol}
                maximumValueDecimals={decimals}
                minimumValueDecimals={decimals}
                color={(sm && 'white') || 'dark'}
              />
            ) : (
              <span className="TopInfoPanel__no-data">—</span>
            )}
          </Row>
        </>
      ) : (
        <>
          <Row
            className="TopInfoPanel__line"
            title={intl.formatMessage(messages.youBorrowed)}
            color={(sm && 'white') || 'dark'}
            isColumn={sm}
          >
            {user && Number(currentBorrows) > 0 ? (
              <Value
                value={currentBorrows}
                symbol={currencySymbol}
                maximumValueDecimals={decimals}
                minimumValueDecimals={decimals}
                color={(sm && 'white') || 'dark'}
              />
            ) : (
              <span className="TopInfoPanel__no-data">—</span>
            )}
          </Row>

          <Row
            className="TopInfoPanel__line"
            title={intl.formatMessage(messages.totalCollateral)}
            color={(sm && 'white') || 'dark'}
            isColumn={sm}
          >
            {user && Number(user?.totalCollateralUSD) > 0 ? (
              <Value
                value={user?.totalCollateralUSD}
                symbol="USD"
                maximumValueDecimals={4}
                minimumValueDecimals={4}
                color={(sm && 'white') || 'dark'}
              />
            ) : (
              <span className="TopInfoPanel__no-data">—</span>
            )}
          </Row>

          <Row
            className="TopInfoPanel__line"
            title={intl.formatMessage(messages.loanToValue)}
            color={(sm && 'white') || 'dark'}
            isColumn={sm}
          >
            {user && Number(user?.currentLoanToValue) > 0 ? (
              <ValuePercent value={user?.currentLoanToValue} color={(sm && 'white') || 'dark'} />
            ) : (
              <span className="TopInfoPanel__no-data">—</span>
            )}
          </Row>
        </>
      )}

      {user && Number(user?.healthFactor) > 0 && (
        <HealthFactor
          className="TopInfoPanel__healthFactor"
          value={user?.healthFactor || '-1'}
          titleColor={(sm && 'white') || 'dark'}
          helpIconSize={xl && !lg ? 12 : lg && !sm ? 10 : sm ? 12 : 14}
          isColumn={sm}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .CurrencyOverview .GradientLine {
          background: ${((!sm || isCurrentThemeDark) && gradientLine) || 'white'} !important;
        }
        .TopInfoPanel {
          color: ${currentTheme.whiteElement.hex};
        }
      `}</style>
    </div>
  );
}
