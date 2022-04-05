import { MessageDescriptor } from 'react-intl';
import {
  moreMenuExtraItems,
  moreMenuItems,
  moreMenuMobileOnlyItems,
  stakeConfig,
  governanceConfig,
} from '../../../ui-config';
import { MarketDataType } from '../../../helpers/config/types';
import { isFeatureEnabled } from '../../../helpers/config/markets-and-network-config';

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
    link: 'https://omnidex.finance/',
    absolute: true,
    title: messages.navigation,
  },
  {
    link: 'https://omnidex-1.gitbook.io/omnidex/',
    absolute: true,
    title: messages.doc,
  },
  {
    link: 'https://www.analytics.omnidex.finance/home',
    absolute: true,
    title: messages.analytics,
  },
  {
    link: 'https://omnidex.finance/swap',
    absolute: true,
    title: messages.trade,
    children: [
      {
        link: 'https://omnidex.finance/swap',
        absolute: true,
        title: messages.swap,
      },
      {
        link: 'https://omnidex.finance/liquidity',
        absolute: true,
        title: messages.addLiquidity,
      },
    ],
  },
  {
    link: 'https://omnidex.finance/farms',
    absolute: true,
    title: messages.earn,
    children: [
      {
        link: 'https://omnidex.finance/farms',
        absolute: true,
        title: messages.farms,
      },
      {
        link: 'https://omnidex.finance/pools',
        absolute: true,
        title: messages.staking,
      },
      {
        link: 'https://omnidex.finance/karmapool/',
        absolute: true,
        title: messages.karma,
      },
    ],
  },
  {
    link: '/markets',
    title: messages.lending,
    children: [
      {
        link: '/markets',
        title: messages.markets,
      },
      {
        link: '/dashboard',
        title: messages.dashboard,
      },
      {
        link: 'deposit',
        title: messages.deposit,
      },
      {
        link: 'borrow',
        title: messages.borrow,
      },
    ],
  },
];

export const moreNavigation: Navigation[] = [...moreMenuItems, ...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [...navigation, ...moreMenuMobileOnlyItems];

export default navigation;
