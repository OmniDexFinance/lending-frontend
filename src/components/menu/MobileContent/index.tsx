import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { useSwipeable } from 'react-swipeable';
import { useThemeContext, DropdownWrapper, SocialIcons } from '@omnidex/omnidex-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { useMenuContext } from '../../../libs/menu';
import goToTop from '../../../helpers/goToTop';
import Submenu from '../Submenu';
import Link from '../../basic/Link';
import ConnectionModeSwitcher from '../ConnectionModeSwitcher';
import LangSwitcher from '../../basic/LangSwitcher';
import AddressInfo from '../AddressInfo';
import DarkModeSwitcher from '../DarkModeSwitcher';

import { mobileNavigation } from '../navigation';
import { moreMenuExtraItems, moreMenuItems, socialIcons } from '../../../ui-config';

import staticStyles from './style';

interface MobileContentProps {
  isActive: (url: string) => boolean;
  currentAccount: string;
}

export default function MobileContent({ isActive, currentAccount }: MobileContentProps) {
  const intl = useIntl();
  const { currentTheme, md, isCurrentThemeDark } = useThemeContext();
  const { openMobileMenu, closeMobileMenu, mobileMenuVisible, setMobileMenuVisible } =
    useMenuContext();
  const { currentMarketData } = useProtocolDataContext();

  const visibilities: boolean[] = [];
  mobileNavigation.map((link, index) => {
    if (link.children) {
      visibilities[index] = false;
    }
    return link;
  });
  const [submenusVisibility, setSubmenusVisibility] = useState(visibilities);
  const [submenusVisibile, setSubmenusVisibile] = useState(0);
  const handleSubmenuVisibility = (index: number) => {
    submenusVisibility[index] = !submenusVisibility[index];
    setSubmenusVisibility(submenusVisibility);
    setSubmenusVisibile(submenusVisibile + 1);
  };
  const handleLinkClick = () => {
    goToTop();
    closeMobileMenu();
  };

  const handlers = useSwipeable({
    onSwipedRight: () => closeMobileMenu(),
  });

  useEffect(() => {
    if (mobileMenuVisible && !md) {
      closeMobileMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);
  return (
    <div {...handlers}>
      <div
        className={classNames('MobileContent__overlay', {
          MobileContent__overlayActive: mobileMenuVisible,
        })}
      />

      <DropdownWrapper
        visible={mobileMenuVisible}
        setVisible={setMobileMenuVisible}
        className="MobileContent"
        contentClassName="MobileContent__content-wrapper"
        contentId="MobileMenuContent"
        buttonComponent={
          <button
            className={classNames('MobileContent__button', {
              MobileContent__buttonActive: mobileMenuVisible,
            })}
            onClick={openMobileMenu}
            type="button"
          >
            <span className="MobileContent__button-box">
              <span className="MobileContent__button-inner" />
            </span>
          </button>
        }
      >
        <div className="MobileContent__content">
          <div className="MobileContent__top">
            <AddressInfo />
          </div>

          <div className="MobileContent__navigation">
            <ul>
              {mobileNavigation.map((link, index) => (
                <li
                  className={classNames('MobileContent__link-wrapper', {
                    MobileContent__linkHidden:
                      (!currentAccount && link.hiddenWithoutWallet) ||
                      (link.isVisible && !link.isVisible(currentMarketData)),
                  })}
                  key={'ml-' + index + ' ' + submenusVisibility[index]}
                >
                  {!link.onClick && !link.children ? (
                    <Link
                      className={classNames('MobileContent__link', {
                        MobileContent__linkActive: isActive(link.link),
                      })}
                      to={link.link}
                      absolute={link.absolute}
                      inNewWindow={link.absolute}
                      onClick={() => !link.absolute && handleLinkClick()}
                      color="white"
                    >
                      <span>{intl.formatMessage(link.title)}</span>
                    </Link>
                  ) : (
                    <div
                      className="MobileContent__link MobileContent__link-chat"
                      onClick={() => handleSubmenuVisibility(index)}
                    >
                      <span>
                        {intl.formatMessage(link.title)}{' '}
                        <svg
                          style={{
                            fill: currentTheme.textDarkBlue.hex,
                            transform: submenusVisibility[index] ? 'rotate(180deg)' : '',
                          }}
                          viewBox="0 0 24 24"
                          color="text"
                          width="24px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
                        </svg>
                      </span>
                      {link.children && (
                        <Submenu
                          visible={submenusVisibility[index]}
                          links={link.children}
                          classname={'MobileContent__submenu'}
                        />
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="MobileContent__bottom">
            <DarkModeSwitcher />
            <ConnectionModeSwitcher />
            <div className="MobileContent__lang-switcher">
              <LangSwitcher inside={true} />
            </div>

            <ul className="MobileContent__bottom-links">
              {moreMenuItems.map((link, index) => (
                <li
                  className={classNames('MobileContent__link-wrapper', {
                    MobileContent__linkHidden:
                      (!currentAccount && link.hiddenWithoutWallet) ||
                      (link.isVisible && !link.isVisible(currentMarketData)),
                  })}
                  key={index}
                >
                  <Link
                    className="MobileContent__link"
                    to={link.link}
                    absolute={link.absolute}
                    inNewWindow={link.absolute}
                    color={isCurrentThemeDark ? 'white' : 'dark'}
                  >
                    <span>{intl.formatMessage(link.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <SocialIcons
              icons={socialIcons}
              className="MobileContent__social-icons"
              iconHeight={40}
              iconWidth={40}
              white={isCurrentThemeDark}
            />
          </div>
        </div>
      </DropdownWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MobileContent {
          .MobileContent__linkHidden {
            display: none;
          }
          &__button-inner,
          &__button-inner:before,
          &__button-inner:after {
            background: ${currentTheme.textDarkBlue.hex};
          }

          .MobileContent__content-wrapper.DropdownWrapper__content {
            background: ${currentTheme.headerBg.hex};
          }

          &__bottom,
          &__top {
            &:after {
              background: ${currentTheme.white.hex};
            }
          }

          .MobileContent__link {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
