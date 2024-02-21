import React, { useId, useState } from 'react';
import { Col, Collapse, Row } from 'react-bootstrap';

export const MarketsTableRow = () => {
  const [open, setOpen] = useState(false);
  const collapseId = useId();

  return (
    <>
        <Row className='fw-bold mt-2'>
      <Col
        onClick={() => setOpen(!open)}
        aria-controls={collapseId}
        aria-expanded={open}
        style={{ cursor: 'pointer' }}
      >
        <div className='markets-table__status'>
          {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6.5" stroke="#0E0F16" stroke-width="3" />
          </svg> */}
          <svg width="34" height="15" viewBox="0 0 34 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="1.5" width="12" height="12" rx="6" stroke="#0E0F16" stroke-width="3"/>
            <path d="M19 2.5293H32" stroke="#0E0F16" stroke-width="3" stroke-linecap="round"/>
            <path d="M19 7.5293H32" stroke="#0E0F16" stroke-width="3" stroke-linecap="round"/>
            <path d="M19 12.5293H32" stroke="#0E0F16" stroke-width="3" stroke-linecap="round"/>
          </svg>

        </div>
      </Col>
      <Col 
        xs={9}
        onClick={() => setOpen(!open)}
        aria-controls={collapseId}
        aria-expanded={open}
        style={{ cursor: 'pointer' }}
      >
        <Row className='markets-table__row'>
          <Col>20.08.24</Col>
          <Col style={{ color: '#5b6aff' }}>0.50</Col>
          <Col>XRP/USDT</Col>
          <Col>5.22USDT</Col>
          <Col className='text-danger'>-0.67 USDT</Col>
          <Col className='text-danger'>-0.01%</Col>
          <Col className='text-danger'>Sell</Col>
          <Col><div className='markets-table__progressbar'></div>{collapseId}</Col>
          <Col>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.45513 0.205025C8.31969 0.0737498 8.13599 0 7.94444 0H5.05556C4.86401 0 4.68031 0.0737498 4.54487 0.205025C4.40942 0.336301 4.33333 0.514348 4.33333 0.7C4.33333 0.885652 4.40942 1.0637 4.54487 1.19497C4.68031 1.32625 4.86401 1.4 5.05556 1.4H7.94444C8.13599 1.4 8.31969 1.32625 8.45513 1.19497C8.59058 1.0637 8.66667 0.885652 8.66667 0.7C8.66667 0.514348 8.59058 0.336301 8.45513 0.205025Z" fill="#323750" />
              <path d="M12.2778 2.1C12.4693 2.1 12.653 2.17375 12.7885 2.30503C12.9239 2.4363 13 2.61435 13 2.8C13 2.98565 12.9239 3.1637 12.7885 3.29497C12.653 3.42625 12.4693 3.5 12.2778 3.5H11.5556L11.5534 3.5497L10.8796 12.6994C10.8536 13.0526 10.6905 13.3832 10.4232 13.6245C10.1558 13.8658 9.80407 14 9.43872 14H3.56056C3.19521 14 2.84344 13.8658 2.57608 13.6245C2.30873 13.3832 2.14566 13.0526 2.11972 12.6994L1.44589 3.5504C1.44479 3.53362 1.44431 3.51681 1.44444 3.5H0.722222C0.530677 3.5 0.346977 3.42625 0.211534 3.29497C0.076091 3.1637 0 2.98565 0 2.8C0 2.61435 0.076091 2.4363 0.211534 2.30503C0.346977 2.17375 0.530677 2.1 0.722222 2.1H12.2778Z" fill="#323750" />
            </svg>
          </Col>
        </Row>
      </Col>
      <Col xs={2}>
        <div className='markets-table__button'>
          <div className='markets-table__button--w' />
          Price
        </div>

      </Col>
    </Row>
    
    <Collapse in={open}>
      <Row id={collapseId}>
        <Col></Col>
        <Col xs={9}>
          <Row className='markets-table__row'>
            <Col></Col>
            <Col style={{ color: '#5b6aff' }}>0.50</Col>
            <Col></Col>
            <Col>5.22USDT</Col>
            <Col className='text-danger'>-0.67 USDT</Col>
            <Col className='text-danger'>-0.01%</Col>
            <Col className='text-danger'></Col>
            <Col><div className='markets-table__progressbar'></div></Col>
            <Col>
              <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.45513 0.205025C8.31969 0.0737498 8.13599 0 7.94444 0H5.05556C4.86401 0 4.68031 0.0737498 4.54487 0.205025C4.40942 0.336301 4.33333 0.514348 4.33333 0.7C4.33333 0.885652 4.40942 1.0637 4.54487 1.19497C4.68031 1.32625 4.86401 1.4 5.05556 1.4H7.94444C8.13599 1.4 8.31969 1.32625 8.45513 1.19497C8.59058 1.0637 8.66667 0.885652 8.66667 0.7C8.66667 0.514348 8.59058 0.336301 8.45513 0.205025Z" fill="#323750" />
                <path d="M12.2778 2.1C12.4693 2.1 12.653 2.17375 12.7885 2.30503C12.9239 2.4363 13 2.61435 13 2.8C13 2.98565 12.9239 3.1637 12.7885 3.29497C12.653 3.42625 12.4693 3.5 12.2778 3.5H11.5556L11.5534 3.5497L10.8796 12.6994C10.8536 13.0526 10.6905 13.3832 10.4232 13.6245C10.1558 13.8658 9.80407 14 9.43872 14H3.56056C3.19521 14 2.84344 13.8658 2.57608 13.6245C2.30873 13.3832 2.14566 13.0526 2.11972 12.6994L1.44589 3.5504C1.44479 3.53362 1.44431 3.51681 1.44444 3.5H0.722222C0.530677 3.5 0.346977 3.42625 0.211534 3.29497C0.076091 3.1637 0 2.98565 0 2.8C0 2.61435 0.076091 2.4363 0.211534 2.30503C0.346977 2.17375 0.530677 2.1 0.722222 2.1H12.2778Z" fill="#323750" />
              </svg>
            </Col>
          </Row>
        </Col>
        <Col xs={2}>
          <div className='markets-table__button'>
            <div className='markets-table__button--w' />
            Price
          </div>
        </Col>
      </Row>
      </Collapse></>

  );
};
