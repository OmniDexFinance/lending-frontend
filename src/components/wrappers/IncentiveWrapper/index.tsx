import React from 'react';
import { useIntl } from 'react-intl';
import { normalize } from '@aave/math-utils';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import { ComputedReserveData, useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import { useIncentivesDataContext } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import IncentiveClaimItem from '../../IncentiveClaimItem';

import messages from './messages';
import staticStyles from './style';

// Fetch reward token symbol from hard coded non-reserve tokens or from reserves array
export function getRewardTokenSymbol(
  reserves: ComputedReserveData[],
  rewardTokenAddress: string
): string {
  if (rewardTokenAddress.toLowerCase() === '0x4da27a545c0c5b758a6ba100e3a049001de870f5') {
    return 'stkAAVE';
  } else if (rewardTokenAddress.toLowerCase() === '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b') {
    return 'TRIBE';
  } else if (rewardTokenAddress.toLowerCase() === '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7') {
    return 'WAVAX';
  } else if (rewardTokenAddress.toLowerCase() === '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E') {
    return 'WTLOS';
  } else {
    let rewardReserve = reserves.find(
      (reserve) => reserve.underlyingAsset.toLowerCase() === rewardTokenAddress.toLowerCase()
    );
    if (rewardReserve) {
      return rewardReserve.symbol;
    } else {
      return '';
    }
  }
}

export default function IncentiveWrapper() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const { user, reserves } = useDynamicPoolDataContext();
  const { userIncentives } = useIncentivesDataContext();

  // Only display assets for which user has claimable rewards
  const userIncentivesFiltered = Object.fromEntries(
    Object.entries(userIncentives).filter((entry) => Number(entry[1].claimableRewards) > 0)
  );

  if (!user || Object.keys(userIncentivesFiltered).length === 0) return null;

  return (
    <div className="IncentiveWrapper">
      <p className="IncentiveWrapper__title">{intl.formatMessage(messages.availableReward)}</p>
      <div className="IncentiveWrapper__incentives">
        {Object.entries(userIncentivesFiltered).map((incentive) => {
          const rewardTokenSymbol = getRewardTokenSymbol(reserves, incentive[1].rewardTokenAddress);
          const claimableRewards = normalize(
            incentive[1].claimableRewards,
            incentive[1].rewardTokenDecimals
          );
          return (
            <IncentiveClaimItem
              key={incentive[0]}
              symbol={rewardTokenSymbol}
              claimableRewards={claimableRewards}
              incentiveControllerAddress={incentive[0]}
            />
          );
        })}
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .IncentiveWrapper__title {
          color: ${sm ? currentTheme.textDarkBlue.hex : currentTheme.white.hex};
        }
      `}</style>
    </div>
  );
}
