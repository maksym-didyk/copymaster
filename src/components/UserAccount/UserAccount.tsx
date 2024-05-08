import React, { useState } from 'react';
import './UserAccount.scss';
import { Col, Collapse, Row, Stack } from 'react-bootstrap';
import { ModalChangeProfilePhoto } from '../Modals/ModalChangeProfilePhoto/ModalChangeProfilePhoto';

export const UserAccount = () => {
  const [isAddedAPIKey, setIsAddedAPIKey] = useState(false);
  const [isAddedSubAccounts, setIsAddedSubAccounts] = useState(false);
  const [openSubAccounts, setOpenSubAccounts] = useState(false);
  const [showModalChangeProfilePhoto, setShowModalChangeProfilePhoto] = useState(false);

  return (
    <main className='account my-5 py-5 px-3 px-md-5'>
      <Stack direction="horizontal" gap={5} className='justify-content-end justify-content-lg-between my-3 flex-wrap'>
        <Stack direction="vertical" gap={3} className='align-items-center'>
          <svg style={{width: '13.1rem', height: '13.1rem'}} viewBox="0 0 263 263" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="131.5" cy="131.5" r="131.5" fill="#3548FE"/>
            <path d="M203 140.563C201.789 151.45 198.046 161.018 191.771 169.266C185.497 177.404 177.24 183.728 167.002 188.237C156.875 192.746 145.206 195 131.995 195C117.574 195 104.97 192.306 94.1813 186.917C83.393 181.528 74.9715 173.995 68.9169 164.317C62.9723 154.639 60 143.367 60 130.5C60 117.633 62.9723 106.361 68.9169 96.6829C74.9715 87.0051 83.393 79.4719 94.1813 74.0831C104.97 68.6944 117.574 66 131.995 66C145.206 66 156.875 68.2545 167.002 72.7634C177.24 77.2724 185.497 83.6509 191.771 91.899C198.046 100.037 201.789 109.55 203 120.437H168.654C167.553 115.159 165.406 110.705 162.214 107.075C159.021 103.336 154.838 100.477 149.664 98.4974C144.6 96.5179 138.711 95.5281 131.995 95.5281C124.289 95.5281 117.629 96.9578 112.015 99.8171C106.401 102.566 102.107 106.581 99.1351 111.859C96.1628 117.028 94.6767 123.242 94.6767 130.5C94.6767 137.758 96.1628 144.027 99.1351 149.306C102.107 154.474 106.401 158.488 112.015 161.348C117.629 164.097 124.289 165.472 131.995 165.472C138.711 165.472 144.6 164.537 149.664 162.668C154.838 160.798 159.021 157.994 162.214 154.254C165.406 150.515 167.553 145.951 168.654 140.563H203Z" fill="white"/>
          </svg>

          <p style={{color: '#8997DC', cursor: 'pointer'}} onClick={() => setShowModalChangeProfilePhoto(true)}>Change profile photo</p>

          {isAddedAPIKey &&
            <div className='account__bgfield text-center'>
              <p>Add Sub-account</p>
              <button className='header__button header__button--fill fw-bold mt-3' onClick={() => setIsAddedSubAccounts(true)}>Add</button>
            </div>
          }
        </Stack>
        <Stack direction="vertical" gap={3}>
          <hr className='account__hr' />
          <h4>
            User Name
            <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.1rem', height: '1.1rem', marginLeft: '0.9rem'}} viewBox="0 0 30 30" fill="none">
              <path d="M10.8633 25.3129H5.62501C5.37637 25.3129 5.13791 25.2141 4.96209 25.0383C4.78628 24.8625 4.68751 24.624 4.68751 24.3754V19.1371C4.68708 19.0154 4.71067 18.8947 4.75692 18.7821C4.80317 18.6695 4.87117 18.5671 4.95704 18.4809L19.0195 4.41835C19.1068 4.32977 19.2108 4.25943 19.3254 4.21141C19.4401 4.1634 19.5632 4.13867 19.6875 4.13867C19.8118 4.13867 19.9349 4.1634 20.0496 4.21141C20.1643 4.25943 20.2682 4.32977 20.3555 4.41835L25.582 9.64492C25.6706 9.73215 25.741 9.83613 25.789 9.95081C25.837 10.0655 25.8617 10.1886 25.8617 10.3129C25.8617 10.4372 25.837 10.5603 25.789 10.675C25.741 10.7896 25.6706 10.8936 25.582 10.9809L11.5195 25.0434C11.4332 25.1292 11.3309 25.1972 11.2183 25.2435C11.1056 25.2897 10.985 25.3133 10.8633 25.3129V25.3129Z" stroke="#BEBFC3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.9375 7.5L22.5 14.0625" stroke="#BEBFC3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </h4>
          <Row>
            <Col>ID:</Col>
            <Col className='account__grey'>1763876</Col>
          </Row>
          <Row>
            <Col>E-mail:</Col>
            <Col className='account__grey'>User@gmail.com</Col>
          </Row>
          <Row>
            <Col>Telegram:</Col>
            <Col className='account__grey'>
              @
              <svg xmlns="http://www.w3.org/2000/svg" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.4rem'}} viewBox="0 0 15 15" fill="none">
                <path d="M5.43164 12.6562H2.8125C2.68818 12.6562 2.56895 12.6068 2.48105 12.5189C2.39314 12.431 2.34375 12.3118 2.34375 12.1874V9.56831C2.34354 9.50744 2.35533 9.44713 2.37846 9.39082C2.40158 9.33452 2.43558 9.28333 2.47852 9.24018L9.50977 2.20893C9.55338 2.16464 9.60538 2.12947 9.66271 2.10546C9.72005 2.08146 9.78159 2.06909 9.84375 2.06909C9.90591 2.06909 9.96745 2.08146 10.0248 2.10546C10.0821 2.12947 10.1341 2.16464 10.1777 2.20893L12.791 4.82221C12.8353 4.86583 12.8705 4.91782 12.8945 4.97516C12.9185 5.0325 12.9309 5.09404 12.9309 5.1562C12.9309 5.21836 12.9185 5.2799 12.8945 5.33724C12.8705 5.39458 12.8353 5.44657 12.791 5.49018L5.75977 12.5214C5.71662 12.5644 5.66543 12.5984 5.60913 12.6215C5.55282 12.6446 5.49251 12.6564 5.43164 12.6562V12.6562Z" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.96875 3.75L11.25 7.03125" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Col>
          </Row>
          <Row>
            <Col>Password:</Col>
            <Col className='account__grey'>
              ************
              <svg xmlns="http://www.w3.org/2000/svg" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.4rem'}} viewBox="0 0 15 15" fill="none">
                <path d="M5.43164 12.6562H2.8125C2.68818 12.6562 2.56895 12.6068 2.48105 12.5189C2.39314 12.431 2.34375 12.3118 2.34375 12.1874V9.56831C2.34354 9.50744 2.35533 9.44713 2.37846 9.39082C2.40158 9.33452 2.43558 9.28333 2.47852 9.24018L9.50977 2.20893C9.55338 2.16464 9.60538 2.12947 9.66271 2.10546C9.72005 2.08146 9.78159 2.06909 9.84375 2.06909C9.90591 2.06909 9.96745 2.08146 10.0248 2.10546C10.0821 2.12947 10.1341 2.16464 10.1777 2.20893L12.791 4.82221C12.8353 4.86583 12.8705 4.91782 12.8945 4.97516C12.9185 5.0325 12.9309 5.09404 12.9309 5.1562C12.9309 5.21836 12.9185 5.2799 12.8945 5.33724C12.8705 5.39458 12.8353 5.44657 12.791 5.49018L5.75977 12.5214C5.71662 12.5644 5.66543 12.5984 5.60913 12.6215C5.55282 12.6446 5.49251 12.6564 5.43164 12.6562V12.6562Z" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.96875 3.75L11.25 7.03125" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Col>
          </Row>
          <Row>
            <Col>Two-factor authentication:</Col>
            <Col style={{color: '#8997DC'}}>Turn ON</Col>
          </Row>

          <hr className='account__hr' />

          {isAddedAPIKey &&
            <>
              <Row>
                <Col>Nikname:</Col>
                <Col className='account__grey text-white'>
                  User.n
                  <svg xmlns="http://www.w3.org/2000/svg" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.4rem'}} viewBox="0 0 15 15" fill="none">
                    <path d="M5.43164 12.6562H2.8125C2.68818 12.6562 2.56895 12.6068 2.48105 12.5189C2.39314 12.431 2.34375 12.3118 2.34375 12.1874V9.56831C2.34354 9.50744 2.35533 9.44713 2.37846 9.39082C2.40158 9.33452 2.43558 9.28333 2.47852 9.24018L9.50977 2.20893C9.55338 2.16464 9.60538 2.12947 9.66271 2.10546C9.72005 2.08146 9.78159 2.06909 9.84375 2.06909C9.90591 2.06909 9.96745 2.08146 10.0248 2.10546C10.0821 2.12947 10.1341 2.16464 10.1777 2.20893L12.791 4.82221C12.8353 4.86583 12.8705 4.91782 12.8945 4.97516C12.9185 5.0325 12.9309 5.09404 12.9309 5.1562C12.9309 5.21836 12.9185 5.2799 12.8945 5.33724C12.8705 5.39458 12.8353 5.44657 12.791 5.49018L5.75977 12.5214C5.71662 12.5644 5.66543 12.5984 5.60913 12.6215C5.55282 12.6446 5.49251 12.6564 5.43164 12.6562V12.6562Z" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.96875 3.75L11.25 7.03125" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Col>
              </Row>
              <Row>
                <Col>KEY:</Col>
                <Col className='account__grey'>
                  ************************************
                  <svg xmlns="http://www.w3.org/2000/svg" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.4rem'}} viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.2614 0.73873L14.5226 0L11.3552 3.16745C10.2798 2.43799 8.9742 1.875 7.50016 1.875C5.60563 1.875 3.99036 2.805 2.7825 3.82313C1.56793 4.84594 0.690964 6.02156 0.260607 6.65625C0.0907859 6.90581 0.000159461 7.19908 0.000159461 7.49906C0.000159461 7.79905 0.0907859 8.09232 0.260607 8.34188C0.690964 8.9775 1.56793 10.1531 2.7825 11.1769C2.88322 11.2618 2.98679 11.3462 3.09313 11.4294L0 14.5226L0.738733 15.2613L15.2614 0.73873ZM4.1032 10.4194L5.91399 8.60859C5.82603 8.49089 5.75216 8.36324 5.69412 8.22812C5.59525 7.99793 5.54429 7.7507 5.54422 7.50095C5.54416 7.25119 5.595 7.00394 5.69375 6.77371C5.79251 6.54348 5.93719 6.33491 6.1193 6.16024C6.30141 5.98558 6.51729 5.84834 6.75425 5.75659C6.99121 5.66484 7.24449 5.62042 7.4992 5.62594C7.88081 5.63421 8.24831 5.75406 8.55639 5.96621L10.3337 4.18885C9.47356 3.64389 8.51727 3.28125 7.50016 3.28125C6.09146 3.28125 4.79848 3.97688 3.7178 4.88906C2.64287 5.79563 1.8491 6.85406 1.45509 7.43625C1.44193 7.45501 1.43488 7.47724 1.43488 7.5C1.43488 7.52276 1.44193 7.54499 1.45509 7.56375C1.84814 8.14688 2.64191 9.20437 3.7178 10.1109C3.84348 10.2169 3.97199 10.32 4.1032 10.4194ZM9.19593 8.28117L8.28775 9.18935C8.48599 9.09563 8.66806 8.96824 8.82477 8.81106C8.98013 8.65524 9.10508 8.47566 9.19593 8.28117ZM7.50016 11.7188C6.98712 11.7188 6.48956 11.6265 6.012 11.4651L4.92544 12.5516C5.70619 12.9006 6.5696 13.125 7.50016 13.125C9.39468 13.125 11.01 12.195 12.2178 11.1769C13.4324 10.1541 14.3094 8.97844 14.7397 8.34281C14.9095 8.09326 15.0002 7.79999 15.0002 7.5C15.0002 7.20001 14.9095 6.90674 14.7397 6.65719C14.4037 6.16089 13.7954 5.33537 12.9667 4.51044L11.9621 5.51499C12.6935 6.24652 13.2396 6.98466 13.5452 7.43625C13.5584 7.45501 13.5654 7.47724 13.5654 7.5C13.5654 7.52276 13.5584 7.54499 13.5452 7.56375C13.1512 8.14594 12.3574 9.20437 11.2825 10.1109C10.2018 11.0231 8.90886 11.7188 7.50016 11.7188Z" fill="#9C9FA4"/>
                  </svg>
                </Col>
              </Row>
              <Row>
                <Col className='text-secondary'>Market:</Col>
                <Col className='account__grey'>Binance</Col>
              </Row>
              <Row>
                <Col className='text-secondary'>Balance:</Col>
                <Col className='text-success'>200 USDT</Col>
              </Row>
              <hr className='account__hr' />
            </>
          }

          {isAddedSubAccounts &&
            <Stack direction="vertical" gap={3}>
              <div
                onClick={() => setOpenSubAccounts(!openSubAccounts)}
                aria-controls='collapse-sub-accounts'
                aria-expanded={openSubAccounts}
                style={{cursor: 'pointer', textAlign: 'center'}}
              >
                <h4>
                  Sub-accounts
                  {' '}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" viewBox="0 0 23 16" fill="none">
                    <path d="M21 2L12.7111 13.3427C12.1119 14.1627 10.8881 14.1627 10.2889 13.3427L2 2" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </h4>
              </div>

              <Collapse in={openSubAccounts}>
                <Stack direction="vertical" gap={3} id='collapse-sub-accounts'>
                  <Row>
                    <Col>Nikname:</Col>
                    <Col className='account__grey text-white'>
                      Investor 1 Greck
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M5.43164 12.6562H2.8125C2.68818 12.6562 2.56895 12.6068 2.48105 12.5189C2.39314 12.431 2.34375 12.3118 2.34375 12.1874V9.56831C2.34354 9.50744 2.35533 9.44713 2.37846 9.39082C2.40158 9.33452 2.43558 9.28333 2.47852 9.24018L9.50977 2.20893C9.55338 2.16464 9.60538 2.12947 9.66271 2.10546C9.72005 2.08146 9.78159 2.06909 9.84375 2.06909C9.90591 2.06909 9.96745 2.08146 10.0248 2.10546C10.0821 2.12947 10.1341 2.16464 10.1777 2.20893L12.791 4.82221C12.8353 4.86583 12.8705 4.91782 12.8945 4.97516C12.9185 5.0325 12.9309 5.09404 12.9309 5.1562C12.9309 5.21836 12.9185 5.2799 12.8945 5.33724C12.8705 5.39458 12.8353 5.44657 12.791 5.49018L5.75977 12.5214C5.71662 12.5644 5.66543 12.5984 5.60913 12.6215C5.55282 12.6446 5.49251 12.6564 5.43164 12.6562V12.6562Z" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.96875 3.75L11.25 7.03125" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Col>
                  </Row>
                  <Row>
                    <Col>KEY:</Col>
                    <Col className='account__grey'>
                      ************************************
                      <svg xmlns="http://www.w3.org/2000/svg" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.4rem'}} viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.2614 0.73873L14.5226 0L11.3552 3.16745C10.2798 2.43799 8.9742 1.875 7.50016 1.875C5.60563 1.875 3.99036 2.805 2.7825 3.82313C1.56793 4.84594 0.690964 6.02156 0.260607 6.65625C0.0907859 6.90581 0.000159461 7.19908 0.000159461 7.49906C0.000159461 7.79905 0.0907859 8.09232 0.260607 8.34188C0.690964 8.9775 1.56793 10.1531 2.7825 11.1769C2.88322 11.2618 2.98679 11.3462 3.09313 11.4294L0 14.5226L0.738733 15.2613L15.2614 0.73873ZM4.1032 10.4194L5.91399 8.60859C5.82603 8.49089 5.75216 8.36324 5.69412 8.22812C5.59525 7.99793 5.54429 7.7507 5.54422 7.50095C5.54416 7.25119 5.595 7.00394 5.69375 6.77371C5.79251 6.54348 5.93719 6.33491 6.1193 6.16024C6.30141 5.98558 6.51729 5.84834 6.75425 5.75659C6.99121 5.66484 7.24449 5.62042 7.4992 5.62594C7.88081 5.63421 8.24831 5.75406 8.55639 5.96621L10.3337 4.18885C9.47356 3.64389 8.51727 3.28125 7.50016 3.28125C6.09146 3.28125 4.79848 3.97688 3.7178 4.88906C2.64287 5.79563 1.8491 6.85406 1.45509 7.43625C1.44193 7.45501 1.43488 7.47724 1.43488 7.5C1.43488 7.52276 1.44193 7.54499 1.45509 7.56375C1.84814 8.14688 2.64191 9.20437 3.7178 10.1109C3.84348 10.2169 3.97199 10.32 4.1032 10.4194ZM9.19593 8.28117L8.28775 9.18935C8.48599 9.09563 8.66806 8.96824 8.82477 8.81106C8.98013 8.65524 9.10508 8.47566 9.19593 8.28117ZM7.50016 11.7188C6.98712 11.7188 6.48956 11.6265 6.012 11.4651L4.92544 12.5516C5.70619 12.9006 6.5696 13.125 7.50016 13.125C9.39468 13.125 11.01 12.195 12.2178 11.1769C13.4324 10.1541 14.3094 8.97844 14.7397 8.34281C14.9095 8.09326 15.0002 7.79999 15.0002 7.5C15.0002 7.20001 14.9095 6.90674 14.7397 6.65719C14.4037 6.16089 13.7954 5.33537 12.9667 4.51044L11.9621 5.51499C12.6935 6.24652 13.2396 6.98466 13.5452 7.43625C13.5584 7.45501 13.5654 7.47724 13.5654 7.5C13.5654 7.52276 13.5584 7.54499 13.5452 7.56375C13.1512 8.14594 12.3574 9.20437 11.2825 10.1109C10.2018 11.0231 8.90886 11.7188 7.50016 11.7188Z" fill="#9C9FA4"/>
                      </svg>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='text-secondary'>Market:</Col>
                    <Col className='account__grey'>Binance</Col>
                  </Row>
                  <Row>
                    <Col className='text-secondary'>Balance:</Col>
                    <Col className='text-success'>13 578 USDT</Col>
                  </Row>
                </Stack>
              </Collapse>
              <hr className='account__hr' />
            </Stack>
          }

          <Stack direction='horizontal' className='account__bgfield'>
            {isAddedAPIKey === true
              ? <>
                  <Stack direction="vertical" gap={3}>
                    <h4>Add API-key to repeat your deals</h4>
                    Press “Add” to start work with API-key
                  </Stack>
                  <button className='header__button header__button--fill fw-bold px-4 py-2'>Add</button>
                </>
              : <>
                  <Stack direction="vertical" gap={3}>
                    <h4>Add API key</h4>
                    Press “Add” to start work with Sub-account
                  </Stack>
                  <button className='header__button header__button--fill fw-bold px-4 py-2' onClick={() => setIsAddedAPIKey(true)}>Add</button>
                </>
            }
          </Stack>
        </Stack>
      </Stack>

      <ModalChangeProfilePhoto onClose={() => setShowModalChangeProfilePhoto(false)} show={showModalChangeProfilePhoto}/>
      {/* <ModalAddApi show={showModalAddApi} onClose={() => setShowModalAddApi(false)} /> */}
    </main>
  );
};