import React, { useEffect, useState } from 'react';
import { valueToBigNumber, GasType, normalize } from '@aave/protocol-js';

import { useStaticPoolDataContext } from '../../libs/pool-data-provider';
import { GasEstimations, Gas } from './EditorModal';
import Summary from './Summary';

import { EthTransactionData } from '../../helpers/send-ethereum-tx';
interface TxEstimationProps {
  txs: EthTransactionData[];
  setCustomGasPrice: React.Dispatch<React.SetStateAction<string | null>>;
  customGasPrice: string | null;
  step: number;
  editDisabled?: boolean;
}

export const gasPriceFormat = (value: string | null | undefined) => {
  if (!value) return '';
  return Math.round(Number(normalize(value, 9)));
};

export default function TxEstimation({
  txs,
  setCustomGasPrice,
  customGasPrice,
  step,
  editDisabled,
}: TxEstimationProps) {
  const { marketRefPriceInUsd, marketETHPriceInUsd } = useStaticPoolDataContext();

  const [visible, setVisible] = useState(false);

  const [gasTxs, setGasTx] = useState({} as GasEstimations);

  const [gasEstimations, setGasEstimations] = useState<GasType[]>([]);

  const calculateGas = async () => {
    let estimations = await Promise.all(
      txs.map((tx, i) => (tx.gas ? tx.gas(i === step - 1) : null))
    );
    if (estimations && estimations.length > 0) {
      if (step > 1) {
        // We don't want to change the older calculations
        estimations = estimations.map((tx, i) => (step - 1 > i ? gasEstimations[i] : tx));
      }

      const formattedGas: GasEstimations = estimations.reduce(
        (prev, next, i) => {
          if (next && next.gasLimit) {
            const gas: Gas = {
              gasLimit: next.gasLimit,
              txName: txs[i].name,
            };
            prev.gas.push(gas);
            prev.defaultGasPrice = next.gasPrice;
            prev.totalGas = valueToBigNumber(prev.totalGas).plus(next.gasLimit).toString();
          }
          return prev;
        },
        {
          gas: [],
          defaultGasPrice: '0',
          totalGas: '0',
        } as GasEstimations
      );
      setGasEstimations(estimations as GasType[]);
      setGasTx(formattedGas);
    }
  };

  useEffect(() => {
    calculateGas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <>
      <Summary
        visible={visible}
        setVisible={setVisible}
        totalGas={gasTxs.totalGas || '0'}
        customGasPrice={customGasPrice}
        defaultGasPrice={gasTxs.defaultGasPrice || '0'}
        marketRefPriceInUsd={marketETHPriceInUsd}
        editDisabled={true}
      />
    </>
  );
}
