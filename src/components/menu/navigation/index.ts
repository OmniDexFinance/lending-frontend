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
    link: 'https://omnidex.finance/swap',
    absolute: true,
    title: messages.trade,
  },
  {
    link: 'https://omnidex.finance/karmapool/',
    absolute: true,
    title: messages.earn,
  },
  {
    link: '/markets',
    title: messages.lending,
  },

  {
    link: '/dashboard',
    title: messages.dashboard,
  },
  {
    link: 'https://omnidex.finance/Portfolio/',
    absolute: true,
    title: messages.portfolio,
  },
];

export const moreNavigation: Navigation[] = [...moreMenuItems, ...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [...navigation, ...moreMenuMobileOnlyItems];

export default navigation;
