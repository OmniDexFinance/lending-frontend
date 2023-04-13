import { BaseNetworkConfig } from '../helpers/config/types';
import { ChainId } from '../helpers/contract-helpers';

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.mainnet]: {
    name: 'Telos EVM Mainnet',
    publicJsonRPCUrl: ['https://mainnet.telos.net/evm'],
    addresses: {
      walletBalanceProvider: '0xc08E9c9d6b97da936abaf40b925a448F0778e123',
      uiPoolDataProvider: '0xAf0E02F17aB4851A60f3f9851b8A663f7a07F398', // '0x2642880ED3EE014b8FFb5943C3efC26bE9AB3449', // '0x3c4a38019e6EE5158d3c009B22f566Ae1A5Eb4ed',
      uiIncentiveDataProvider: '0xdbAb1Ca8C13d8feB7567721D06C0BD394c20D0b4', // '0x0B06BA5C0293ce31B5192f9Db5b87cae0D66FcF9',
      chainlinkFeedRegistry: '',
    },
    protocolDataUrl: 'https://46.101.109.199:8000/subgraphs/name/omnidex-lending/protocol-v2',
    baseUniswapAdapter: '',
    baseAsset: 'TLOS',
    baseAssetWrappedAddress: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    // incentives hardcoded information
    rewardTokenSymbol: 'WTLOS',
    rewardTokenAddress: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    rewardTokenDecimals: 18,
    explorerLink: 'https://teloscan.io',
    rpcOnly: true,
    isTestnet: false,
  },
  [ChainId.testnet]: {
    name: 'Telos EVM Testnet',
    publicJsonRPCUrl: ['https://testnet.telos.net/evm'],
    addresses: {
      walletBalanceProvider: '0xc08E9c9d6b97da936abaf40b925a448F0778e123',
      uiPoolDataProvider: '0x2642880ED3EE014b8FFb5943C3efC26bE9AB3449', // '0x3c4a38019e6EE5158d3c009B22f566Ae1A5Eb4ed',
      uiIncentiveDataProvider: '0x0B06BA5C0293ce31B5192f9Db5b87cae0D66FcF9', // currently mainnet address
      chainlinkFeedRegistry: '',
    },
    protocolDataUrl: 'https://46.101.109.199:8000/subgraphs/name/omnidex-lending/protocol-v2',
    baseUniswapAdapter: '',
    baseAsset: 'TLOS',
    baseAssetWrappedAddress: '0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9',
    // incentives hardcoded information
    rewardTokenSymbol: 'CHARM',
    rewardTokenAddress: '0x730d2fa7dc7642e041bce231e85b39e9bf4a6a64',
    rewardTokenDecimals: 18,
    explorerLink: 'https://testnet.teloscan.io',
    rpcOnly: true,
    isTestnet: true,
  },
} as const;
