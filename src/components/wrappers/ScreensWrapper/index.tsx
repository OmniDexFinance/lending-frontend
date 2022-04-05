import React, { createContext, ReactNode, useContext, useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import Footer from '../../Footer';
import Menu from '../../menu/Menu';
import { BottomDisclaimer, TopDisclaimer } from '../../../ui-config';

import messages from './messages';
import staticStyles from './style';

import background from '../../../images/background.svg';

export interface ScreensWrapperProps {
  children: ReactNode;
}

export const TitleContext = createContext({
  title: '',
  setTitle: (title: string) => {},
});

export function useHeaderTitle() {
  const { title, setTitle } = useContext(TitleContext);
  return { title, setTitle };
}

export const TopPanelSmallContext = createContext({
  isTopPanelSmall: false,
  setTopPanelSmall: (isSmallTopLine: boolean) => {},
});

export function useWithDesktopTitle() {
  const { isTopPanelSmall, setTopPanelSmall } = useContext(TopPanelSmallContext);
  return { isTopPanelSmall, setTopPanelSmall };
}

export default function ScreensWrapper({ children }: ScreensWrapperProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm, md } = useThemeContext();

  const [title, setTitle] = useState(intl.formatMessage(messages.pageTitle));
  const [isTopPanelSmall, setTopPanelSmall] = useState(
    localStorage.getItem('isTopPanelSmall') === 'true' || false
  );

  const [scrollDir, setScrollDir] = useState('up');
  const scrollElementRef = useRef();
  const threshold = 0;
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  const updateScrollDir = () => {
    let el = document.getElementById('ScreensWrapper__content-wrapper');
    const scrollY = el!.scrollTop || 0;
    if (Math.abs(scrollY - lastScrollY) < threshold) {
      ticking = false;
      return;
    }
    setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
    lastScrollY = scrollY > 0 ? scrollY : 0;
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDir);
      ticking = true;
    }
  };

  return (
    <div
      className={classNames('ScreensWrapper', {
        ScreensWrapper__topPanelSmall: isTopPanelSmall,
      })}
    >
      <BottomDisclaimer />

      <TopDisclaimer />
      <Menu title={title} active={scrollDir == 'up'} />
      <main
        onScroll={(!sm && !md && onScroll) || (() => {})}
        className="ScreensWrapper__content"
        id="ScreensWrapper__content-wrapper"
      >
        <div
          className={
            isCurrentThemeDark
              ? 'ScreensWrapper__top-contentWrapperDark'
              : 'ScreensWrapper__top-contentWrapper'
          }
        />

        <TitleContext.Provider value={{ title, setTitle }}>
          <TopPanelSmallContext.Provider value={{ isTopPanelSmall, setTopPanelSmall }}>
            {children}
          </TopPanelSmallContext.Provider>
        </TitleContext.Provider>
      </main>

      <Footer inside={true} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .ScreensWrapper {
          transition: 200ms background ease;
          background: ${currentTheme.mainBg.hex};

          &__top-contentWrapper {
            background: transparent;
            &:after {
              background: transparent;
            }
          }

          &__top-contentWrapperDark {
            background: transparent;
            &:after {
              background: transparent;
            }
          }
        }
      `}</style>
    </div>
  );
}
