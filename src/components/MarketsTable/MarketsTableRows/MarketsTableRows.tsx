import React, { FC, useEffect, useState } from 'react';
import { MarketsTabsType, TakeProfitStopLossType } from '../../../types/enums';
import bigDecimal from 'js-big-decimal';
import { MarketsTableRow } from '../MarketsTableRow/MarketsTableRow';
import { MarketsTableRowFilled } from '../MarketsTableRowFilled/MarketsTableRowFilled';
import { takeAverage } from '../../../utils/helpers';
import { MarketsTableRowAdditional } from '../MarketsTableRowAdditional/MarketsTableRowAdditional';
import { MarketsTableRowThirdPosition } from '../MarketsTableRowThirdPosition/MarketsTableRowThirdPosition';

interface Props {
  data: any,
  counterEarning: boolean,
  tabType: MarketsTabsType,
  marketPrice: number
}

export const MarketsTableRows: FC<Props> = ({ data, counterEarning, tabType, marketPrice }) => {
  const [isTakeProfitStopLoss, setIsTakeProfitStopLoss] = useState<TakeProfitStopLossType>(TakeProfitStopLossType.none);
  const [dataTakeProfitStopLossCounterQuantity, setDataTakeProfitStopLossCounterQuantity] = useState('');
  const [dataTakeProfitStopLossQuantity, setDataTakeProfitStopLossQuantity] = useState('');
  const [dataFilledTakeProfitStopLossCounterQuantity, setDataFilledTakeProfitStopLossCounterQuantity] = useState('');
  const [dataFilledTakeProfitStopLossQuantity, setDataFilledTakeProfitStopLossQuantity] = useState('');
  // const [dataFilledTakeProfitStopLossPrice, setDataFilledTakeProfitStopLossPrice] = useState('');
  const [dataBuyFilledTakeProfitStopLossQuantity, setDataBuyFilledTakeProfitStopLossQuantity] = useState('');

  const dataQuantity = counterEarning ? 'buyQuantity' : 'buyCounterQuantity';
  const dataFilledCounterQuantity = 'buyFilledCounterQuantity';
  const dataFilledQuantityStable = 'buyFilledQuantity';

  const marketPriceDecimal = new bigDecimal(marketPrice);
  const isThirdState = isTakeProfitStopLoss !== TakeProfitStopLossType.none;

  const {
    sumQuantity,
    sumFilledCounterQuantityStable,
    sumFilledQuantityStable,
    sumTakeProfitStopLossCounterQuantity,
    sumTakeProfitStopLossQuantity,
    sumFilledTakeProfitStopLossCounterQuantity,
    sumFilledTakeProfitStopLossQuantity,
    sumBuyFilledTakeProfitStopLossCounterQuantity
    } = data.reduce((acc: any, item: any) => {
      const quantity = new bigDecimal(item[dataQuantity]);
      const filledCounterQuantity = new bigDecimal(item[dataFilledCounterQuantity]);
      const filledQuantityStable = new bigDecimal(item[dataFilledQuantityStable]);
      const takeProfitStopLossCounterQuantity = new bigDecimal(item[dataTakeProfitStopLossCounterQuantity]);
      const takeProfitStopLossQuantity = new bigDecimal(item[dataTakeProfitStopLossQuantity]);
      const takeFilledProfitStopLossCounterQuantity = new bigDecimal(item[dataFilledTakeProfitStopLossCounterQuantity]);
      const takeFilledProfitStopLossQuantity = new bigDecimal(item[dataFilledTakeProfitStopLossQuantity]);
      const buyFilledTakeProfitStopLossQuantity = new bigDecimal(item[dataBuyFilledTakeProfitStopLossQuantity]);

      return {
        sumQuantity: acc.sumQuantity.add(quantity),
        sumFilledCounterQuantityStable: acc.sumFilledCounterQuantityStable.add(filledCounterQuantity),
        sumFilledQuantityStable: acc.sumFilledQuantityStable.add(filledQuantityStable),
        sumTakeProfitStopLossCounterQuantity: acc.sumTakeProfitStopLossCounterQuantity.add(takeProfitStopLossCounterQuantity),
        sumTakeProfitStopLossQuantity: acc.sumTakeProfitStopLossQuantity.add(takeProfitStopLossQuantity),
        sumFilledTakeProfitStopLossCounterQuantity: acc.sumFilledTakeProfitStopLossCounterQuantity.add(takeFilledProfitStopLossCounterQuantity),
        sumFilledTakeProfitStopLossQuantity: acc.sumFilledTakeProfitStopLossQuantity.add(takeFilledProfitStopLossQuantity),
        sumBuyFilledTakeProfitStopLossCounterQuantity: acc.sumBuyFilledTakeProfitStopLossCounterQuantity.add(buyFilledTakeProfitStopLossQuantity),
      };
  }, {
    sumQuantity: new bigDecimal('0'),
    sumFilledCounterQuantityStable: new bigDecimal('0'),
    sumFilledQuantityStable: new bigDecimal('0'),
    sumTakeProfitStopLossCounterQuantity: new bigDecimal('0'),
    sumTakeProfitStopLossQuantity: new bigDecimal('0'),
    sumFilledTakeProfitStopLossCounterQuantity: new bigDecimal('0'),
    sumFilledTakeProfitStopLossQuantity: new bigDecimal('0'),
    sumBuyFilledTakeProfitStopLossCounterQuantity: new bigDecimal('0'),
    });

  const sumFilledQuantity = counterEarning ? sumFilledQuantityStable : sumFilledCounterQuantityStable;
  const averageQuantity = Number(sumQuantity.getValue()) === 0 ? 0: takeAverage(sumFilledQuantity, sumQuantity);
  const profitCounterQuantityCalculate = sumFilledQuantityStable.multiply(marketPriceDecimal).subtract(sumFilledCounterQuantityStable).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitCounterQuantity = profitCounterQuantityCalculate.getValue();
  const profitQuantity = marketPrice === 0 ? new bigDecimal('0') : profitCounterQuantityCalculate.divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN).getValue();
  const profitValue = counterEarning ? Number(profitQuantity) : Number(profitCounterQuantity);
  // const isThirdState = data[0].sellTakeProfitPrice > 0 || data[0].sellStopLossPrice > 0;

  const resultSumTakeProfitStopLossQuantity = counterEarning ? sumTakeProfitStopLossQuantity : sumTakeProfitStopLossCounterQuantity;
  const resultSumFilledTakeProfitStopLossQuantity = counterEarning ? sumFilledTakeProfitStopLossQuantity : sumFilledTakeProfitStopLossCounterQuantity;
  const averageTakeProfitStopLossQuantity = Number(resultSumFilledTakeProfitStopLossQuantity.getValue()) === 0 ? 0: takeAverage(resultSumFilledTakeProfitStopLossQuantity, resultSumTakeProfitStopLossQuantity);
  
  const profitTakeProfitStopLossCounterQuantityCalculate = sumTakeProfitStopLossQuantity.multiply(marketPriceDecimal).subtract(sumTakeProfitStopLossCounterQuantity).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitTakeProfitStopLossCounterQuantity = profitTakeProfitStopLossCounterQuantityCalculate.getValue();
  const profitTakeProfitStopLossQuantity = marketPrice === 0 ? new bigDecimal('0') : profitTakeProfitStopLossCounterQuantityCalculate.divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN).getValue();
  const profitTakeProfitStopLossValue = counterEarning ? Number(profitTakeProfitStopLossQuantity) : Number(profitTakeProfitStopLossCounterQuantity);

  // calculate 4-th position
  const resultSumFilledTakeProfitStopLossQuantityAdditional = counterEarning ? sumFilledTakeProfitStopLossQuantity : sumBuyFilledTakeProfitStopLossCounterQuantity;
  const averageTakeProfitStopLossQuantityAdditional = Number(resultSumFilledTakeProfitStopLossQuantityAdditional.getValue()) === 0 ? 0: takeAverage(resultSumFilledTakeProfitStopLossQuantityAdditional, resultSumTakeProfitStopLossQuantity);
  // const profitFilledTakeProfitStopLossCounterQuantityCalculate = sumFilledTakeProfitStopLossCounterQuantity.subtract(sumFilledTakeProfitStopLossQuantity.multiply(new bigDecimal(data[0].buyCreationPrice))).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitFilledTakeProfitStopLossCounterQuantityCalculate = sumFilledTakeProfitStopLossCounterQuantity.subtract(sumBuyFilledTakeProfitStopLossCounterQuantity).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitFilledTakeProfitStopLossCounterQuantity = profitFilledTakeProfitStopLossCounterQuantityCalculate.getValue();
  const profitFilledTakeProfitStopLossQuantity = marketPrice === 0 ? new bigDecimal('0') : profitFilledTakeProfitStopLossCounterQuantityCalculate.divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN).getValue();
  const profitFilledTakeProfitStopLossValue = counterEarning ? Number(profitFilledTakeProfitStopLossQuantity) : Number(profitFilledTakeProfitStopLossCounterQuantity);

  useEffect(() => {
    if (data[0].sellTakeProfitPrice > 0) {
      setIsTakeProfitStopLoss(TakeProfitStopLossType.takeprofit);
      setDataTakeProfitStopLossCounterQuantity(() => 'sellTakeProfitCounterQuantity');
      setDataTakeProfitStopLossQuantity(() => 'sellTakeProfitQuantity');
      setDataFilledTakeProfitStopLossCounterQuantity(() => 'sellFilledTakeProfitCounterQuantity');
      setDataFilledTakeProfitStopLossQuantity(() => 'sellFilledTakeProfitQuantity');
      // setDataFilledTakeProfitStopLossPrice(() => 'sellFilledTakeProfitPrice');
      setDataBuyFilledTakeProfitStopLossQuantity(() => 'sellBuyFilledTakeProfitCounterQuantity');
    } else if (data[0].sellStopLossPrice > 0) {
      setIsTakeProfitStopLoss(TakeProfitStopLossType.stoploss);
      setDataTakeProfitStopLossCounterQuantity(() => 'sellStopLossCounterQuantity');
      setDataTakeProfitStopLossQuantity(() => 'sellStopLossQuantity');
      setDataFilledTakeProfitStopLossCounterQuantity(() => 'sellFilledStopLossCounterQuantity');
      setDataFilledTakeProfitStopLossQuantity(() => 'sellFilledStopLossQuantity');
      // setDataFilledTakeProfitStopLossPrice(() => 'sellFilledStopLossPrice');
      setDataBuyFilledTakeProfitStopLossQuantity(() => 'sellBuyFilledStopLossCounterQuantity');
    }
  }, [counterEarning, data]);

  return (
    <div className='mt-4' style={{ borderLeft: '1px solid #545d88' } }> {data[0].blockId}
      {/* (averageQuantity === 100 || averageQuantity === 0) ? '1px solid transparent' : */}
      {averageQuantity === 100
        ? null
        : <MarketsTableRow
            data={data}
            counterEarning={counterEarning}
            tabType={tabType}
            sumQuantity={sumQuantity.getValue()}
          />
      }

      {averageQuantity === 0
        ? null
        : <MarketsTableRowFilled
            data={data}
            counterEarning={counterEarning}
            tabType={tabType}
            sumFilledQuantity={sumFilledQuantity.getValue()}
            averageQuantity={averageQuantity}
            profitValue={profitValue}
            marketPrice={marketPrice}
          />
      }

      {isThirdState &&
        <MarketsTableRowThirdPosition
          data={data}
          counterEarning={counterEarning}
          tabType={tabType}
          sumQuantity={resultSumTakeProfitStopLossQuantity.getValue()}
          profitValue={profitTakeProfitStopLossValue}
          marketPrice={marketPrice}
        />
      }

      {averageTakeProfitStopLossQuantity > 0
        ? <MarketsTableRowAdditional
            data={data}
            counterEarning={counterEarning}
            tabType={tabType}
            sumFilledQuantity={resultSumFilledTakeProfitStopLossQuantityAdditional.getValue()}
            averageQuantity={averageTakeProfitStopLossQuantityAdditional}
            profitValue={profitFilledTakeProfitStopLossValue}
            isFilled
          />
        : null
      }
    </div>
  );
};