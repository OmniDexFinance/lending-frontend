import React, { ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext, AnimationArrow } from '@omnidex/omnidex-ui-kit';

import messages from './messages';
import staticStyles from './style';

interface ContentWrapperWithTopLineProps {
  className?: string;
  title: string;
  topRightInfo?: ReactNode;
  children: ReactNode;
  withDropdown?: boolean;
  titleComponent?: ReactNode;
}

export default function ContentWrapperWithTopLine({
  className,
  title,
  topRightInfo,
  children,
  withDropdown,
  titleComponent,
}: ContentWrapperWithTopLineProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible && !sm) {
      setVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm]);

  return (
    <div
      className={classNames(
        'ContentWrapperWithTopLine',
        { ContentWrapperWithTopLine__withDropdown: withDropdown },
        className
      )}
    >
      <div
        className={classNames('ContentWrapperWithTopLine__top-line', {
          ContentWrapperWithTopLine__topLineActive: visible,
        })}
        onClick={() => withDropdown && setVisible(!visible)}
      >
        {(titleComponent && titleComponent) || <p>{title}</p>}
        {topRightInfo && (
          <div className="ContentWrapperWithTopLine__topRightInfo">{topRightInfo}</div>
        )}
        {withDropdown && (
          <div className="ContentWrapperWithTopLine__arrow-inner">
            <span>{intl.formatMessage(visible ? messages.collapse : messages.expand)}</span>
            <AnimationArrow
              active={visible}
              width={16}
              height={10}
              arrowTopPosition={5}
              arrowWidth={10}
              arrowHeight={2}
              color={currentTheme.white.hex}
            />
          </div>
        )}
      </div>

      <div
        className={classNames('ContentWrapperWithTopLine__content', {
          ContentWrapperWithTopLine__contentActive: visible,
        })}
      >
        {children}
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ContentWrapperWithTopLine {
          border: 1px solid ${currentTheme.border.hex};
          border-radius: 15px;
          &__top-line {
            color: ${currentTheme.textDarkBlue.hex};
            transition: 0.3s ease color;
            background: ${currentTheme.whiteElement.hex};
            border-bottom: 1px solid ${currentTheme.border.hex};
          }

          &__content {
            background: ${currentTheme.whiteElement.hex};
          }
        }
      `}</style>
    </div>
  );
}
