import React, { FC, useEffect, useState } from 'react';
import './MarketsTable.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { MarketsTableRow } from './MarketsTableRow/MarketsTableRow';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { MarketsTabType } from '../../types/enums';

interface Props {
  type: MarketsTabType,
  counterEarning: boolean,
}

export const MarketsTable: FC<Props> = ({ type, counterEarning }) => {
  const [tableData, setTableData] = useState<any>({});
  const [dataKeys, setDataKeys] = useState<string[]>([]);

  useEffect(() => {
    const getData = async (url: string) => {
      try {
        const loadedData = await client.get<any>('/api/markets' + url);
        const loadedDataKeys = Object.keys(loadedData);

        setTableData(loadedData);
        setDataKeys(loadedDataKeys);
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    getData('/spot/order-block/buy/binance/XRP_USDT');

  }, []);

  return (
    <Container fluid className='markets-table mt-4' id='test'>
      <Row>
        <Col>
          <div className='markets-table__row header'>{dataKeys.length}</div>
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

      {dataKeys.map((key) => 
        <MarketsTableRow 
          key={key}
          data={tableData[key]}
          counterEarning={counterEarning} 
          type={type}
        />)}

    </Container>
  );
};
