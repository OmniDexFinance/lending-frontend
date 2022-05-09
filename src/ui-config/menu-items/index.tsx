import { Navigation } from '../../components/menu/navigation';
import messages from './messages';
import { isFeatureEnabled } from '../../helpers/config/markets-and-network-config';

export const moreMenuItems: Navigation[] = [
  {
    link: 'https://analytics.omnidex.finance',
    title: messages.analytics,
    absolute: true,
  },
  {
    link: 'https://docs.omnidex.finance/',
    title: messages.doc,
    absolute: true,
  },
  {
    link: '/faucet',
    title: messages.faucet,
    isVisible: isFeatureEnabled.faucet,
  },
];

export const moreMenuExtraItems: Navigation[] = [];

export const moreMenuMobileOnlyItems: Navigation[] = [];
