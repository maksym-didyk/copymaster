import React from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

export const Alerts = () => {

  return (
    <Container fluid className='markets-table my-4'>
      <Row className='align-items-center'>
        <Col className='ms-2 text-center'>
          <div className='markets-table__row header text-center'>{'6'}</div>
        </Col>

        <Col xs={11}>
          <Stack direction='horizontal' className='align-items-center justify-content-between'>
            <Stack direction='horizontal' gap={3}>
              <input type='text' />

              <button className='header__button header__button--fill fw-bold'>Add alert</button>
            </Stack>

            <div style={{cursor: 'pointer'}}>
                Favorite pairs

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
            </div>
          </Stack>
        </Col>
      </Row>

    {/* {dataKeys.map((key) => 
      <MarketsTableRows 
        key={key}
        data={tableData[key]}
        counterEarning={counterEarning} 
        tabType={tabType}
        marketPrice={marketPrice}
      />)} */}
  </Container>
  );
};