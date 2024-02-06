import React, { useState } from 'react';
import './Markets.scss';
import { Calculator } from '../Calculator';
import { CalculatorButtonType, DropDownType } from '../../types/enums';
import { CustomSelect } from '../CustomSelect';
import classNames from 'classnames';

export const Markets = () => {
  const [optionState, setOptionState] = useState('USDT');

  const marketPrice = 0.6044;
  const options = ['USDT', 'XRP'];

  return (
    <main >
      <div>
        <CustomSelect type={DropDownType.pair} data={['XRP/USDT','BTC/USDT','ETH/USDT','XRP/BTC']} title={'Choose a pair '}/>

        <CustomSelect data={['Split position','Choose average','Average All']} title={'Choose your average '}/>
      </div>

      <div className='markets'>
        <div className='markets__calculators'>
            <Calculator currency={'USDT'} type={CalculatorButtonType.buy} marketPrice={marketPrice} />

            <Calculator currency={'USDT'} type={CalculatorButtonType.sell} marketPrice={marketPrice} />
        </div>

        <div>
          <div className='markets__earn'>
            Choose your earn:

            <ul className='header__options'>
              {options.map((option) =>
                <React.Fragment key={option}>
                  <li className={classNames('header__button', {
                    active: option === optionState,
                  })} onClick={() => setOptionState(option)}>{option}</li>
                  <div className='header__vr' />
                </React.Fragment>
              )}
            </ul>
          </div>

          <div className='markets__marketprice'>
            Market price:
            <p className='markets__marketprice-value'>{marketPrice}</p>
          </div>
        </div>
      </div>
    </main>
  );
};