import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import { CompactNumber } from '../../../../components/basic/CompactNumber';

import messages from './messages';
import staticStyles from './style';

interface TotalMarketsSizeProps {
  value: number;
}

export default function TotalMarketsSize({ value }: TotalMarketsSizeProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div className="TotalMarketsSize">
      <p>
        {intl.formatMessage(messages.title)}
        <span className={'TotalMarketsSize__value'}>
          ${' '}
          {value < 100000000000 ? (
            intl.formatNumber(value, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          ) : (
            <CompactNumber value={value} maximumFractionDigits={2} minimumFractionDigits={2} />
          )}
        </span>
      </p>
      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TotalMarketsSize {
          border: 1px solid ${currentTheme.border.hex};
          color: ${isCurrentThemeDark ? currentTheme.white.hex : currentTheme.mainBg.hex};
          background: ${isCurrentThemeDark ? currentTheme.mainBg.hex : currentTheme.mainBg.hex};
          border: 1px solid ${currentTheme.border.hex};
        }
      `}</style>
    </div>
  );
}
