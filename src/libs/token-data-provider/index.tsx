import { providers } from 'ethers';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { NetworkConfig } from '../../helpers/config/types';
import { getNetworkConfig, getProvider } from '../../helpers/config/markets-and-network-config';

const LS_KEY = 'selectedMarket';

export interface TokenContextData {
  // currently selected one
  chainId: number;
  networkConfig: NetworkConfig;
  jsonRpcProvider: providers.Provider;
}

const TokenDataContext = React.createContext({} as TokenContextData);

export function TokenDataProvider({ children }: PropsWithChildren<{}>) {}

export const useTokenDataContext = () => useContext(TokenDataContext);
