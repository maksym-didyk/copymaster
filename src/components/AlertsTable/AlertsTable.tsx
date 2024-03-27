import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import './AlertsTable.scss';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { AlertsListType, AlertsListTypeContent } from '../../types/types';
import { AlertsTableRow } from './AlertsTableRow/AlertsTableRow';
import { ModalAddAlert } from '../Modals/ModalAddAlert/ModalAddAlert';
import { Pagination } from '../Pagination/Pagination';
import FlipMove from 'react-flip-move';

interface Props {
  alertsPrice: any,
  currentMarket: string,
  currentSymbol?: string,
  counterEarning?: boolean
}

export const AlertsTable: FC<Props> = ({ alertsPrice, currentMarket }) => {
  const [alertsData, setAlertsData] = useState<AlertsListType>();
  const [dataContent, setDataContent] = useState<AlertsListTypeContent[]>([]);
  const [pairsData, setPairsData] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModalAddAlert, setShowModalAddAlert] = useState(false);
  const [value, setValue] = useState('');

  const favoriteUrl = isFavorite ? '&favorite=true' : '';

  const getData = useCallback(async (page = 0, favorite = '') => {
    try {
      const loadedData = await client.get<AlertsListType>(`/api/alert/list?market=${currentMarket}&page=${page}&favorite=${favorite}`);

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
  }, [currentMarket]);

  const getPairsData = useCallback(async () => {
    try {
      const loadedData = await client.get<any>(`/api/alert/symbols?market=${currentMarket}`);

      if (loadedData.error === 'undefined') {
        return toast.error(loadedData.error);
      }

      // const loadedDataKeys = Object.keys(loadedData[currentMarket]);

      setPairsData(loadedData[currentMarket]);
    } catch (error) {
      toast.error(`${error}`);
    }
  }, [currentMarket]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const newValue = event.target.value;
    setValue(newValue);

    if (newValue === '') {
      if (alertsData) {
        setDataContent(alertsData.content);
      }
      return;
    }
    
    setDataContent(() => dataContent?.filter((item: AlertsListTypeContent) =>
      item.symbol.toLowerCase().includes(newValue.toLowerCase().trim()))
    );
  };

  const handleShowFavorite = () => {
    if (isFavorite) {
      // if (alertsData) {
      //   setDataContent(alertsData.content);
      // };

      getData();
      return setIsFavorite(() => false);
    }

    // setDataContent((data) => data?.filter(({ favorite }) => favorite));
    getData(0, 'true');
    setIsFavorite(() => true);
  };

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

  const handleEditData = async (editedData: any) => {
    try {
      const updatedData = await client.patch<any>('/api/alert/', editedData);

      if (updatedData.error === 'undefined') {
        return toast.error('Something went wrong');
      }
        // getData();
        // setDataContent(() => [...dataContent, editedData]);

      const targetIndex = dataContent.findIndex(item => item.id === updatedData.id);
      const updatedDataArray = dataContent.slice();

      if (targetIndex !== -1) {
        updatedDataArray[targetIndex] = updatedData;
        setDataContent(updatedDataArray);
        toast.success('Updated successfully');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handlePageChange = async(page: number) => {
    // toast.info(page);
    // getData(page);

    try {
      const loadedData = await client.get<AlertsListType>(`/api/alert/list?market=${currentMarket}&page=${page}` + favoriteUrl);

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
    getData();
    getPairsData();
  }, [currentMarket]);

  return (
    <Container fluid className='markets-table my-4'>
      <Row className='align-items-center'>
        <Col className='ms-2 text-center'>
          <div className='markets-table__row header text-center'>{dataContent?.length}</div>
        </Col>

        <Col xs={11}>
          <Stack direction='horizontal' className='align-items-center justify-content-between'>
            <Stack direction='horizontal' gap={3}>
              <Stack direction='horizontal' gap={3} className='alerts-table__inputwrapper'>
                <div />
                <label htmlFor="inputField">
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="5.5" stroke="white"/>
                    <path d="M9 10L13 14" stroke="white"/>
                  </svg>
                </label>
                <input
                  type='text'
                  id="inputField"
                  value={value}
                  onChange={handleInputChange}
                  className='alerts-table__input'
                  style={{textTransform: 'uppercase'}}
                />
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
          <div key={alert.id} className='mt-2' style={{ borderLeft: '1px solid transparent' } }>
            <AlertsTableRow
              data={alert}
              alertsPrice={alertsPrice}
              onDelete={handleAlertDelete}
              onChange={handleEditData}
            />
          </div>
        )}
      </FlipMove>

      <Pagination
        pageSize={alertsData?.pageSize || 0}
        totalRecords={alertsData?.totalRecords || 0}
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
          onUpdate={getData}
          onClose={() => setShowModalAddAlert(false)}
        />
      }
    </Container>
  );
};