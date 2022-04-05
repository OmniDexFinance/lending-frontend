import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import BasicField from '../BasicField';

import messages from './messages';
import staticStyles from './style';

import search from './images/search.svg';
import searchWhite from './images/searchWhite.svg';

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchField({
  value,
  onChange,
  className,
  placeholder,
  ...props
}: SearchFieldProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [onFocus, setFocus] = useState(false);

  useEffect(() => {
    return () => {
      onChange('');
    };
  }, [onChange]);

  return (
    <>
      <span className="SearchFieldTitle">{intl.formatMessage(messages.search).toLowerCase()}</span>
      <div
        className={classNames('SearchField', className, {
          SearchFieldFocused: onFocus,
        })}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <BasicField
          value={value}
          onChange={onChange}
          placeholder={placeholder ? placeholder : intl.formatMessage(messages.placeholder)}
          type="search"
          {...props}
        />
        <img
          className="SearchField__image"
          src={isCurrentThemeDark ? searchWhite : search}
          alt="search"
          width={15}
          height={15}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .SearchField input::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: ${currentTheme.primary.hex};
          font-family: 'Kanit';
          font-weight: 600;
          font-size: 16px;
          opacity: 1; /* Firefox */
        }

        .SearchField input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: ${currentTheme.primary.hex};
          font-family: 'Kanit';
          font-size: 16px;
          font-weight: 600;
        }

        .SearchField input::-ms-input-placeholder {
          /* Microsoft Edge */
          color: ${currentTheme.primary.hex};
          font-family: 'Kanit';
          font-size: 16px;
          font-weight: 600;
        }
        .SearchFieldTitle {
          color: ${currentTheme.textDarkBlue.hex};
          font-variant: small-caps;
          font-weight: 200;
          margin-left: 5px;
        }
        .SearchField {
          input {
            color: ${currentTheme.textDarkBlue.hex};
          }
          font-size: 16px;
          border-radius: 20px;
          background: ${isCurrentThemeDark
            ? currentTheme.whiteItem.hex
            : currentTheme.lightGray.hex};
          border-color: transparent;
          &:hover {
            &:after {
              border-radius: 15px;
              border-color: transparent;
            }
          }
          &:after {
            border-radius: 15px;
            border-color: transparent;
          }
        }

        .SearchFieldFocused {
          &:after {
            border-color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </>
  );
}
