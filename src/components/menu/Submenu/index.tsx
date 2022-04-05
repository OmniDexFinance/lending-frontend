import React, { ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext } from '@omnidex/omnidex-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';
import SubmenuLink from '../SubmenuLink';
import MoreButton from '../MoreButton';
import AddressInfo from '../AddressInfo';
import MobileContent from '../MobileContent';
import { LOGO } from '../../../ui-config';

import { Navigation } from '../navigation';

import staticStyles from './style';

import backIcon from '../../../images/mobileBackArrow.svg';

interface SubmenuProps {
  links: Navigation[];
  index?: number;
  visible?: boolean;
  classname?: string;
}
export default function Submenu({ links, index, classname, visible = false }: SubmenuProps) {
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const isActive = (url: string) => {
    return `/${url.split('/')[1]}` === `/${location.pathname.split('/')[1]}`;
  };

  const topLineColor = rgba(`${currentTheme.white.rgb}, 0.1`);

  return (
    <div
      className={classNames('Submenu', classname, {
        Submenu__active: visible,
      })}
    >
      <nav className="Submenu__navigation-inner">
        <ul>
          {links.map((link, index) => (
            <li
              className={classNames('Submenu__link-inner', {
                Submenu__linkHidden:
                  (!currentAccount && link.hiddenWithoutWallet) ||
                  (link.isVisible && !link.isVisible(currentMarketData)),
                Submenu__linkfirst: index == 0,
              })}
              key={index}
            >
              <SubmenuLink
                to={link.link}
                title={intl.formatMessage(link.title)}
                absolute={link.absolute}
                isActive={isActive(link.link)}
              />
            </li>
          ))}
        </ul>
      </nav>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .Submenu {
            background: ${currentTheme.whiteElement.hex};
            border-color: ${currentTheme.border.hex};
          }
        `}
      </style>
    </div>
  );
}
