import React, { FC, useState } from 'react';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import './Calculator.scss';
import { CalculatorButtonType } from '../../types/enums';
import classNames from 'classnames';

interface Props {
  currency: string,
  type: CalculatorButtonType,
  marketPrice: number,
}

export const Calculator: FC<Props> = ({ currency, type, marketPrice }) => {
  const [inputPrice, setInputPrice] = useState<string | number>('');
  const [inputQuantity, setInputQuantity] = useState<string | number>('');
  const [inputAll, setInputAll] = useState<string | number>('');

  const handleSetInputQuantity = (value: number | string) => {
    setInputQuantity(() => value);

    if (+inputPrice > 0 && +value > 0) {
      setInputAll(() => (Math.floor((+inputPrice * +value) * 10000) / 10000));
      return;
    }

    setInputAll('');
  };

  const handleSetInputAll = (value: number | string) => {
    setInputAll(() => value);

    if (+value <= 0) {
      setInputQuantity('');
      return;
    }

    const price = inputPrice ? inputPrice : marketPrice;

    if (!inputPrice) {
      setInputPrice(() => marketPrice);
    }

    setInputQuantity(() => Math.floor(+value / +price));
  };

  const handleSetInputPrice = (value: number | string) => {
    setInputPrice(() => value);

    if (+value > 0 && +inputQuantity > 0) {
      setInputAll(() => Math.floor((+value * +inputQuantity) * 10000) / 10000);
      return;
    }

    setInputAll('');
  };

  return (
    <div className='calculator'>
      <div>
        Balance
        <span className='calculator__balance'>
          {`168.7 
          ${type === CalculatorButtonType.buy ? '$' : 'XRP'}`}
        </span>
      </div>

      <div className='calculator__row'>
        Price 
        <CalculatorInput inputValue={inputPrice} setInputValue={handleSetInputPrice} />
        {currency}
      </div>

      <div className='calculator__row'>
        Quantity 
        <CalculatorInput inputValue={inputQuantity} setInputValue={handleSetInputQuantity} />
        XRP
      </div>

      <div className='calculator__row'>
        All 
        <CalculatorInput inputValue={inputAll} setInputValue={handleSetInputAll} />
        {currency}
      </div>

      <div>
        <button 
          className={classNames('calculator__button', {
            buy: type === CalculatorButtonType.buy,
            sell: type === CalculatorButtonType.sell,
            })}
        >
            {type}
        </button>


      </div>

    </div>
  );
};