import React, { FC, useState } from 'react';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import './Calculator.scss';
import { CalculatorButtonType } from '../../types/enums';
import classNames from 'classnames';
import { Col, Stack, Row } from 'react-bootstrap';
import { BalanceTypeData } from '../../types/types';

interface Props {
  currency: string[],
  type: CalculatorButtonType,
  marketPrice: number,
  balance?: BalanceTypeData,
}

export const Calculator: FC<Props> = ({ currency, type, marketPrice, balance }) => {
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
<>
    {/* <div className='calculator'> */}
      <Stack gap={2} className='calculator'>
        <Row>
          <Col className='mb-2'>
            Balance
            <span className='calculator__balance'>
              {balance && `${balance?.quantity} ${balance?.currency}`}
              {/* ${type === CalculatorButtonType.buy ? currency[1] : currency[0]}`} */}
            </span>
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col xs={3}>
            Price
          </Col>
          <Col>
            <CalculatorInput inputValue={inputPrice} setInputValue={handleSetInputPrice} />
          </Col>
          <Col xs={2}>
            {currency[1]}
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col xs={3}>
            Quantity
          </Col>
          <Col>
            <CalculatorInput inputValue={inputQuantity} setInputValue={handleSetInputQuantity} />
          </Col>
          <Col xs={2}>
            {currency[0]}
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col xs={3}>
            All
          </Col>
          <Col>
            <CalculatorInput inputValue={inputAll} setInputValue={handleSetInputAll} />
          </Col>
          <Col xs={2}>
            {currency[1]}
          </Col>
        </Row>

        <Row>
          <button 
            className={classNames('calculator__button', {
              buy: type === CalculatorButtonType.buy,
              sell: type === CalculatorButtonType.sell,
              })}
          >
              {type}
          </button>
        </Row>
      </Stack>
    </>
  );
};