import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext, ScrollBar } from '@omnidex/omnidex-ui-kit';

interface CustomScrollProps {
  children: ReactNode;
  className?: string;
  color?: string;
  onUpdate?: (value: any) => void;
}

export default function CustomScroll({ children, className, onUpdate }: CustomScrollProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <ScrollBar className={classNames('CustomScroll', className)} onUpdate={onUpdate}>
        {children}
      </ScrollBar>

      <style jsx={true} global={true}>{`
        .CustomScroll > div {
          &:last-of-type {
            div {
              background-color: ${currentTheme.primary.hex} !important;
            }
          }
        }
      `}</style>
    </>
  );
}
