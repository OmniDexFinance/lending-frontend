import { API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import { BaseNetworkConfig } from '../helpers/config/types';
import polygonBridgeLogo from './branding/images/polygonLogo.svg';
import avalancheBridgeLogo from './branding/images/avalancheLogo.svg';
import { ChainId } from '../helpers/contract-helpers';

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.mainnet]: {
    name: 'Telos EVM Mainnet',
    publicJsonRPCUrl: ['https://mainnet.telos.net/evm'],
    addresses: {
      walletBalanceProvider: '0x2bF48dfedE9D5203cd133b594E0274494d9a5565',
      uiPoolDataProvider: '0xd9Fd10945d69053Eadd365B786977B6290fea088',
      uiIncentiveDataProvider: '',
      chainlinkFeedRegistry: '',
    },
    protocolDataUrl: 'http://46.101.109.199:8000/subgraphs/name/omnidex-lending/protocol-v2',
    baseUniswapAdapter: '',
    baseAsset: 'TLOS',
    baseAssetWrappedAddress: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    // incentives hardcoded information
    rewardTokenSymbol: 'CHARM',
    rewardTokenAddress: '0x4960ddf893912CF154838C06f728555fB79FA194',
    rewardTokenDecimals: 18,
    explorerLink: 'https://teloscan.io',
    rpcOnly: true,
    isTestnet: false,
  },
  [ChainId.testnet]: {
    name: 'Telos EVM Testnet',
    publicJsonRPCUrl: ['https://testnet.telos.net/evm'],
    addresses: {
      walletBalanceProvider: '0xF09Ead50dB5498abACC3751E99c247D2d8C8FfEE',
      uiPoolDataProvider: '0xd9Fd10945d69053Eadd365B786977B6290fea088',
      uiIncentiveDataProvider: '',
      chainlinkFeedRegistry: '',
    },
    protocolDataUrl: 'http://46.101.109.199:8000/subgraphs/name/omnidex-lending/protocol-v2',
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
  [42]: {
    name: 'Telos EVM Testnet',
    publicJsonRPCUrl: ['https://testnet.telos.net/evm'],
    addresses: {
      walletBalanceProvider: '0xF09Ead50dB5498abACC3751E99c247D2d8C8FfEE',
      uiPoolDataProvider: '0xd9Fd10945d69053Eadd365B786977B6290fea088',
      uiIncentiveDataProvider: '',
      chainlinkFeedRegistry: '',
    },
    protocolDataUrl: 'http://46.101.109.199:8000/subgraphs/name/omnidex-lending/protocol-v2',
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
