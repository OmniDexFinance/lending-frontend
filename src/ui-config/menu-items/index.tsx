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
    link: 'https://omnidex-1.gitbook.io/omnidex/',
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
