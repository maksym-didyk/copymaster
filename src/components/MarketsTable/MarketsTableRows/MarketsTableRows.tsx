import React, { FC } from 'react';
import { MarketsTabsType } from '../../../types/enums';
import bigDecimal from 'js-big-decimal';
import { MarketsTableRow } from '../MarketsTableRow/MarketsTableRow';
import { MarketsTableRowFilled } from '../MarketsTableRowFilled/MarketsTableRowFilled';
import { takeAverage } from '../../../utils/helpers';

interface Props {
  data: any,
  counterEarning: boolean,
  tabType: MarketsTabsType,
}

export const MarketsTableRows: FC<Props> = ({ data, counterEarning, tabType }) => {
  const dataQuantity = counterEarning ? 'buyQuantity' : 'buyCounterQuantity';
  const dataFilledQuantity = counterEarning ? 'buyFilledQuantity' : 'buyFilledCounterQuantity';

  const { sumQuantity, sumFilledQuantity } = data.reduce((acc: any, item: any) => {
    const quantity = new bigDecimal(item[dataQuantity]);
    const filledQuantity = new bigDecimal(item[dataFilledQuantity]);

    return {
      sumQuantity: acc.sumQuantity.add(quantity),
      sumFilledQuantity: acc.sumFilledQuantity.add(filledQuantity),
    };
  }, { sumQuantity: new bigDecimal(0), sumFilledQuantity: new bigDecimal(0) });

  const averageQuantity = takeAverage(sumFilledQuantity, sumQuantity);

  return (
    <div className='mt-4' style={{ borderLeft: '1px solid #545d88' }}>
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
        />
      }
    </div>
  );
};
