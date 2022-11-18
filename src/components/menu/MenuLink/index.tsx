import React, { useState } from 'react';
import classNames from 'classnames';
import { gradient, useThemeContext } from '@omnidex/omnidex-ui-kit';

import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';
import Submenu from '../Submenu';
import { Navigation } from '../navigation';

import staticStyles from './style';

interface MenuLinkProps {
  to: string;
  title: string;
  isActive: boolean;
  hidden?: boolean;
  absolute?: boolean;
  children?: Navigation[];
}

export default function MenuLink({
  to,
  title,
  isActive,
  hidden,
  absolute,
  children,
}: MenuLinkProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const [isVisible, setVisible] = useState(false);
  const activeGradient = gradient(230, `233, 152, 27, 1`, 0, `233, 152, 27, 1`, 100);

  return (
    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <Link
        to={to}
        absolute={absolute}
        className={classNames('MenuLink ButtonLink', {
          MenuLink__hidden: hidden,
          MenuLink__active: isActive,
        })}
        onClick={() => goToTop()}
      >
        <div className="MenuLink__title">
          <p>
            <b>{title}</b> <strong>{title}</strong>
          </p>
          <i />
        </div>
      </Link>
      {children && <Submenu links={children} visible={isVisible} />}
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Menu__link-inner:hover {
          transition: 400ms background ease;
          background: #353648;
          p {
            transition: 400ms color ease;
            color: ${currentTheme.white.hex} !important;
          }
        }
        .MenuLink {
          color: ${currentTheme.textDarkBlue.hex} !important;
          .MenuLink__title {
            i {
              background: ${activeGradient} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
