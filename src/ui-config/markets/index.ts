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
      LENDING_POOL_ADDRESS_PROVIDER: '0x87F27B0DEE1Fd97A60dD5e5436c8068b805770E4'.toLowerCase(),
      LENDING_POOL: '0x6eC35d6B345DF1FAdBD3E3B2A8C4c4CAe84A5E26',
      WETH_GATEWAY: '0x68413e6bb7B9cb0ab9cc3C62946eF44f0A4A198D',
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
      LENDING_POOL_ADDRESS_PROVIDER: '0x87F27B0DEE1Fd97A60dD5e5436c8068b805770E4'.toLowerCase(),
      LENDING_POOL: '0x6eC35d6B345DF1FAdBD3E3B2A8C4c4CAe84A5E26'.toLowerCase(),
      WETH_GATEWAY: '0x68413e6bb7B9cb0ab9cc3C62946eF44f0A4A198D'.toLowerCase(),
      FAUCET: '',
    },
  },
} as const;
