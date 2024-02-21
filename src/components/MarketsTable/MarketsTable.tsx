import React from 'react';
import './MarketsTable.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { MarketsTableRow } from './MarketsTableRow/TableRow';

export const MarketsTable = () => {
  return (
    <Container fluid className='markets-table mt-5' id='test'>
      <Row>
        <Col>
          <div className='markets-table__row header'>4</div>
        </Col>
        <Col xs={9}>
          <Row className='markets-table__row header'>
            <Col>Date</Col>
            <Col>Price</Col>
            <Col>Coin pair</Col>
            <Col>Value</Col>
            <Col>Profit</Col>
            <Col>%</Col>
            <Col>Position</Col>
            <Col>Done</Col>
            <Col></Col>
          </Row>
        </Col>
        <Col xs={2}>
          <div className='markets-table__row header'>Targets</div>
          </Col>
      </Row>

      <MarketsTableRow />
      <MarketsTableRow />
      <MarketsTableRow />
      <MarketsTableRow />
      <MarketsTableRow />
      <MarketsTableRow />
      <MarketsTableRow />
    </Container>

/* <div className="container text-center text-black">
<div className="row">
  <div className="col">
   <div className="bg-light">Custom column padding</div>
  </div>
  <div className="col-9">
    <div className="row">
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
      <div className="col">
        <div className="bg-light">Custom column padding</div>
      </div>
    </div>
  </div>
  <div className="col-2">
    <div className="bg-light">Custom column padding</div>
  </div>
</div>
</div> */
  );
};
