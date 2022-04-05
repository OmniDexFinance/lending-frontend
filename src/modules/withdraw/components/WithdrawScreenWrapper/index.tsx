import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
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

interface WithdrawScreenWrapperProps {
  title: string;
  currencySymbol: string;
  balanceInProtocol: string;
  balanceInProtocolInUSD: string;
  healthFactor: string;
  loanToValue: string;
  children: ReactNode;
}

export default function WithdrawScreenWrapper({
  title,
  currencySymbol,
  balanceInProtocol,
  balanceInProtocolInUSD,
  healthFactor,
  loanToValue,
  children,
}: WithdrawScreenWrapperProps) {
  const intl = useIntl();
  const { lg, md, sm, isCurrentThemeDark, currentTheme } = useThemeContext();
  return (
    <>
      <RepayWithdrawWrapper className="WithdrawScreenWrapper" title={title}>
        <Row
          title={intl.formatMessage(messages.balanceInAave)}
          color={isCurrentThemeDark ? 'white' : 'dark'}
          weight="light"
        >
          <Value
            value={Number(balanceInProtocol)}
            subValue={Number(balanceInProtocolInUSD)}
            color={isCurrentThemeDark ? 'white' : 'dark'}
            symbol={currencySymbol}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(currencySymbol) ? 4 : 18}
            minimumValueDecimals={isAssetStable(currencySymbol) ? 4 : 17}
            maximumSubValueDecimals={2}
            minimumSubValueDecimals={2}
          />
        </Row>
        <HealthFactor
          className={classNames({ WithdrawScreenWrapper__healthFactor: !sm })}
          value={healthFactor}
          titleColor={isCurrentThemeDark ? 'white' : 'dark'}
          titleLightWeight={true}
          isColumn={!sm}
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
          isColumn={!sm}
        >
          <ValuePercent value={loanToValue} color={isCurrentThemeDark ? 'white' : 'dark'} />
        </Row>

        <CollateralCompositionBar isColumn={(lg && !md) || sm} />
      </RepayWithdrawWrapper>

      <ContentWrapper withFullHeight={true} withBackButton={true}>
        {children}
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>

      <style jsx={true} global={true}>
        {`
          .WithdrawScreenWrapper {
            .CollateralCompositionBar {
              color: ${currentTheme.textDarkBlue.hex};
            }

            border: 1px solid ${currentTheme.border.hex};
            border-radius: 15px;
          }
        `}
      </style>
    </>
  );
}
