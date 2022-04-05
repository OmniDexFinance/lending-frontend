import React from 'react';
import { IntlShape } from 'react-intl/src/types';
import { SocialIcon, SocialType } from '@omnidex/omnidex-ui-kit';

import FormattedTxErrorTextUI from './FormattedTxErrorText';
import TopDisclaimerUI from './TopDisclaimer';
import LegalBanner from './LegalBanner';
import {
  DashboardLeftTopLine as DashboardLeftTopLineUI,
  DashboardLeftTopLineProps,
} from './DashboardLeftTopLine';
import { UnlockWalletExtraText as UnlockWalletExtraTextUI } from './UnlockWalletExtraText';

import logo from './images/omnidexLogo.jpg';
import logoDark from './images/omnidexLogoDark.jpg';
import logoSmall from './images/omnidexLogoSmall.png';

export const LOGO = logo;
export const LOGO_DARK = logoDark;
export const LOGO_SMALL = logoSmall;

export const socialIcons: SocialIcon[] = [
  {
    url: 'https://github.com/OmniDexFinance',
    type: SocialType.Github,
  },
  {
    url: 'https://discord.gg/sNe6e8CENV',
    type: SocialType.Discord,
  },
  {
    url: 'https://t.me/Omnidex1',
    type: SocialType.Telegram,
  },
];

export const TopDisclaimer: React.FC = TopDisclaimerUI;
export const BottomDisclaimer: React.FC = LegalBanner;
export const FormattedTxErrorText: React.FC = FormattedTxErrorTextUI;

export const DashboardLeftTopLine: React.FC<DashboardLeftTopLineProps> = DashboardLeftTopLineUI;

export const UnlockWalletExtraText: React.FC<{ intl: IntlShape }> = UnlockWalletExtraTextUI;
