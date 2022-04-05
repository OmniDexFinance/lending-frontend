import { MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  proto_telos = 'proto_telos',
  proto_telos_mainnet = 'proto_telos_mainnet',
}

export const marketsData: { [key in keyof typeof CustomMarket]: MarketDataType } = {
  [CustomMarket.proto_telos_mainnet]: {
    chainId: 40,
    logo: logos.telosLogo,
    activeLogo: logos.telosActiveLogo,
    aTokenPrefix: 'O',
    enabledFeatures: {
      faucet: false,
      governance: false,
      staking: false,
      incentives: false,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x64968B59Dd39128C287D76BE50015161d10C08C2'.toLowerCase(),
      LENDING_POOL: '0xA9Ae6E3207bdCCcB8f081EE0b4D0D2b4a79EA984',
      WETH_GATEWAY: '0x3b7A59172633A383fCbc729dDAD50f8aca63e427',
      FAUCET: '',
    },
  },
  [CustomMarket.proto_telos]: {
    chainId: 41,
    logo: logos.telosLogo,
    activeLogo: logos.telosActiveLogo,
    aTokenPrefix: 'O',
    enabledFeatures: {
      faucet: false,
      governance: false,
      staking: false,
      incentives: false,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x64968B59Dd39128C287D76BE50015161d10C08C2'.toLowerCase(),
      LENDING_POOL: '0xA9Ae6E3207bdCCcB8f081EE0b4D0D2b4a79EA984'.toLowerCase(),
      WETH_GATEWAY: '0x3b7A59172633A383fCbc729dDAD50f8aca63e427'.toLowerCase(),
      FAUCET: '',
    },
  },
} as const;
