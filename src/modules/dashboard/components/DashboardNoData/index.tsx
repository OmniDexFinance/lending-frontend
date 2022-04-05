import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Caption from '../../../../components/basic/Caption';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';

export default function DashboardNoData() {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm } = useThemeContext();

  return (
    <ContentWrapper className="DashboardNoData" withFullHeight={true} withBackButton={true}>
      <Caption
        title={intl.formatMessage(messages.title)}
        description={intl.formatMessage(messages.description)}
      />
      <div className="DashboardNoData__bottom--inner">
        <Link to="/deposit" className="ButtonLink">
          <DefaultButton title={intl.formatMessage(messages.depositNow)} mobileBig={true} />
        </Link>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardNoData {
          &__markets {
            &:after {
              background: ${isCurrentThemeDark
                ? currentTheme.lightBlue.hex
                : sm
                ? currentTheme.disabledGray.hex
                : currentTheme.mainBg.hex};
            }
          }
          &__bottom--text {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </ContentWrapper>
  );
}
