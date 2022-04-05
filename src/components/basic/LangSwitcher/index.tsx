import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, DropdownWrapper } from '@omnidex/omnidex-ui-kit';

import { useLanguageContext } from '../../../libs/language-provider';
import CustomScroll from '../CustomScroll';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../../libs/language-provider/constants';
import { languages } from './languages';

import messages from './messages';
import staticStyles from './style';

import arrows from './images/arrows.svg';

interface LangSwitcherProps {
  inside?: boolean;
  className?: string;
}

export default function LangSwitcher({ inside, className }: LangSwitcherProps) {
  const intl = useIntl();
  const { currentLangSlug, changeLang } = useLanguageContext();
  const { currentTheme, sm, md } = useThemeContext();

  const [visible, setVisible] = useState(false);

  const setLanguage = (langCode: SupportedLanguage) => {
    changeLang(langCode);
    setVisible(false);
  };

  return (
    <DropdownWrapper
      visible={visible}
      setVisible={setVisible}
      className={classNames('LangSwitcher', className, { LangSwitcher__inside: inside })}
      verticalPosition="bottom"
      horizontalPosition="center"
      buttonComponent={
        <button
          className={classNames('LangSwitcher__button', { LangSwitcher__buttonActive: visible })}
          onClick={() => setVisible(!visible)}
          type="button"
        >
          <svg
            className="Menu__icon"
            viewBox="0 0 24 24"
            color="textSubtle"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z"></path>
          </svg>
        </button>
      }
    >
      <div className="LangSwitcher__content">
        <div className="LangSwitcher__languagesWrapper">
          <CustomScroll color={currentTheme.primary.hex}>
            <div className="LangSwitcher__languages">
              {SUPPORTED_LANGUAGES.map((lang, index) => (
                <button
                  className={classNames('LangSwitcher__language', {
                    LangSwitcher__languageActive: lang === currentLangSlug,
                  })}
                  key={index}
                  onClick={() => setLanguage(lang)}
                  disabled={lang === currentLangSlug}
                >
                  <p>{intl.formatMessage(languages[lang].name)}</p>
                </button>
              ))}
            </div>
          </CustomScroll>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .LangSwitcher {
          .DropdownWrapper__bottom {
            .Menu__icon {
              @include respond-to(sm) {
                fill: ${currentTheme.textDarkBlue.hex} !important;
              }
            }
          }
          &__button {
            border-color: transparent;
            background: transparent;
            &:hover {
              border-color: transparent;
              background: transparent;
            }
          }

          &__content {
            background: ${currentTheme.whiteElement.hex};
          }

          &__content-line {
            background: ${currentTheme.primary.hex};
            box-shadow: 0 2px 5px ${currentTheme.primary.hex};
          }

          &__language {
            &:hover {
              background: ${currentTheme.border.hex};
            }
            img {
              border: 1px solid ${currentTheme.border.hex};
            }
            p {
              margin: auto;
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
          &__languageActive {
            img {
              border-color: ${currentTheme.primary.hex};
            }
            p {
              text-align: center;
              color: ${currentTheme.primary.hex};
            }
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
