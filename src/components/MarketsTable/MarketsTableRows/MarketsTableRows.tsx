import React, { FC } from 'react';
import { MarketsTabsType } from '../../../types/enums';
import bigDecimal from 'js-big-decimal';
import { MarketsTableRow } from '../MarketsTableRow/MarketsTableRow';
import { MarketsTableRowFilled } from '../MarketsTableRowFilled/MarketsTableRowFilled';
import { takeAverage } from '../../../utils/helpers';
import { MarketsTableRowFilledAdditional } from '../MarketsTableRowFilledAdditional/MarketsTableRowFilledAdditional';

interface Props {
  data: any,
  counterEarning: boolean,
  tabType: MarketsTabsType,
  marketPrice: number
}

export const MarketsTableRows: FC<Props> = ({ data, counterEarning, tabType, marketPrice }) => {
  const dataQuantity = counterEarning ? 'buyQuantity' : 'buyCounterQuantity';
  const marketPriceDecimal = new bigDecimal(marketPrice);

  const { 
    sumQuantity,
    sumFilledCounterQuantity,
    sumFilledQuantityStable
    } = data.reduce((acc: any, item: any) => {
      const quantity = new bigDecimal(item[dataQuantity]);
      const filledCounterQuantity = new bigDecimal(item['buyFilledCounterQuantity']);
      const filledQuantityStable = new bigDecimal(item['buyFilledQuantity']);

      return {
        sumQuantity: acc.sumQuantity.add(quantity),
        sumFilledCounterQuantity: acc.sumFilledCounterQuantity.add(filledCounterQuantity),
        sumFilledQuantityStable: acc.sumFilledQuantityStable.add(filledQuantityStable)
      };
  }, {
    sumQuantity: new bigDecimal('0'),
    sumFilledCounterQuantity: new bigDecimal('0'),
    sumFilledQuantityStable: new bigDecimal('0')
    });

  const sumFilledQuantity = counterEarning ? sumFilledQuantityStable : sumFilledCounterQuantity;
  const averageQuantity = takeAverage(sumFilledQuantity, sumQuantity);

  const profitCounterQuantityCalculate = sumFilledQuantityStable.multiply(marketPriceDecimal).subtract(sumFilledCounterQuantity).round(data[0].counterRound, bigDecimal.RoundingModes.FLOOR);
  const profitCounterQuantity = profitCounterQuantityCalculate.getValue();
  const profitQuantity = marketPrice === 0 ? new bigDecimal('0') : profitCounterQuantityCalculate.divide(marketPriceDecimal).round(data[0].baseRound, bigDecimal.RoundingModes.DOWN).getValue();

  const profitValue = counterEarning ? Number(profitQuantity) : Number(profitCounterQuantity);
  const isThirdState = data[0].sellTakeProfitPrice > 0 || data[0].sellStopLossPrice > 0;

  return (
    <div className='mt-4' style={{ borderLeft: '1px solid #545d88' } }>
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
      : <>
          <MarketsTableRowFilled
            data={data}
            counterEarning={counterEarning}
            tabType={tabType}
            sumFilledQuantity={sumFilledQuantity.getValue()}
            averageQuantity={averageQuantity}
            profitValue={profitValue}
            marketPrice={marketPrice}
          />
        </>
      }

      {isThirdState &&
        <MarketsTableRowFilledAdditional
          data={data}
          counterEarning={counterEarning}
          tabType={tabType}
          sumFilledQuantity={sumFilledQuantity.getValue()}
          averageQuantity={averageQuantity}
          profitValue={profitValue}
          marketPrice={marketPrice}
        />
      }
    </div>
  );
};