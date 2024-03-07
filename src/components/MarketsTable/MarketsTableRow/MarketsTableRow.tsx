import React, { FC, useId, useState } from 'react';
import classNames from 'classnames';
import { Col, Collapse, ProgressBar, Row, Stack } from 'react-bootstrap';
import { milisecondsToDate } from '../../../utils/helpers';
import MarketsTableSubRow from '../MarketsTableSubRow/MarketsTableSubRow';
import { MarketsTabsType } from '../../../types/enums';
import bigDecimal from 'js-big-decimal';
import { MarketsTableInput } from '../MarketsTableInput/MarketsTableInput';

interface Props {
  data: any,
  counterEarning: boolean,
  tabType: MarketsTabsType,
  sumQuantity: string,
  isRed?: boolean
}

export const MarketsTableRow: FC<Props> = ({ data, counterEarning, tabType, sumQuantity, isRed = false }) => {
  const [open, setOpen] = useState(false);
  const collapseId = useId();

  const dataRow = data[0];
  const dateString = milisecondsToDate(dataRow.buyCreationTime);
  const dataBuyCreationPrice = bigDecimal.round(dataRow.buyCreationPrice, 2);
  const currentSymbolArray = dataRow.symbol.split('/');
  const currentSymbol = counterEarning ? currentSymbolArray[0] : currentSymbolArray[1];

  return (
    <div style={{border: isRed ? '1px solid red': ''}}>
      <Row className='align-items-center fw-bold mt-2 '>
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
              'markets-table__status--blue': tabType === MarketsTabsType.buy || tabType === MarketsTabsType.all,
              'markets-table__status--orange': tabType === MarketsTabsType.sell,
              })}></div>
          </div>
        </Col>
        <Col xs={9}>
          <Row className='markets-table__row'>
            <Col>{dateString}</Col>
            <Col style={{ color: '#5b6aff' }}>{dataBuyCreationPrice}</Col>
            <Col>{dataRow.symbol}</Col>
            <Col>{`${sumQuantity} ${currentSymbol}`}</Col>
            <Col className='text-danger'></Col>
            <Col className='text-danger'></Col>
            <Col className='text-success'>Buy</Col>
            <Col>
              <ProgressBar data-bs-theme='dark'>
                <ProgressBar variant="success" now={0} key={1} />
                <ProgressBar variant="danger" now={0} key={2} />
              </ProgressBar>
            </Col>
            <Col>
              <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.45513 0.205025C8.31969 0.0737498 8.13599 0 7.94444 0H5.05556C4.86401 0 4.68031 0.0737498 4.54487 0.205025C4.40942 0.336301 4.33333 0.514348 4.33333 0.7C4.33333 0.885652 4.40942 1.0637 4.54487 1.19497C4.68031 1.32625 4.86401 1.4 5.05556 1.4H7.94444C8.13599 1.4 8.31969 1.32625 8.45513 1.19497C8.59058 1.0637 8.66667 0.885652 8.66667 0.7C8.66667 0.514348 8.59058 0.336301 8.45513 0.205025Z" fill="#323750" />
                <path d="M12.2778 2.1C12.4693 2.1 12.653 2.17375 12.7885 2.30503C12.9239 2.4363 13 2.61435 13 2.8C13 2.98565 12.9239 3.1637 12.7885 3.29497C12.653 3.42625 12.4693 3.5 12.2778 3.5H11.5556L11.5534 3.5497L10.8796 12.6994C10.8536 13.0526 10.6905 13.3832 10.4232 13.6245C10.1558 13.8658 9.80407 14 9.43872 14H3.56056C3.19521 14 2.84344 13.8658 2.57608 13.6245C2.30873 13.3832 2.14566 13.0526 2.11972 12.6994L1.44589 3.5504C1.44479 3.53362 1.44431 3.51681 1.44444 3.5H0.722222C0.530677 3.5 0.346977 3.42625 0.211534 3.29497C0.076091 3.1637 0 2.98565 0 2.8C0 2.61435 0.076091 2.4363 0.211534 2.30503C0.346977 2.17375 0.530677 2.1 0.722222 2.1H12.2778Z" fill="#323750" />
              </svg>
            </Col>
          </Row>
        </Col>
        <Col xs={2}>
          <Stack direction="horizontal" className='markets-table__inputwrapper'>
            <MarketsTableInput inputValue={dataBuyCreationPrice} />
            <button className='markets-table__button'>
              Price
            </button>
          </Stack>
        </Col>
      </Row>

      <Collapse in={open}>
        <div id={collapseId}>
          {data.map((subRow: any, index: number) => (
            <MarketsTableSubRow key={index} data={subRow} currentSymbol={currentSymbol} counterEarning={counterEarning} />
          ))}
        </div>
      </Collapse>
    </div>
  );
};
