import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import TopPanelWrapper from '../TopPanelWrapper';
import ContentWrapper from '../ContentWrapper';
import ContentWrapperWithTopLine from '../ContentWrapperWithTopLine';
import AssetsFilterPanel from '../../AssetsFilterPanel';
import DesktopPageTitle from '../../DesktopPageTitle';
import Row from '../../basic/Row';
import Value from '../../basic/Value';

import messages from './messages';
import staticStyles from './style';

interface DepositBorrowMainWrapperProps {
  children: ReactNode;
  items: ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
  itemsTitle: string;
  isShowRightPanel?: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  showOnlyStableCoins: boolean;
  setShowOnlyStableCoins: (value: boolean) => void;
  withSwitchMarket?: boolean;
  totalValue: string | number;
}

export default function DepositBorrowMainWrapper({
  children,
  items,
  pageTitle,
  itemsTitle,
  isShowRightPanel,
  searchValue,
  setSearchValue,
  showOnlyStableCoins,
  setShowOnlyStableCoins,
  withSwitchMarket,
  totalValue,
  pageSubtitle,
}: DepositBorrowMainWrapperProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  return (
    <>
      <TopPanelWrapper
        isCollapse={true}
        withoutCollapseButton={true}
        className={'DepositBorrowTopPanelWrapper'}
      >
        <DesktopPageTitle title={pageTitle} subTitle={pageSubtitle} />
      </TopPanelWrapper>
      <div className="DepositBorrowMainWrapper">
        <div className="DepositBorrowMainWrapper__left-inner">
          {!sm && (
            <>
              <AssetsFilterPanel
                optionTitleLeft={intl.formatMessage(messages.optionTitleLeft)}
                optionTitleRight={intl.formatMessage(messages.optionTitleRight)}
                switchValue={showOnlyStableCoins}
                switchOnToggle={setShowOnlyStableCoins}
                searchValue={searchValue}
                searchOnChange={setSearchValue}
                darkOnDarkMode={true}
              />
              <ContentWrapper>
                <div className="DepositBorrowMainWrapper__content">{children}</div>
              </ContentWrapper>
            </>
          )}

          {sm && <div className="DepositBorrowMainWrapper__mobile--content">{children}</div>}
        </div>

        {isShowRightPanel && (
          <div className="DepositBorrowMainWrapper__right-inner">
            <ContentWrapperWithTopLine title={itemsTitle}>
              <div className="DepositBorrowMainWrapper__items">{items}</div>
              <Row
                className="DepositBorrowMainWrapper__total"
                title={intl.formatMessage(messages.total)}
              >
                <Value
                  value={totalValue}
                  tokenIcon={true}
                  withoutSymbol={true}
                  symbol="USD"
                  maximumValueDecimals={2}
                />
              </Row>
            </ContentWrapperWithTopLine>
          </div>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ScreenWrapper > .Submenu {
          margin-top: 60px;
        }
        .DepositBorrowMainWrapper h2 {
          padding-left: 15px;
        }
        .DepositBorrowMainWrapper {
          &__caption {
            color: ${currentTheme.textDarkBlue.hex};
          }
          .DepositBorrowMainWrapper__changeMarket-inner {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </>
  );
}
