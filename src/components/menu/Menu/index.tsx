import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';
import MenuLink from '../MenuLink';
import AddressInfo from '../AddressInfo';
import TokenInfo from '../TokenPriceInfo';
import MobileContent from '../MobileContent';
import { LOGO, LOGO_DARK, LOGO_SMALL } from '../../../ui-config';
import LangSwitcher from '../../basic/LangSwitcher';
import UserSettings from '../UserSettings';

import staticStyles from './style';

import navigation from '../navigation';

import backIcon from '../../../images/mobileBackArrow.svg';
import backIconDark from '../../../images/mobileBackArrowDark.svg';

interface MenuProps {
  title: string;
  active: boolean;
}

export default function Menu({ title, active }: MenuProps) {
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, md } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const isActive = (url: string) => {
    return `/${url.split('/')[1]}` === `/${location.pathname.split('/')[1]}`;
  };

  return (
    <header
      className={classNames('Menu', {
        Menu__active: active,
      })}
    >
      <div className="Menu__container">
        <div className="Menu__left-inner">
          <div className="Menu__logo-inner">
            <Link className="Menu__logo-link" to="/markets" onClick={() => goToTop()}>
              <h1 className={'hidden'}>Omnidex, borrow and loan on Telos</h1>
              {(isCurrentThemeDark && (
                <img
                  src={md ? LOGO_SMALL : LOGO_DARK}
                  alt={'Omnidex, first Telos lending protocol'}
                />
              )) || (
                <img src={md ? LOGO_SMALL : LOGO} alt={'Omnidex, first Telos lending protocol'} />
              )}
            </Link>
          </div>

          <div>
            <nav className="Menu__navigation-inner">
              <ul>
                {navigation.map((link, index) => (
                  <li
                    className={classNames('Menu__link-inner', {
                      Menu__linkHidden:
                        (!currentAccount && link.hiddenWithoutWallet) ||
                        (link.isVisible && !link.isVisible(currentMarketData)),
                      Menu__linkfirst: index === 0,
                    })}
                    key={index}
                  >
                    <MenuLink
                      to={link.link}
                      title={intl.formatMessage(link.title)}
                      absolute={link.absolute}
                      isActive={index === navigation.length - 1}
                      children={link.children}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="Menu__title-inner">
          {history.length > 2 && (
            <button className="Menu__back-button" onClick={history.goBack}>
              <img src={isCurrentThemeDark ? backIcon : backIconDark} alt="" />
            </button>
          )}

          <p>{title}</p>
        </div>
        <div className="Menu__right-inner">
          <TokenInfo symbol="CHARM" />
          <div className="Menu__buttons-inner">
            <LangSwitcher />
            <UserSettings />
            <AddressInfo />
          </div>
        </div>

        <div className="Menu__burger-inner">
          <MobileContent isActive={isActive} currentAccount={currentAccount} />
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Menu__container:after {
          background: ${currentTheme.headerBg.hex} !important;
        }
        .Menu__logo-link {
          margin-right: 30px;
        }
        .Menu h1 {
          display: none;
        }
        .Menu {
          background: ${currentTheme.headerBg.hex}!important;
          border-bottom: 1px solid ${currentTheme.border.hex};
          &__icon {
            transition: 400ms all ease;
            fill: ${currentTheme.textDarkBlue.hex};
            margin-left: 20px;
          }
          &__logo-inner {
            span {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          &__right-inner {
            z-index: 2;
          }
          &__left-inner {
            display: flex;
            align-items: center;
            z-index: 2;
          }
          &__title-inner {
            p {
              color: ${currentTheme.blackElement.hex};
            }
          }
        }
      `}</style>
    </header>
  );
}
