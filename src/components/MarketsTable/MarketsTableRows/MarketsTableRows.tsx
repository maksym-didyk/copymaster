import React, { FC, useEffect, useState } from 'react';
import { MarketsTabsType, TakeProfitStopLossType } from '../../../types/enums';
import bigDecimal from 'js-big-decimal';
import { MarketsTableRow } from '../MarketsTableRow/MarketsTableRow';
import { MarketsTableRowFilled } from '../MarketsTableRowFilled/MarketsTableRowFilled';
import { takeAverage } from '../../../utils/helpers';
import { MarketsTableRowAdditional } from '../MarketsTableRowAdditional/MarketsTableRowAdditional';

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

  // console.log(data[0][dataFilledTakeProfitStopLossPrice]);

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
    sumFilledTakeProfitStopLossQuantity
    } = data.reduce((acc: any, item: any) => {
      const quantity = new bigDecimal(item[dataQuantity]);
      const filledCounterQuantity = new bigDecimal(item[dataFilledCounterQuantity]);
      const filledQuantityStable = new bigDecimal(item[dataFilledQuantityStable]);
      const takeProfitStopLossCounterQuantity = new bigDecimal(item[dataTakeProfitStopLossCounterQuantity]);
      const takeProfitStopLossQuantity = new bigDecimal(item[dataTakeProfitStopLossQuantity]);
      const takeFilledProfitStopLossCounterQuantity = new bigDecimal(item[dataFilledTakeProfitStopLossCounterQuantity]);
      const takeFilledProfitStopLossQuantity = new bigDecimal(item[dataFilledTakeProfitStopLossQuantity]);

      return {
        sumQuantity: acc.sumQuantity.add(quantity),
        sumFilledCounterQuantityStable: acc.sumFilledCounterQuantityStable.add(filledCounterQuantity),
        sumFilledQuantityStable: acc.sumFilledQuantityStable.add(filledQuantityStable),
        sumTakeProfitStopLossCounterQuantity: acc.sumTakeProfitStopLossCounterQuantity.add(takeProfitStopLossCounterQuantity),
        sumTakeProfitStopLossQuantity: acc.sumTakeProfitStopLossQuantity.add(takeProfitStopLossQuantity),
        sumFilledTakeProfitStopLossCounterQuantity: acc.sumFilledTakeProfitStopLossCounterQuantity.add(takeFilledProfitStopLossCounterQuantity),
        sumFilledTakeProfitStopLossQuantity: acc.sumFilledTakeProfitStopLossQuantity.add(takeFilledProfitStopLossQuantity),
      };
  }, {
    sumQuantity: new bigDecimal('0'),
    sumFilledCounterQuantityStable: new bigDecimal('0'),
    sumFilledQuantityStable: new bigDecimal('0'),
    sumTakeProfitStopLossCounterQuantity: new bigDecimal('0'),
    sumTakeProfitStopLossQuantity: new bigDecimal('0'),
    sumFilledTakeProfitStopLossCounterQuantity: new bigDecimal('0'),
    sumFilledTakeProfitStopLossQuantity: new bigDecimal('0'),
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
  const profitTakeProfitStopLossCounterQuantityCalculate = sumFilledTakeProfitStopLossQuantity.multiply(marketPriceDecimal).subtract(sumFilledTakeProfitStopLossCounterQuantity).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitTakeProfitStopLossCounterQuantity = profitTakeProfitStopLossCounterQuantityCalculate.getValue();
  const profitTakeProfitStopLossQuantity = marketPrice === 0 ? new bigDecimal('0') : profitTakeProfitStopLossCounterQuantityCalculate.divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN).getValue();
  const profitTakeProfitStopLossValue = counterEarning ? Number(profitTakeProfitStopLossQuantity) : Number(profitTakeProfitStopLossCounterQuantity);

  useEffect(() => {
    if (data[0].sellTakeProfitPrice > 0) {
      setIsTakeProfitStopLoss(TakeProfitStopLossType.takeprofit);
      setDataTakeProfitStopLossCounterQuantity(() => 'sellTakeProfitCounterQuantity');
      setDataTakeProfitStopLossQuantity(() => 'sellTakeProfitQuantity');
      setDataFilledTakeProfitStopLossCounterQuantity(() => 'sellFilledTakeProfitCounterQuantity');
      setDataFilledTakeProfitStopLossQuantity(() => 'sellFilledTakeProfitQuantity');
      // setDataFilledTakeProfitStopLossPrice(() => 'sellFilledTakeProfitPrice');
    } else if (data[0].sellStopLossPrice > 0) {
      setIsTakeProfitStopLoss(TakeProfitStopLossType.stoploss);
      setDataTakeProfitStopLossCounterQuantity(() => 'sellStopLossCounterQuantity');
      setDataTakeProfitStopLossQuantity(() => 'sellStopLossQuantity');
      setDataFilledTakeProfitStopLossCounterQuantity(() => 'sellFilledStopLossCounterQuantity');
      setDataFilledTakeProfitStopLossQuantity(() => 'sellFilledStopLossQuantity');
      // setDataFilledTakeProfitStopLossPrice(() => 'sellFilledStopLossPrice');
    }
  }, [counterEarning, data]);

  return (
    <div className='mt-4' style={{ borderLeft: '1px solid #545d88' } }>
      {/* (averageQuantity === 100 || averageQuantity === 0) ? '1px solid transparent' : */}
      {averageQuantity === 100
        ? <MarketsTableRow
            data={data}
            counterEarning={counterEarning}
            tabType={tabType}
            sumQuantity={sumQuantity.getValue()}
            isRed
          />
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
        <MarketsTableRowAdditional
          data={data}
          counterEarning={counterEarning}
          tabType={tabType}
          // sumFilledQuantity={resultSumFilledTakeProfitStopLossQuantity.getValue()}
          sumFilledQuantity={resultSumTakeProfitStopLossQuantity.getValue()}
          // averageQuantity={averageTakeProfitStopLossQuantity}
          profitValue={profitTakeProfitStopLossValue}
          marketPrice={marketPrice}
        />
      }

      {averageTakeProfitStopLossQuantity > 0
        ? <MarketsTableRowAdditional
            data={data}
            counterEarning={counterEarning}
            tabType={tabType}
            sumFilledQuantity={resultSumFilledTakeProfitStopLossQuantity.getValue()}
            averageQuantity={averageTakeProfitStopLossQuantity}
            profitValue={profitTakeProfitStopLossValue}
            marketPrice={marketPrice}
            // marketPrice={data[0][dataFilledTakeProfitStopLossPrice]}
            isFilled
          />
        : null
      // : <MarketsTableRowAdditional
      //     data={data}
      //     counterEarning={counterEarning}
      //     tabType={tabType}
      //     sumFilledQuantity={resultSumFilledTakeProfitStopLossQuantity.getValue()}
      //     averageQuantity={averageTakeProfitStopLossQuantity}
      //     profitValue={profitTakeProfitStopLossValue}
      //     marketPrice={marketPrice}
      //     isFilled
      //     isRed
      //   />
      }
    </div>
  );
};