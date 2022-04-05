import React, { ReactNode } from 'react';

import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import staticStyles from './style';

import animationCircle from '../../images/animationCircle.svg';
import animationCircleDark from '../../images/animationCircleDark.svg';
import omni from '../../images/omni.svg';

interface InfoPanelProps {
  children: ReactNode;
}

export default function InfoPanel({ children }: InfoPanelProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div className="InfoPanel">
      <img
        className="InfoPanel__circle"
        src={isCurrentThemeDark ? animationCircleDark : animationCircle}
        alt=""
      />

      <div className="InfoPanel__content-inner">
        <img className="InfoPanel__omni" src={omni} alt="" />
        <div className="InfoPanel__content">{children}</div>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .InfoPanel {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.secondary.hex};
        }
      `}</style>
    </div>
  );
}
