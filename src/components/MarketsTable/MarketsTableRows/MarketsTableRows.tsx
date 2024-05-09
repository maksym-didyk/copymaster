import React, { FC, useContext, useEffect, useState } from 'react';
import { MarketsTabsType } from '../../../types/enums';
import bigDecimal from 'js-big-decimal';
import { MarketsTableRowFirstPosition } from '../MarketsTableRowFirstPosition/MarketsTableRowFirstPosition';
import { MarketsTableRowSecondPosition } from '../MarketsTableRowSecondPosition/MarketsTableRowSecondPosition';
import { takeAverage } from '../../../utils/helpers';
import { MarketsTableRowFourthPosition } from '../MarketsTableRowFourthPosition/MarketsTableRowFourthPosition';
import { MarketsTableRowThirdPosition } from '../MarketsTableRowThirdPosition/MarketsTableRowThirdPosition';
import MarketPriceProvider from '../../../context/MarketPriceProvider';

interface Props {
  data: any,
  counterEarning: boolean,
  tabType: MarketsTabsType,
}

export const MarketsTableRows: FC<Props> = ({ data, counterEarning, tabType }) => {
  const [dataTakeProfitStopLossCounterQuantity, setDataTakeProfitStopLossCounterQuantity] = useState('');
  const [dataTakeProfitStopLossQuantity, setDataTakeProfitStopLossQuantity] = useState('');
  const [dataFilledTakeProfitStopLossCounterQuantity, setDataFilledTakeProfitStopLossCounterQuantity] = useState('');
  const [dataFilledTakeProfitStopLossQuantity, setDataFilledTakeProfitStopLossQuantity] = useState('');
  const [dataBuyFilledTakeProfitStopLossCounterQuantity, setDataBuyFilledTakeProfitStopLossCounterQuantity] = useState('');
  const [dataBuyTakeProfitStopLossCounterQuantity, setDataBuyTakeProfitStopLossCounterQuantity] = useState('');
  const [marketPrice, setMarketPrice] = useState(0);

  const { marketPriceContext } = useContext(MarketPriceProvider);
  // const marketPriceContext = 0.6173; // for testing
  const marketPriceDecimal = new bigDecimal(marketPrice);

  const dataQuantityStable = 'buyQuantity';
  const dataCounterQuantity = 'buyCounterQuantity';
  const dataFilledCounterQuantity = 'buyFilledCounterQuantity';
  const dataFilledQuantityStable = 'buyFilledQuantity';
  const bigDecimalZero = new bigDecimal('0');

  const {
    sumQuantityStable,
    sumCounterQuantity,
    sumFilledCounterQuantityStable,
    sumFilledQuantityStable,
    sumTakeProfitStopLossCounterQuantity,
    sumTakeProfitStopLossQuantity,
    sumFilledTakeProfitStopLossCounterQuantity,
    sumFilledTakeProfitStopLossQuantity,
    sumBuyFilledTakeProfitStopLossCounterQuantity,
    sumBuyTakeProfitStopLossCounterQuantity
    } = data.reduce((acc: any, item: any) => {
      const quantityStable = new bigDecimal(item[dataQuantityStable]);
      const counterQuantity = new bigDecimal(item[dataCounterQuantity]);
      const filledCounterQuantity = new bigDecimal(item[dataFilledCounterQuantity]);
      const filledQuantityStable = new bigDecimal(item[dataFilledQuantityStable]);
      const takeProfitStopLossCounterQuantity = new bigDecimal(item[dataTakeProfitStopLossCounterQuantity]);
      const takeProfitStopLossQuantity = new bigDecimal(item[dataTakeProfitStopLossQuantity]);
      const takeFilledProfitStopLossCounterQuantity = new bigDecimal(item[dataFilledTakeProfitStopLossCounterQuantity]);
      const takeFilledProfitStopLossQuantity = new bigDecimal(item[dataFilledTakeProfitStopLossQuantity]);
      const buyFilledTakeProfitStopLossCounterQuantity = new bigDecimal(item[dataBuyFilledTakeProfitStopLossCounterQuantity]);
      const buyTakeProfitStopLossCounterQuantity = new bigDecimal(item[dataBuyTakeProfitStopLossCounterQuantity]);

      return {
        sumQuantityStable: acc.sumQuantityStable.add(quantityStable),
        sumCounterQuantity: acc.sumCounterQuantity.add(counterQuantity),
        sumFilledCounterQuantityStable: acc.sumFilledCounterQuantityStable.add(filledCounterQuantity),
        sumFilledQuantityStable: acc.sumFilledQuantityStable.add(filledQuantityStable),
        sumTakeProfitStopLossCounterQuantity: acc.sumTakeProfitStopLossCounterQuantity.add(takeProfitStopLossCounterQuantity),
        sumTakeProfitStopLossQuantity: acc.sumTakeProfitStopLossQuantity.add(takeProfitStopLossQuantity),
        sumFilledTakeProfitStopLossCounterQuantity: acc.sumFilledTakeProfitStopLossCounterQuantity.add(takeFilledProfitStopLossCounterQuantity),
        sumFilledTakeProfitStopLossQuantity: acc.sumFilledTakeProfitStopLossQuantity.add(takeFilledProfitStopLossQuantity),
        sumBuyFilledTakeProfitStopLossCounterQuantity: acc.sumBuyFilledTakeProfitStopLossCounterQuantity.add(buyFilledTakeProfitStopLossCounterQuantity),
        sumBuyTakeProfitStopLossCounterQuantity: acc.sumBuyTakeProfitStopLossCounterQuantity.add(buyTakeProfitStopLossCounterQuantity),
      };
  }, {
    sumQuantityStable: bigDecimalZero,
    sumCounterQuantity: bigDecimalZero,
    sumFilledCounterQuantityStable: bigDecimalZero,
    sumFilledQuantityStable: bigDecimalZero,
    sumTakeProfitStopLossCounterQuantity: bigDecimalZero,
    sumTakeProfitStopLossQuantity: bigDecimalZero,
    sumFilledTakeProfitStopLossCounterQuantity: bigDecimalZero,
    sumFilledTakeProfitStopLossQuantity: bigDecimalZero,
    sumBuyFilledTakeProfitStopLossCounterQuantity: bigDecimalZero,
    sumBuyTakeProfitStopLossCounterQuantity: bigDecimalZero,
    });

  const showFirstPosition = sumFilledQuantityStable.compareTo(sumQuantityStable) !== 0;
  const showSecondPosition = sumTakeProfitStopLossQuantity.compareTo(sumFilledQuantityStable) !== 0;
  const showThirdPosition = counterEarning
    ? sumFilledTakeProfitStopLossQuantity.compareTo(sumTakeProfitStopLossQuantity) !== 0
    : sumFilledCounterQuantityStable.compareTo(sumTakeProfitStopLossCounterQuantity) !== 0 && sumTakeProfitStopLossCounterQuantity.compareTo(bigDecimalZero) !== 0;
  const showFourthPosition = sumFilledTakeProfitStopLossQuantity.compareTo(bigDecimalZero) !== 0;
  const showCssLine = [showFirstPosition, showSecondPosition, showThirdPosition, showFourthPosition].filter(Boolean).length > 1;

  const sumQuantity = counterEarning ? sumCounterQuantity : sumQuantityStable;
  const sumFilledQuantity = counterEarning ? sumFilledCounterQuantityStable : sumFilledQuantityStable;
  const averageQuantity = Number(sumQuantity.getValue()) === 0 ? 0: takeAverage(sumFilledQuantity, sumQuantity);
  const profitCounterQuantityCalculate = sumFilledQuantityStable.multiply(marketPriceDecimal).subtract(sumFilledCounterQuantityStable).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitCounterQuantity = profitCounterQuantityCalculate.getValue();
  const profitQuantity = marketPrice === 0 ? bigDecimalZero : profitCounterQuantityCalculate.divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN).getValue();
  const profitValue = counterEarning ? Number(profitCounterQuantity) : Number(profitQuantity);

 // calculate 3-rd position
  const resultSumTakeProfitStopLossQuantity = counterEarning ? sumBuyTakeProfitStopLossCounterQuantity : sumFilledQuantityStable; // sumTakeProfitStopLossQuantity
  const profitTakeProfitStopLossCounterQuantity = sumTakeProfitStopLossQuantity.multiply(marketPriceDecimal).subtract(sumBuyTakeProfitStopLossCounterQuantity).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitTakeProfitStopLossQuantity = marketPrice === 0 ? bigDecimalZero : (sumFilledQuantityStable.multiply(marketPriceDecimal).subtract(sumFilledQuantityStable.multiply(new bigDecimal( data[0].buyFilledPrice)))).divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN);
  const profitTakeProfitStopLossValue = counterEarning ? profitTakeProfitStopLossCounterQuantity : profitTakeProfitStopLossQuantity;
  const profitTakeProfitStopLossPercent = Number(resultSumTakeProfitStopLossQuantity.getValue()) === 0 ? resultSumTakeProfitStopLossQuantity : profitTakeProfitStopLossValue.divide(resultSumTakeProfitStopLossQuantity).multiply(new bigDecimal('100')).round(2, bigDecimal.RoundingModes.FLOOR);

  // calculate 4-th position
  const resultSumFilledTakeProfitStopLossQuantityAdditional = counterEarning ? sumBuyFilledTakeProfitStopLossCounterQuantity : sumFilledTakeProfitStopLossQuantity;
  const averageTakeProfitStopLossQuantityAdditional = Number(resultSumFilledTakeProfitStopLossQuantityAdditional.getValue()) === 0 ? 0: takeAverage(resultSumFilledTakeProfitStopLossQuantityAdditional, resultSumTakeProfitStopLossQuantity);
  const profitFilledTakeProfitStopLossCounterQuantityCalculate = sumFilledTakeProfitStopLossCounterQuantity.subtract(sumBuyFilledTakeProfitStopLossCounterQuantity).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitFilledTakeProfitStopLossCounterQuantity = profitFilledTakeProfitStopLossCounterQuantityCalculate.getValue();
  const profitFilledTakeProfitStopLossQuantity = marketPrice === 0 ? bigDecimalZero : profitFilledTakeProfitStopLossCounterQuantityCalculate.divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN).getValue();
  const profitFilledTakeProfitStopLossValue = counterEarning ? Number(profitFilledTakeProfitStopLossCounterQuantity) : Number(profitFilledTakeProfitStopLossQuantity);

  useEffect(() => {
    if (data[0].sellTakeProfitPrice > 0) {
      setDataTakeProfitStopLossCounterQuantity(() => 'sellTakeProfitCounterQuantity');
      setDataTakeProfitStopLossQuantity(() => 'sellTakeProfitQuantity');
      setDataFilledTakeProfitStopLossCounterQuantity(() => 'sellFilledTakeProfitCounterQuantity');
      setDataFilledTakeProfitStopLossQuantity(() => 'sellFilledTakeProfitQuantity');
      setDataBuyFilledTakeProfitStopLossCounterQuantity(() => 'sellBuyFilledTakeProfitCounterQuantity');
      setDataBuyTakeProfitStopLossCounterQuantity(() => 'sellBuyTakeProfitCounterQuantity');
    } else if (data[0].sellStopLossPrice > 0) {
      setDataTakeProfitStopLossCounterQuantity(() => 'sellStopLossCounterQuantity');
      setDataTakeProfitStopLossQuantity(() => 'sellStopLossQuantity');
      setDataFilledTakeProfitStopLossCounterQuantity(() => 'sellFilledStopLossCounterQuantity');
      setDataFilledTakeProfitStopLossQuantity(() => 'sellFilledStopLossQuantity');
      setDataBuyFilledTakeProfitStopLossCounterQuantity(() => 'sellBuyFilledStopLossCounterQuantity');
      setDataBuyTakeProfitStopLossCounterQuantity(() => 'sellBuyStopLossCounterQuantity');
    }
  }, [counterEarning, data]);

  useEffect(() => {
    setMarketPrice(() => marketPriceContext);
  }, [marketPriceContext]);

  return (
    <div className='mt-4' style={{ borderLeft: showCssLine ? '1px solid #545d88' : '1px solid transparent' }}> {data[0].blockId}

    {showFirstPosition &&
      <MarketsTableRowFirstPosition
        data={data}
        counterEarning={counterEarning}
        tabType={tabType}
        value={sumCounterQuantity.getValue()}
      />
      }

      {showSecondPosition &&
        <MarketsTableRowSecondPosition
          data={data}
          counterEarning={counterEarning}
          tabType={tabType}
          sumFilledQuantity={sumFilledQuantity.getValue()}
          averageQuantity={averageQuantity}
          profitValue={profitValue}
          marketPrice={marketPrice}
          value={sumFilledCounterQuantityStable.getValue()}
        />
      }

      {showThirdPosition &&
        <MarketsTableRowThirdPosition
          data={data}
          counterEarning={counterEarning}
          tabType={tabType}
          profitValue={profitTakeProfitStopLossValue.getValue()}
          profitPercent={profitTakeProfitStopLossPercent.getValue()}
          value={sumBuyTakeProfitStopLossCounterQuantity.getValue()}
        />
      }

      {showFourthPosition &&
        <MarketsTableRowFourthPosition
            data={data}
            counterEarning={counterEarning}
            tabType={tabType}
            sumFilledQuantity={resultSumFilledTakeProfitStopLossQuantityAdditional.getValue()}
            averageQuantity={averageTakeProfitStopLossQuantityAdditional}
            profitValue={profitFilledTakeProfitStopLossValue}
            value={sumBuyFilledTakeProfitStopLossCounterQuantity.getValue()}
            isFilled
          />
      }
    </div>
  );
};