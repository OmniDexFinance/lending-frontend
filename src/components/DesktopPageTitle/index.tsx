import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import staticStyles from './style';

interface DesktopPageTitleProps {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  wide?: boolean;
}

export default function DesktopPageTitle({ title, subTitle, wide = false }: DesktopPageTitleProps) {
  const { currentTheme } = useThemeContext();
  return (
    <div
      className={classNames('DesktopPageTitle', {
        DesktopPageTitle__wide: wide,
      })}
    >
      <h2>
        <div>{title}</div>
      </h2>
      {/* <h3 className="DesktopPageTitle__subTitle">{subTitle}</h3> */}
      <p className="DesktopPageTitle__subTitle">&nbsp; </p>
      <p className="DesktopPageTitle__subTitle">
        Notice: Karma pool has been switched to withdraw only due to low exchange liquidity.
      </p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .DesktopPageTitle {
          max-width: 400px;
          &__wide {
            border: 1px solid ${currentTheme.border.hex};
            background: ${currentTheme.whiteElement.hex};
          }
          p {
            font-size: 18px;
            color: ${currentTheme.textDarkBlue.hex};
          }
          h2 {
            font-size: 52px;
            color: ${currentTheme.textDarkBlue.hex};
            margin-bottom: 25px;
          }
        }
        .DesktopPageTitle.DesktopPageTitle__wide {
          max-width: 100%;
          h2 {
            font-size: 24px;
            margin-bottom: 0px;
            justify-content: center;
          }
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
}
