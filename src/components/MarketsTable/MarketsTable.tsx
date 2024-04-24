import React, { FC, useEffect, useState } from 'react';
import './MarketsTable.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { MarketsTableRows } from './MarketsTableRows/MarketsTableRows';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { MarketsTabsType } from '../../types/enums';

interface Props {
  tabType: MarketsTabsType,
  counterEarning: boolean,
  tradeType: string,
  currentMarket: string,
  currentSymbol: string
}

export const MarketsTable: FC<Props> = ({ tabType, counterEarning, tradeType, currentMarket, currentSymbol }) => {
  const [tableData, setTableData] = useState<any>({});
  const [dataKeys, setDataKeys] = useState<string[]>([]);

  useEffect(() => {
    const getData = async (url: string) => {
      try {
        const loadedData = await client.get<any>('/api/markets' + url);

        if (loadedData.error !== undefined) {
          return toast.error(loadedData.error);
        }

        const loadedDataKeys = Object.keys(loadedData);

        setTableData(loadedData);
        setDataKeys(loadedDataKeys);
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    getData(`/${tradeType}/${tabType}/${currentMarket}/${currentSymbol}?counterEarning=${counterEarning}`);
  }, [counterEarning, currentMarket, currentSymbol, tabType, tradeType]);

  return (
    <Container fluid className='markets-table my-4'>
      <Row className='text-center'>
        <Col className='ms-2 text-center'>
          <div className='markets-table__row header text-center'>{dataKeys.length}</div>
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
    </Container>
  );
};
