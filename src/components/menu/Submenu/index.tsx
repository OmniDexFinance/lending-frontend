import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import SubmenuLink from '../SubmenuLink';

import { Navigation } from '../navigation';

import staticStyles from './style';

interface SubmenuProps {
  links: Navigation[];
  index?: number;
  visible?: boolean;
  classname?: string;
}
export default function Submenu({ links, index, classname, visible = false }: SubmenuProps) {
  const location = useLocation();
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const isActive = (url: string) => {
    return `/${url.split('/')[1]}` === `/${location.pathname.split('/')[1]}`;
  };

  return (
    <div
      className={classNames('Submenu', classname, {
        Submenu__active: visible,
      })}
    >
      <nav className="Submenu__navigation-inner">
        <div>
          {links.map((link, index) => (
            <div
              className={classNames('Submenu__link-inner', {
                Submenu__linkHidden:
                  (!currentAccount && link.hiddenWithoutWallet) ||
                  (link.isVisible && !link.isVisible(currentMarketData)),        
              })}
              key={index}
            >
              <SubmenuLink
                to={link.link}
                title={intl.formatMessage(link.title)}
                absolute={link.absolute}
                isActive={isActive(link.link)}
                firstItem ={index===0}
                lastItem ={index===links.length-1}
              />
            </div>
          ))}
        </div>
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
