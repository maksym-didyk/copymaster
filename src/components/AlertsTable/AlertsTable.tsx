import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import './AlertsTable.scss';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { AlertsListType, AlertsListTypeContent } from '../../types/types';
import FlipMove from 'react-flip-move';
import { AlertsTableRow } from './AlertsTableRow/AlertsTableRow';
import { ModalAddAlert } from '../Modals/ModalAddAlert/ModalAddAlert';

interface Props {
  marketPrice: number,
  currentMarket: string,
  currentSymbol?: string,
  counterEarning?: boolean
}

export const AlertsTable: FC<Props> = ({ marketPrice, currentMarket }) => {
  const [tableData, setTableData] = useState<AlertsListType>();
  const [dataContent, setDataContent] = useState<AlertsListTypeContent[]>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModalAddAlert, setShowModalAddAlert] = useState(false);
  const [value, setValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue === '') {
      setDataContent(tableData?.content);
      return;
    }
    
    setDataContent(() => dataContent?.filter((item: AlertsListTypeContent) =>
      item.symbol.toLowerCase().includes(newValue.toLowerCase().trim()))
    );
  };

  const handleShowFavorite = () => {
    if (isFavorite) {
      setDataContent(tableData?.content);
      setIsFavorite(() => false);
      return;
    }

    setDataContent((data) => data?.filter(({ favorite }) => favorite === true));
    setIsFavorite(() => true);
  }

  const handleAlertDelete = async (currentId: number) => {
    try {
      const loadedData = await client.delete('/api/alert/' + currentId);

      if (loadedData === 1) {
        setDataContent((data) => data?.filter(({ id }) => id !== currentId));
        toast.success('Deleted successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const getData = useCallback(async () => {
    try {
      const loadedData = await client.get<AlertsListType>(`/api/alert/list?market=${currentMarket}`);

      if (loadedData.error !== undefined) {
        return toast.error(loadedData.error);
      }

      setTableData(loadedData);
      setDataContent(loadedData.content);

    } catch (error) {
      toast.error(`${error}`);
    }
  }, [currentMarket]);

  useEffect(() => {
    getData();
  }, [currentMarket, getData]);

  return (
    <Container fluid className='markets-table my-4'>
      <Row className='align-items-center'>
        <Col className='ms-2 text-center'>
          <div className='markets-table__row header text-center'>{dataContent?.length}</div>
        </Col>

        <Col xs={11}>
          <Stack direction='horizontal' className='align-items-center justify-content-between'>
            <Stack direction='horizontal' gap={3}>
              <input
                type='text'
                value={value}
                onChange={handleInputChange}
              />

              <button className='header__button header__button--fill fw-bold' onClick={() => setShowModalAddAlert(true)}>Add alert</button>
            </Stack>

            <button style={{ backgroundColor: 'transparent', color: '#9C9FA4' }} onClick={handleShowFavorite}>
                {isFavorite ? 'All pairs' : 'Favorite pairs'}

                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='ms-2'>
                  <g filter="url(#filter0_b_639_1839)">
                  <circle cx="16" cy="16" r="16" fill="#3548FE"/>
                  </g>
                  <path d="M25 13.5002H18.1135L16 7L13.8865 13.5002H7L12.6329 17.4998L10.4391 24L16 19.9716L21.5609 24L19.363 17.4998L25 13.5002Z" fill="white"/>
                  <defs>
                  <filter id="filter0_b_639_1839" x="-4" y="-4" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_639_1839"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_639_1839" result="shape"/>
                  </filter>
                  </defs>
                </svg>
            </button>
          </Stack>
        </Col>
      </Row>

    <FlipMove enterAnimation="accordionVertical" leaveAnimation="accordionVertical">
    {dataContent?.map((alert: AlertsListTypeContent) =>
      <div key={alert.id} className='mt-2' style={{ borderLeft: '1px solid transparent' } }>
        <AlertsTableRow
          data={alert}
          marketPrice={marketPrice}
          onDelete={handleAlertDelete}
        />
      </div>
    )}
    </FlipMove>

    {showModalAddAlert && 
      <ModalAddAlert
        show={showModalAddAlert}
        onClose={() => setShowModalAddAlert(false)}
        markets={['BINANCE', 'BYBIT', 'COINBASE']}
        currentMarket={'BINANCE'}
        onUpdate={getData}
      />
    }
    </Container>
  );
};
