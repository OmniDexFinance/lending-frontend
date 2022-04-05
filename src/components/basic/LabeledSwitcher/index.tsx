import React from 'react';
import classNames from 'classnames';
import { gradient, useThemeContext, LabeledSwitch } from '@omnidex/omnidex-ui-kit';
import staticStyles from './style';

type LabeledSwitcherProps = {
  value: boolean;
  leftOption: string;
  rightOption: string;
  onToggle: (value: boolean) => void;
  className?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  disabled?: boolean;
  white?: boolean;
  darkOnDarkMode?: boolean;
};

export default function LabeledSwitcher({
  value,
  leftOption,
  rightOption,
  onToggle,
  className,
  width,
  height,
  fontSize,
  disabled,
  white,
  darkOnDarkMode,
}: LabeledSwitcherProps) {
  const { currentTheme, xl, lg, md, isCurrentThemeDark } = useThemeContext();

  let gradientText = gradient(
    90,
    `${(isCurrentThemeDark && currentTheme.whiteItem.rgb) || currentTheme.white.rgb}, 1`,
    0,
    `${(isCurrentThemeDark && currentTheme.whiteItem.rgb) || currentTheme.white.rgb}, 1`,
    100
  );

  const baseWidth = xl && !md ? 160 : 240;
  const baseHeight = xl && !md ? (lg ? 26 : 32) : 36;
  const baseFontSize = xl && !md ? (lg ? 10 : 11) : 14;

  return (
    <>
      <LabeledSwitch
        value={value}
        leftOption={leftOption}
        rightOption={rightOption}
        onToggle={onToggle}
        disabled={disabled}
        className={classNames({ LabeledSwitch__white: !isCurrentThemeDark }, className)}
        width={width || baseWidth}
        height={height || baseHeight}
        fontSize={fontSize || baseFontSize}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LabeledSwitch {
          padding: 5px;
          &__pointer {
            span {
              border-radius: 15px;
              background: ${currentTheme.primary.hex};
            }
          }

          &__inner {
            border: none;
            border-radius: 15px;
            background: ${isCurrentThemeDark
              ? currentTheme.whiteItem.hex
              : currentTheme.darkBlue.hex};
          }

          button {
            span {
              background: ${currentTheme.primary.hex};
            }
          }

          button.LabeledSwitch__buttonActive {
            span {
              background-image: ${gradientText};
            }
          }
        }

        .LabeledSwitch__white {
          .LabeledSwitch__inner {
            background: ${currentTheme.lightGray.hex};
          }

          button {
            span {
              background: ${currentTheme.textDarkBlue.hex};
            }
          }
        }

        .LabeledSwitchDisabled {
          .LabeledSwitch__inner {
            background: ${currentTheme.disabledGray.hex};
          }
        }
      `}</style>
    </>
  );
}
