/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useState } from 'react';
import './AlertsTable.scss';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { AlertsListType, AlertsListTypeContent, SymbolType } from '../../types/types';
import { AlertsTableRow } from './AlertsTableRow/AlertsTableRow';
import { ModalAddAlert } from '../Modals/ModalAddAlert/ModalAddAlert';
import { Pagination } from '../Pagination/Pagination';
import FlipMove from 'react-flip-move';

interface Props {
  alertsPrice: number,
  alertExecuted: AlertsListTypeContent | undefined,
  currentMarket: string
}

export const AlertsTable: FC<Props> = ({ alertsPrice, alertExecuted, currentMarket }) => {
  const [alertsData, setAlertsData] = useState<AlertsListType>();
  const [alertsTotalRecords, setAlertsTotalRecords] = useState(0);
  const [dataContent, setDataContent] = useState<AlertsListTypeContent[]>([]);
  const [pairsData, setPairsData] = useState<SymbolType[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModalAddAlert, setShowModalAddAlert] = useState(false);
  const [valueCoinPair, setValueCoinPair] = useState('');
  // const [alertsExecuted, setAlertsExecuted] = useState<AlertsListTypeContent[]>([]);

  const favoriteUrl = isFavorite ? '&favorite=true' : '';
  const coinPairUrl = valueCoinPair !== '' ? `&symbol=${valueCoinPair.replace('/', '_')}`: '';

  const getData = useCallback(async (favorite = false, coinPair = '') => {
    const coinPairUrlAdditional = coinPair !== '' ? coinPair : coinPairUrl;
    const favoriteUrlAdditional = favorite ? '&favorite=true' : favoriteUrl;

    try {
      const loadedData = await client.get<AlertsListType>(`/api/alert/list?market=${currentMarket}` + favoriteUrlAdditional + coinPairUrlAdditional);

      if (loadedData.error === 'undefined') {
        return toast.error(loadedData.error);
      }

      const loadedDataContent: AlertsListTypeContent[] = loadedData.content;

      setDataContent(loadedDataContent);
      setAlertsData(loadedData);
      setAlertsTotalRecords(loadedData.totalRecords);
    } catch (error) {
      toast.error(`${error}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMarket]);

  const getPairsData = useCallback(async () => {
    try {
      // const loadedData = await client.get<any>(`/api/alert/symbols?market=${currentMarket}`);
      const loadedData = await client.get<any>(`/api/symbols/${currentMarket}?permissions=SPOT`);

      if (loadedData.error === 'undefined') {
        return toast.error(loadedData.error);
      };

      const arrayLoadedData: SymbolType[] = loadedData;
      const arrayLoadedDataSorted = arrayLoadedData.sort((a, b) => a.name.localeCompare(b.name));

      setPairsData(arrayLoadedDataSorted);
    } catch (error) {
      toast.error(`Lalala${error}`);
    }
  }, [currentMarket]);

  const handleShowFavorite = () => {
    if (isFavorite) {
      getData(false, coinPairUrl);
      return setIsFavorite(() => false);
    }

    getData(true, coinPairUrl);
    setIsFavorite(() => true);
  };

  const handleAddAlert = (newAlert: AlertsListTypeContent) => {
    setDataContent((currentDataContent) => {
      const newDataContent = [newAlert, ...currentDataContent];
      return newDataContent.length % 10 === 0 ? newDataContent.slice(0, -1) : newDataContent;
    
    });
    setAlertsTotalRecords((value) => value + 1);
  };

  const handleDeleteAlert = async (currentId: number) => {
    try {
      const loadedData = await client.delete('/api/alert/' + currentId);

      if (loadedData === 1) {
        setDataContent((data) => data?.filter(({ id }) => id !== currentId));
        setAlertsTotalRecords((value) => value - 1);
        toast.success('Deleted successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleEditData = async (editedData: any, isSeen = false) => {
    let updatedData: any;

    try {

      if (isSeen) {
        updatedData = await client.patch<any>(`/api/alert/seen/${editedData.id}`, '');
      } else {
        updatedData = await client.patch<any>('/api/alert/', editedData);
      };

      if (updatedData.error) {
        toast.error(updatedData.error);
        return false;
      }

      const targetIndex = dataContent.findIndex(item => item.id === updatedData.id);
      const updatedDataArray = [...dataContent];

      if (targetIndex !== -1) {
        updatedDataArray[targetIndex] = updatedData;
        setDataContent(updatedDataArray);
        // toast.success('Updated successfully');
        return true;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handlePageChange = async(page: number) => {
    try {
      const loadedData = await client.get<AlertsListType>(`/api/alert/list?market=${currentMarket}&page=${page}` + favoriteUrl + coinPairUrl);

      if (loadedData.error === 'undefined') {
        return toast.error(loadedData.error);
      }

      const loadedDataContent: AlertsListTypeContent[] = loadedData.content;
      const splittedDataContent = page > 0 ? [...dataContent, ...loadedDataContent] : loadedDataContent;

      setDataContent(splittedDataContent);
      setAlertsData(loadedData);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    const valueCoinPairUrlEffect = valueCoinPair ==='' ? '' : `&symbol=${valueCoinPair.replace('/', '_')}`;
    getData(isFavorite, valueCoinPairUrlEffect);
  }, [isFavorite, valueCoinPair]);

  useEffect(() => {
    getData();
    getPairsData();
  }, [currentMarket]);

  useEffect(() => {
    if (alertExecuted) {
      setDataContent((currentDataContent) => {
        const newDataContent = [alertExecuted, ...currentDataContent.filter(({id})=> alertExecuted.id !== id)];
        return newDataContent.length > dataContent.length ? newDataContent.slice(0, -1) : newDataContent;
      });
    };
  }, [alertExecuted]);

  return (
    <Container fluid className='markets-table my-4'>
      <Row className='align-items-center'>
        <Col className='ms-2 text-center'>
          <div className='markets-table__row header text-center'>{`${dataContent?.length} / ${alertsTotalRecords}`}</div>
        </Col>

        <Col xs={11}>
          <Stack direction='horizontal' className='align-items-center justify-content-between'>
            <Stack direction='horizontal' gap={3}>
              <Stack direction='horizontal' gap={3} className='alerts-table__inputwrapper'>
                <label htmlFor="inputField">
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="5.5" stroke="white"/>
                    <path d="M9 10L13 14" stroke="white"/>
                  </svg>
                </label>

                <input
                  list="coinpairs-search"
                  id="inputField"
                  value={valueCoinPair}
                  onChange={(event) => setValueCoinPair(event.target.value)}
                  className='alerts-table__input'
                  style={{textTransform: 'uppercase'}}
                />

                <datalist id="coinpairs-search">
                  {pairsData.map((pair) =>
                    <option key={pair.id} value={pair.name.replace('_', '/')} />
                  )}
                </datalist>

                {valueCoinPair && <button className='bg-transparent text-white' onClick={() => setValueCoinPair('')}>x</button>}
              </Stack>

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
          <div key={alert.id} className='mt-2' style={{ borderLeft: '1px solid transparent' }}>
            <AlertsTableRow
              data={alert}
              alertsPrice={alertsPrice}
              onDelete={handleDeleteAlert}
              onChange={handleEditData}
            />
          </div>
        )}
      </FlipMove>

      <Pagination
        lastPageNumber={alertsData?.lastPageNumber || 0}
        pageNumber={alertsData?.pageNumber || 0}
        onPageChange={handlePageChange}
      />

      {showModalAddAlert &&
        <ModalAddAlert
          show={showModalAddAlert}
          markets={['BINANCE', 'BYBIT', 'COINBASE']}
          currentMarket={currentMarket}
          pairsData={pairsData}
          alertsPrice={alertsPrice}
          onAdd={handleAddAlert}
          onClose={() => setShowModalAddAlert(false)}
        />
      }
    </Container>
  );
};