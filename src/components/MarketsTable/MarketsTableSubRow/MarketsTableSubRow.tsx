import React, { FC } from 'react';
import { Col, ProgressBar, Row } from 'react-bootstrap';
// import { useLocalStorage } from '../../../utils/useLocalStorage';

interface Props {
  data: any,
  counterEarning: boolean
};

export const MarketsTableSubRow: FC<Props> = ({ data, counterEarning }) => {
  // const [counterEarning] = useLocalStorage('counterEarning', true);

  const currentSymbolArray = data.symbol.split('/');
  const currentSymbol = counterEarning ? currentSymbolArray[0] : currentSymbolArray[1];
  const dataValue = counterEarning ? data.buyQuantity : data.buyCounterQuantity;

  return (
    <Row>
      <Col><div className='markets-table__row-main--collapsed'></div></Col>
      <Col xs={9}>
        <Row className='markets-table__row subrow mt-1'>
          <Col></Col>
          <Col>{data.nickname}</Col>
          <Col>{data.symbol}</Col>
          <Col>{`${dataValue} ${currentSymbol}`}</Col>
          <Col className='text-success'></Col>
          <Col className='text-danger'></Col>
          <Col className='text-danger'></Col>
          <Col><ProgressBar variant="success" now={100} label={'100%'} data-bs-theme='dark' /></Col>
          <Col>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_541_19518)">
              <path d="M9.66928 3.60107H0.888835C0.712024 3.60107 0.542454 3.5277 0.41743 3.39709C0.292406 3.26649 0.222168 3.08935 0.222168 2.90464C0.222168 2.71994 0.292406 2.5428 0.41743 2.41219C0.542454 2.28159 0.712024 2.20822 0.888835 2.20822H9.66928C9.8073 1.80086 10.0628 1.4482 10.4006 1.19878C10.7384 0.949357 11.1418 0.81543 11.5555 0.81543C11.9692 0.81543 12.3726 0.949357 12.7104 1.19878C13.0482 1.4482 13.3037 1.80086 13.4417 2.20822H15.1111C15.2879 2.20822 15.4574 2.28159 15.5825 2.41219C15.7075 2.5428 15.7777 2.71994 15.7777 2.90464C15.7777 3.08935 15.7075 3.26649 15.5825 3.39709C15.4574 3.5277 15.2879 3.60107 15.1111 3.60107H13.4417C13.3037 4.00843 13.0482 4.36109 12.7104 4.61051C12.3726 4.85993 11.9692 4.99386 11.5555 4.99386C11.1418 4.99386 10.7384 4.85993 10.4006 4.61051C10.0628 4.36109 9.8073 4.00843 9.66928 3.60107ZM15.1111 11.0296C15.2879 11.0296 15.4574 10.9563 15.5825 10.8257C15.7075 10.6951 15.7777 10.5179 15.7777 10.3332C15.7777 10.1485 15.7075 9.97137 15.5825 9.84077C15.4574 9.71016 15.2879 9.63679 15.1111 9.63679H6.33061C6.19259 9.22943 5.93711 8.87677 5.59932 8.62735C5.26153 8.37793 4.85804 8.244 4.44439 8.244C4.03074 8.244 3.62725 8.37793 3.28946 8.62735C2.95167 8.87677 2.69619 9.22943 2.55817 9.63679H0.888835C0.712024 9.63679 0.542454 9.71016 0.41743 9.84077C0.292406 9.97137 0.222168 10.1485 0.222168 10.3332C0.222168 10.5179 0.292406 10.6951 0.41743 10.8257C0.542454 10.9563 0.712024 11.0296 0.888835 11.0296H2.55817C2.69578 11.4374 2.95111 11.7906 3.28895 12.0403C3.62679 12.2901 4.03049 12.4243 4.44439 12.4243C4.85829 12.4243 5.26199 12.2901 5.59983 12.0403C5.93767 11.7906 6.193 11.4374 6.33061 11.0296H15.1111Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_541_19518">
              <rect width="16" height="13" fill="white" transform="translate(0 0.119141)"/>
              </clipPath>
              </defs>
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
  );
};

export default MarketsTableSubRow;
