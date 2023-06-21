import React from 'react';
import classNames from 'classnames';
import { gradient, useThemeContext } from '@omnidex/omnidex-ui-kit';

import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';

import staticStyles from './style';

interface SubmenuLinkProps {
  to: string;
  title: string;
  isActive: boolean;
  hidden?: boolean;
  absolute?: boolean;
  firstItem?:boolean;
  lastItem?:boolean;
}

export default function SubmenuLink({ to, title, isActive, hidden, absolute, firstItem, lastItem }: SubmenuLinkProps) {
  const { currentTheme } = useThemeContext();

  const activeGradient = gradient(
    230,
    currentTheme.primary.rgb + ', 1',
    0,
    currentTheme.primary.rgb + ', 1',
    100
  );

  return (
    <div className={classNames('SubmenuItem__container', 
      {SubmenuItem__container__firstItem: (firstItem)},       
      {SubmenuItem__container__lastItem: (lastItem)})}>
    <Link
      to={to}
      absolute={absolute}
      className={classNames('SubmenuLink ButtonLink', {
        SubmenuLink__hidden: hidden,
        SubmenuLink__active: isActive,
      })}
      onClick={() => goToTop()}
    >
      <div className="SubmenuLink__title">
        <p>
          <b>{title}</b>
        </p>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SubmenuLink {
          color: ${currentTheme.textDarkBlue.hex};
          &__title {
            p,
            b,
            strong {
              color: ${currentTheme.textDarkBlue.hex} !important;
            }
            i {
              background: ${activeGradient} !important;
            }
          }
        }
      `}</style>
    </Link>
    </div>
  );
}
