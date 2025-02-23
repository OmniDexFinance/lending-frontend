import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import { getLPTokenPoolLink } from '../../../../helpers/lp-tokens';
import { RATES_HISTORY_ENDPOINT } from '../../../../helpers/config/misc-config';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import NoDataPanel from '../../../../components/NoDataPanel';
import ReserveInformation from '../../components/ReserveInformation';
import UserInformation from '../../components/UserInformation';
import BorrowAPR from '../../components/Graphs/BorrowAPR';
import DepositAPY from '../../components/Graphs/DepositAPY';
import UtilisationRate from '../../components/Graphs/UtilisationRate';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/blueLinkIcon.svg';
import { getAssetInfo } from '../../../../helpers/config/assets-config';
import { useReserveRatesHistory } from '../../../../libs/pool-data-provider/hooks/use-reserve-rates-history';

function Charts({ poolReserve }: { poolReserve: ValidationWrapperComponentProps['poolReserve'] }) {
  const { data, loading } = useReserveRatesHistory(poolReserve.id);
  return (
    <div className="ReserveOverview__graphs-wrapper">
      <div className="ReserveOverview__graphs-inner">
        {(loading || data.length !== 0) && (
          <>
            <BorrowAPR
              data={data}
              borrowingEnabled={poolReserve.borrowingEnabled}
              stableBorrowRateEnabled={poolReserve.stableBorrowRateEnabled}
            />
            <DepositAPY data={data} borrowingEnabled={poolReserve.borrowingEnabled} />
            <UtilisationRate data={data} borrowingEnabled={poolReserve.borrowingEnabled} />
          </>
        )}
      </div>
    </div>
  );
}

function ReserveOverview({
  poolReserve,
  userReserve,
  currencySymbol,
  walletBalance,
  user,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const asset = getAssetInfo(currencySymbol);

  const poolLink = getLPTokenPoolLink({
    symbol: currencySymbol,
    underlyingAsset: poolReserve.underlyingAsset,
  });

  const isReserveHistoryGraphsVisible = !!RATES_HISTORY_ENDPOINT;

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle, { currencySymbol: asset.formattedName })}
      isTitleOnDesktop={
        (!sm && !poolReserve.borrowingEnabled) || (!sm && !isReserveHistoryGraphsVisible)
      }
      isTopLineSmall={
        !(!sm && !poolReserve.borrowingEnabled) || (!sm && !isReserveHistoryGraphsVisible)
      }
      className="ReserveOverview"
      titleComponent={
        <p>
          <img src={asset.icon} height={'24px'} alt={asset.formattedName + ' token'} />{' '}
          <span>
            {intl.formatMessage(messages.pageTitle, { currencySymbol: asset.formattedName })}
          </span>
        </p>
      }
      titleWide={true}
      withMobileGrayBg={true}
    >
      <div className="ReserveOverview__content">
        <div className="ReserveOverview__mobileUserInformation-wrapper">
          {user ? (
            <UserInformation
              symbol={currencySymbol}
              user={user}
              poolReserve={poolReserve}
              userReserve={userReserve}
              walletBalance={walletBalance}
            />
          ) : (
            <NoDataPanel
              title={intl.formatMessage(messages.noConnectWalletCaption)}
              description={intl.formatMessage(messages.noConnectWalletDescription)}
              withConnectButton={true}
              className="ReserveOverview__noDataPanel"
            />
          )}
        </div>

        {sm && poolLink && (
          <div className="ReserveOverview__poolLink-inner">
            <p>
              {intl.formatMessage(messages.provideLiquidity, {
                here: (
                  <Link
                    to={poolLink}
                    title={intl.formatMessage(messages.here)}
                    absolute={true}
                    inNewWindow={true}
                    bold={true}
                    color="secondary"
                  />
                ),
              })}
            </p>
            <img
              src={linkIcon}
              alt={intl.formatMessage(messages.here)}
              title={intl.formatMessage(messages.here)}
            />
          </div>
        )}

        {poolReserve.borrowingEnabled && isReserveHistoryGraphsVisible && (
          <Charts poolReserve={poolReserve} />
        )}

        <div className="ReserveOverview__content-wrapper">
          <ReserveInformation
            poolReserve={poolReserve}
            marketRefPriceInUsd={marketRefPriceInUsd}
            symbol={currencySymbol}
          />

          <div className="ReserveOverview__information ReserveOverview__user-information">
            <h3 className="ReserveOverview__information-title">
              {intl.formatMessage(messages.userCaption)}
            </h3>

            <ContentWrapper
              className={classNames('ReserveOverview__user-informationInner', {
                ReserveOverview__noUser: !user,
              })}
            >
              {user ? (
                <UserInformation
                  symbol={currencySymbol}
                  user={user}
                  poolReserve={poolReserve}
                  userReserve={userReserve}
                  walletBalance={walletBalance}
                />
              ) : (
                <NoDataPanel
                  title={intl.formatMessage(messages.noConnectWalletCaption)}
                  description={intl.formatMessage(messages.noConnectWalletDescription)}
                  withConnectButton={true}
                  className="ReserveOverview__noDataPanel"
                />
              )}
            </ContentWrapper>
          </div>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ContentWrapper.ReserveOverview__user-informationInner {
          border: 0px;
        }
        .ReserveOverview {
          &__information-title,
          &__poolLink-inner {
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__noUser {
            background: ${currentTheme.whiteElement.hex} !important;
          }
        }
        .ReserveOverview .DesktopPageTitle img,
        .ReserveOverview .DesktopPageTitle span {
          vertical-align: middle;
        }
      `}</style>
    </ScreenWrapper>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
})(ReserveOverview);
