import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import staticStyles from './style';

interface APYCardProps {
  title: string;
  colorHex?: string;
  children?: ReactNode;
}

export default function APYCard({ title, colorHex = '#565055', children }: APYCardProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('APYCard', `APYCard__${colorHex}`)}>
      <div className="APYCard__title">
        <p>{title}</p>
      </div>
      <div className="APYCard__content">{children}</div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .APYCard {
          border-color: ${colorHex};
          .APYCard__title {
            background: ${colorHex};
            p {
              color: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
