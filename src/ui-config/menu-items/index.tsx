import { Navigation } from '../../components/menu/navigation';
import messages from './messages';
import { isFeatureEnabled } from '../../helpers/config/markets-and-network-config';

export const moreMenuItems: Navigation[] = [
  {
    link: 'https://omnidex.finance/swap',
    title: messages.swap,
    absolute: true,
  },
  {
    link: 'https://omnidex.finance/farms',
    title: messages.farm,
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
