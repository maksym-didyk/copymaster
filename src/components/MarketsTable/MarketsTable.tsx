import React, { FC, useEffect, useState } from 'react';
import './MarketsTable.scss';
import { Col, Container, DropdownDivider, Row } from 'react-bootstrap';
import { MarketsTableRows } from './MarketsTableRows/MarketsTableRows';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { MarketsTabsType } from '../../types/enums';

interface Props {
  tabType: MarketsTabsType,
  counterEarning: boolean,
}

export const MarketsTable: FC<Props> = ({ tabType, counterEarning }) => {
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
    <Container fluid className='markets-table my-4' id='test'>
      <Row>
        <Col className='ms-2'>
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
        <MarketsTableRows 
          key={key}
          data={tableData[key]}
          counterEarning={counterEarning} 
          tabType={tabType}
        />)}

        <DropdownDivider />

    </Container>
  );
};
