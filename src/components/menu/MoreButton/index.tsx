import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, DropdownWrapper, SocialIcons } from '@omnidex/omnidex-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import Link from '../../basic/Link';
import ConnectionModeSwitcher from '../ConnectionModeSwitcher';

import messages from './messages';
import staticStyles from './style';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { moreNavigation } from '../navigation';
import { socialIcons } from '../../../ui-config';

interface MoreButtonProps {
  isVisible?: boolean;
}

export default function MoreButton({ isVisible = false }: MoreButtonProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const [visible, setVisible] = useState(isVisible);

  const borderColor = rgba(`${currentTheme.primary.rgb}, 0.1`);
  const hoverColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);

  return <div></div>;
}
