import { MessageDescriptor } from 'react-intl';
import { moreMenuExtraItems, moreMenuItems, moreMenuMobileOnlyItems } from '../../../ui-config';
import { MarketDataType } from '../../../helpers/config/types';

import messages from './messages';

export interface Navigation {
  link: string;
  title: MessageDescriptor;
  hiddenWithoutWallet?: boolean;
  absolute?: boolean;
  onClick?: () => void;
  children?: Navigation[];
  isVisible?: (data: MarketDataType) => boolean | undefined;
}

const navigation: Navigation[] = [
  {
    link: 'https://app.omnidex.finance/#/trade',
    absolute: true,
    title: messages.trade,
    children: [
      {
        link: 'https://app.omnidex.finance/#/trade',
        absolute: true,
        title: messages.trade,
      },
      {
        link: 'https://app.omnidex.finance/#/dashboard',
        absolute: true,
        title: messages.dashboard,
      },
    ],
  },
  {
    link: 'https://app.omnidex.finance/#/trade',
    absolute: true,
    title: messages.swap,
    children: [
      {
        link: 'https://app.omnidex.finance/#/trade',
        absolute: true,
        title: messages.zeroslipswaps,
      },
      {
        link: 'https://classic.omnidex.finance/swap',
        absolute: true,
        title: messages.classicswaps,
      },
    ],
  },
  {
    link: '/markets',
    absolute: false,
    title: messages.lending,
    children: [
      {
        link: '/markets',
        absolute: false,
        title: messages.lendingmarkets,
      },
      {
        link: '/dashboard',
        absolute: false,
        title: messages.lendingdashboard,
      },
    ],
  },
  {
    link: 'https://app.omnidex.finance/#/earn',
    absolute: true,
    title: messages.earn,
    children: [
      {
        link: 'https://app.omnidex.finance/#/earn',
        absolute: true,
        title: messages.omnidexstaking,
      },
      {
        link: 'https://app.omnidex.finance/#/buy',
        absolute: true,
        title: messages.liquidityfarming,
      },
      {
        link: 'https://classic.omnidex.finance/tlospool',
        absolute: true,
        title: messages.tlosstaking,
      },
    ],
  },
  {
    link: 'https://classic.omnidex.finance/Portfolio/',
    absolute: true,
    title: messages.portfolio,
  },

  {
    link: 'https://omnidex-stats.vercel.app/',
    absolute: true,
    title: messages.stats,
  },
  {
    link: 'https://app.omnidex.finance/#/ecosystem',
    absolute: true,
    title: messages.more,
    children: [
      {
        link: 'https://app.omnidex.finance/#/ecosystem',
        absolute: true,
        title: messages.ecosystem,
      },
      {
        link: 'https://app.omnidex.finance/#/referrals',
        absolute: true,
        title: messages.referrals,
      },
      {
        link: 'https://omnidexbp.com/',
        absolute: true,
        title: messages.omnidexbp,
      },
      {
        link: 'https://docs.omnidex.finance/',
        absolute: true,
        title: messages.about,
      },
    ],
  },
];

export const moreNavigation: Navigation[] = [...moreMenuItems, ...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [...navigation, ...moreMenuMobileOnlyItems];

export default navigation;
