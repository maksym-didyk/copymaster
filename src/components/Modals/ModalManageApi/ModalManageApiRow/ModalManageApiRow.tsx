import React, { FC, useId } from 'react';
import { Col, Form, Row, Stack } from 'react-bootstrap';

interface Props {
  user: string,
  balance: number,
  currency?: string,
  market?: string
}

export const ModalManageApiRow: FC<Props> = ({user, balance, currency = 'USDT', market = 'Binance'}) => {
  const checkboxId = useId();

  return (
          <Row className='mt-2'>
            <Col xs={11} className='pe-4'>
              <Row className='modalmanageapi__row align-items-center'>
                <Col>
                  {user}
                </Col>
                <Col><span style={{color: '#9c9fa4', fontSize: '0.65rem'}}>Market:</span> {market}</Col>
                <Col>
                  <Stack direction='horizontal' gap={1} className='align-items-center'>
                    <span style={{color: '#9c9fa4', fontSize: '0.65rem'}}>Balance:</span>
                    <span className='text-success fw-bold'>{balance}</span>
                    {currency}
                  </Stack>
                </Col>
              </Row>
            </Col>
            <Col className='modalmanageapi__row d-flex align-items-center justify-content-center'>
              <Form.Check
                type='checkbox'
                id={checkboxId}
              />
            </Col>
          </Row>
  )
}