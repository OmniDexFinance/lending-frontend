import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import messages from './messages';
import staticStyles from './style';

interface ContentWrapperProps {
  className?: string;
  withFullHeight?: boolean;
  withBackButton?: boolean;
  goBack?: () => void;
  children: ReactNode;
}

export default function ContentWrapper({
  className,
  children,
  withFullHeight,
  withBackButton,
  goBack,
}: ContentWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const history = useHistory();

  return (
    <div
      className={classNames(
        'ContentWrapper',
        { ContentWrapper__fullHeight: withFullHeight },
        className
      )}
    >
      {withBackButton && history.length > 2 && (
        <button className="ContentWrapper__back-button" onClick={goBack || history.goBack}>
          <span />
          <p>{intl.formatMessage(messages.back)}</p>
        </button>
      )}

      {children}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';
        .ContentWrapper {
          color: ${currentTheme.darkBlue.hex};
          border-color: ${currentTheme.border.hex};
          border-radius: 15px;
          background: ${currentTheme.whiteElement.hex};
          @include respond-to(sm) {
            border-color: transparent;
          }

          &__back-button {
            color: ${currentTheme.primary.hex};
            border: 1px solid ${currentTheme.primary.hex};
            border-radius: 15px;
            &:hover {
              background: ${currentTheme.primary.hex};
              color: ${currentTheme.white.hex};
              span {
                transform: translateX(-3px);
                border-color: ${currentTheme.white.hex};
                &:after {
                  border-style: solid;
                  border-color: ${currentTheme.white.hex};
                  border-width: 0 1px 1px 0;
                }
              }
            }
            span {
              border: 1px solid ${currentTheme.primary.hex};
              &:after {
                border-style: solid;
                border-color: ${currentTheme.primary.hex};
                border-width: 0 1px 1px 0;
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
