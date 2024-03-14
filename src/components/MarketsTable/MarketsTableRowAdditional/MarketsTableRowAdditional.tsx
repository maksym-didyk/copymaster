import React, { FC, useId, useState } from 'react';
import classNames from 'classnames';
import { Button, Col, Collapse, Modal, ProgressBar, Row, Stack } from 'react-bootstrap';
import { milisecondsToDate, showProgress } from '../../../utils/helpers';
import { MarketsTabsType } from '../../../types/enums';
import { toast } from 'react-toastify';
import bigDecimal from 'js-big-decimal';
import { MarketsTableInput } from '../MarketsTableInput/MarketsTableInput';
import { MarketsTableSubRowAdditional } from '../MarketsTableSubRowAdditional/MarketsTableSubRowAdditional';

interface Props {
  data: any,
  counterEarning: boolean,
  tabType: MarketsTabsType,
  sumFilledQuantity: string,
  averageQuantity?: number,
  profitValue?: number,
  marketPrice: number,
  isFilled?: boolean,
  isRed?: boolean
}

export const MarketsTableRowAdditional: FC<Props> = ({
  data,
  counterEarning,
  tabType,
  sumFilledQuantity,
  averageQuantity = 0,
  profitValue = 0,
  marketPrice,
  isFilled = false,
  isRed = false
}) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const collapseId = useId();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const dataRow = data[0];
  const isTakeProfit = dataRow.sellTakeProfitPrice > 0 ? true : false;
  const dateFilledTime = milisecondsToDate(dataRow.buyFilledTime);
  const dateTime = isTakeProfit ? milisecondsToDate(dataRow.sellTakeProfitTime) : milisecondsToDate(dataRow.sellStopLossTime);
  const dataFilledPrice = bigDecimal.round(dataRow.buyFilledPrice, 2);
  const dataPrice = isTakeProfit ? bigDecimal.round(dataRow.sellTakeProfitPrice, 2) : bigDecimal.round(dataRow.sellStopLossPrice, 2);
  const currentSymbolArray = dataRow.symbol.split('/');
  const currentSymbol = counterEarning ? currentSymbolArray[0] : currentSymbolArray[1];
  const averageQuantityProgressBar = isFilled ? averageQuantity : 0;
  const averageQuantityRemain = averageQuantityProgressBar > 0 ? 100 - averageQuantityProgressBar : 0;

  const profitPercentCalculate = Number(sumFilledQuantity) === 0 ? new bigDecimal(sumFilledQuantity) : new bigDecimal(profitValue).divide(new bigDecimal (sumFilledQuantity)).multiply(new bigDecimal('100')).round(2, bigDecimal.RoundingModes.FLOOR);
  const profitPercentValue = Number(profitPercentCalculate.getValue());

  return (
    <div style={{border: isRed ? '1px solid red': ''}}>
      <Row className='align-items-center fw-bold mt-2'>
        <Col
          onClick={() => setOpen(!open)}
          aria-controls={collapseId}
          aria-expanded={open}
          style={{ cursor: 'pointer' }}
          className='ms-2'
        >
          <div className={classNames('markets-table__row-main', { open })}>
            <div className={classNames('markets-table__status', { 
              three: true, // need to add logic of state
              'markets-table__status--dark-blue': (tabType === MarketsTabsType.buy || tabType === MarketsTabsType.all) && isFilled === false,
              'markets-table__status--orange': tabType === MarketsTabsType.sell,
             })}></div>
          </div>
        </Col>
        <Col xs={9}>
          <Row className='markets-table__row'>
            <Col>
              <p style={{ color: '#8997dc' }}>{dateFilledTime}</p>
              <p>{dateTime}</p>
            </Col>
            <Col>
              <p style={{ color: '#5b6aff' }}>{dataFilledPrice}</p>
              <p style={{ color: '#ff363a' }}>{dataPrice}</p>
              </Col>
            <Col>{dataRow.symbol}</Col>
            <Col>{`${sumFilledQuantity} ${currentSymbol}`}</Col>
            {profitValue > 0
              ? <Col className='text-success'>{`+${profitValue} ${currentSymbol}`}</Col>
              : <Col className='text-danger'>{`${profitValue} ${currentSymbol}`}</Col>
            }
            {profitPercentValue > 0
              ? <Col className='text-success'>{`+${profitPercentValue}%`}</Col>
              : <Col className='text-danger'>{`${profitPercentValue}%`}</Col>
            }
            <Col className='text-success'>Buy</Col>
            <Col>
            <ProgressBar data-bs-theme='dark'>
                <ProgressBar variant="success" now={averageQuantityProgressBar} label={showProgress(averageQuantityProgressBar)} key={1} />
                <ProgressBar variant="danger" now={averageQuantityRemain} label={showProgress(averageQuantityRemain)} key={2} />
              </ProgressBar>
            </Col>
            <Col>
              {averageQuantity === 100
              ? <div style={{ cursor: 'pointer' }} title='Delete this position' onClick={() => {toast.warning('Function delete position')}}>
                  <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.45513 0.324166C8.31969 0.19289 8.13599 0.119141 7.94444 0.119141H5.05556C4.86401 0.119141 4.68031 0.19289 4.54487 0.324166C4.40942 0.455441 4.33333 0.633489 4.33333 0.819141C4.33333 1.00479 4.40942 1.18284 4.54487 1.31412C4.68031 1.44539 4.86401 1.51914 5.05556 1.51914H7.94444C8.13599 1.51914 8.31969 1.44539 8.45513 1.31412C8.59058 1.18284 8.66667 1.00479 8.66667 0.819141C8.66667 0.633489 8.59058 0.455441 8.45513 0.324166Z" fill="white"/>
                    <path d="M12.2778 2.21914C12.4693 2.21914 12.653 2.29289 12.7885 2.42417C12.9239 2.55544 13 2.73349 13 2.91914C13 3.10479 12.9239 3.28284 12.7885 3.41412C12.653 3.54539 12.4693 3.61914 12.2778 3.61914H11.5556L11.5534 3.66884L10.8796 12.8185C10.8536 13.1717 10.6905 13.5023 10.4232 13.7436C10.1558 13.985 9.80407 14.1191 9.43872 14.1191H3.56056C3.19521 14.1191 2.84344 13.985 2.57608 13.7436C2.30873 13.5023 2.14566 13.1717 2.11972 12.8185L1.44589 3.66954C1.44479 3.65276 1.44431 3.63595 1.44444 3.61914H0.722222C0.530677 3.61914 0.346977 3.54539 0.211534 3.41412C0.076091 3.28284 0 3.10479 0 2.91914C0 2.73349 0.076091 2.55544 0.211534 2.42417C0.346977 2.29289 0.530677 2.21914 0.722222 2.21914H12.2778Z" fill="white"/>
                  </svg>
                </div>
              : <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.45513 0.205025C8.31969 0.0737498 8.13599 0 7.94444 0H5.05556C4.86401 0 4.68031 0.0737498 4.54487 0.205025C4.40942 0.336301 4.33333 0.514348 4.33333 0.7C4.33333 0.885652 4.40942 1.0637 4.54487 1.19497C4.68031 1.32625 4.86401 1.4 5.05556 1.4H7.94444C8.13599 1.4 8.31969 1.32625 8.45513 1.19497C8.59058 1.0637 8.66667 0.885652 8.66667 0.7C8.66667 0.514348 8.59058 0.336301 8.45513 0.205025Z" fill="#323750" />
                  <path d="M12.2778 2.1C12.4693 2.1 12.653 2.17375 12.7885 2.30503C12.9239 2.4363 13 2.61435 13 2.8C13 2.98565 12.9239 3.1637 12.7885 3.29497C12.653 3.42625 12.4693 3.5 12.2778 3.5H11.5556L11.5534 3.5497L10.8796 12.6994C10.8536 13.0526 10.6905 13.3832 10.4232 13.6245C10.1558 13.8658 9.80407 14 9.43872 14H3.56056C3.19521 14 2.84344 13.8658 2.57608 13.6245C2.30873 13.3832 2.14566 13.0526 2.11972 12.6994L1.44589 3.5504C1.44479 3.53362 1.44431 3.51681 1.44444 3.5H0.722222C0.530677 3.5 0.346977 3.42625 0.211534 3.29497C0.076091 3.1637 0 2.98565 0 2.8C0 2.61435 0.076091 2.4363 0.211534 2.30503C0.346977 2.17375 0.530677 2.1 0.722222 2.1H12.2778Z" fill="#323750" />
                </svg>
              }
            </Col>
          </Row>
        </Col>
        <Col xs={2}>
          {isFilled ||
            <Stack direction="horizontal" className='markets-table__inputwrapper'>
                <MarketsTableInput placeHolder={'S.L.'} inputValue={isTakeProfit ? '' : bigDecimal.round(dataRow.sellStopLossPrice, 2)} />
                <span style={{color: '#7783c0'}}>/</span>
                <MarketsTableInput placeHolder={'T.P.'} inputValue={isTakeProfit? bigDecimal.round(dataRow.sellTakeProfitPrice, 2) : ''} />
                <button className='markets-table__button' onClick={handleShowModal}>
                  More
                </button>
              </Stack>
          }
        </Col>
      </Row>

      <Collapse in={open}>
        <div id={collapseId}>
          {data.map((subRow: any, index: number) => (
            <MarketsTableSubRowAdditional key={index} data={subRow} currentSymbol={currentSymbol} counterEarning={counterEarning} marketPrice={marketPrice} isFilled={isFilled} />
          ))}
        </div>
      </Collapse>

      <Modal show={showModal} onHide={handleCloseModal} data-bs-theme='dark' size='lg' fullscreen='sm-down' centered>
        <Modal.Header closeButton>
          <Modal.Title>Stop Limit / Take Profit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction='horizontal' gap={3}>
            <Stack direction='vertical' className='calculator'>
              <Row className='align-items-center'>
                <Col>Position</Col>
                <Col className='text-success fw-bold justify-content-end'>Buy</Col>
              </Row>

              <Row className='align-items-center'>
                <Col>Coin pair</Col>
                <Col className='text-white fw-bold'>XRP/USDT</Col>
              </Row>

              <Row className='align-items-center'>
                <Col>Stop Limit</Col>
                <Col>Test</Col>
              </Row>

              <Row className='align-items-center'>
                <Col>PNL</Col>
                <Col>Test</Col>
              </Row>
            </Stack>

            <Stack className='calculator'>
              <Row className='align-items-center justify-content-between'>
                <Col>Market price</Col>
                <Col className='text-primary fw-bold'>0.55 USDT</Col>
              </Row>

              <Row className='align-items-center justify-content-between'>
                <Col>Entry price</Col>
                <Col>Test</Col>
              </Row>

              <Row className='align-items-center'>
                <Col>Stop Limit</Col>
                <Col>Test</Col>
              </Row>

              <Row className='align-items-center'>
                <Col>PNL</Col>
                <Col>Test</Col>
              </Row>
            </Stack>

      </Stack>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='primary' onClick={handleCloseModal} className='px-5'>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};