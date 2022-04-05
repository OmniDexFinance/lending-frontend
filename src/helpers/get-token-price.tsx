import { useEffect, useState } from 'react';

interface TokenPriceParams {
  symbol: string;
}
interface TokenPrice {
  market_data: any;
}

export function getTokenPrice({ symbol }: TokenPriceParams): TokenPrice {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    async function fetchPrice() {
      let response = await fetch(
        'https://api.coingecko.com/api/v3/coins/omnidex?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
      );
      let body = await response.json();
      setData(body);
    }
    fetchPrice();
  }, []);
  return data;
}
