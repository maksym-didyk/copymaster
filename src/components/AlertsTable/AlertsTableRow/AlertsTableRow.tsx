import React, { FC, useState } from 'react';
import { Button, Col, Modal, Row, Stack } from 'react-bootstrap';
import { AlertsTableInput } from '../AlertsTableInput/AlertsTableInput';
import { AlertsListTypeContent } from '../../../types/types';
import { AlertsTableInputAlertPrice } from '../AlertsTableInputAlertPrice/AlertsTableInputAlertPrice';
import classNames from 'classnames';

interface Props {
  data: AlertsListTypeContent,
  marketPrice: number,
  isRed?: boolean,
  onDelete: (id: number) => void,
  onChange: (editedData: any) => void
}

export const AlertsTableRow: FC<Props> = ({ data, marketPrice, isRed = false, onDelete, onChange }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [valueComment, setValueComment] = useState(data.comment);

  const handleEditCommentData = (value: string) => {
    if (data.comment !== value) {
      const editedData = {
        id: data.id,
        comment: value
      }

      onChange(editedData);
    }
  };

  const handleEditAlertsPriceData = (value: number) => {
    if (data.price !== value) {
      const editedData = {
        id: data.id,
        price: value
      }

      onChange(editedData);
    }
  };

  const handleEditBooleanData = (editKey: string) => {
    const propertyValue = data[editKey as keyof AlertsListTypeContent];

    const editedData = {
      id: data.id,
      [editKey]: !propertyValue
    }

    onChange(editedData);
  };

  return (
    <div style={{border: isRed ? '1px solid red': ''}}>
      <Row className='align-items-center'>
        <Col
          onClick={() => handleEditBooleanData('favorite')}
          style={{ cursor: 'pointer' }}
          className='ms-2'
        >
          {/* <div className={classNames('markets-table__row-main', { open })}> */}
          <div className={classNames('markets-table__row-main')}>
            <div className={classNames('markets-table__status', { 
              favorite: true, // need to add logic of state
              'markets-table__status--deep-blue': data.favorite === true,
              })}></div>
          </div>
        </Col>
        <Col xs={11}>
          <Row className='markets-table__row'>
            <Col>
              <Stack direction='horizontal' gap={3}>
                <div style={{ width: '0.3rem', height: '0.3rem', borderRadius: '50%', backgroundColor: data.executed ? '#ff363a' : 'transparent' }} />
                <div style={{ width: '5rem' }}>{data.symbol}</div>
              </Stack>
            </Col>
            <Col xs={2}><span style={{color: '#9c9fa4', fontSize: '0.65rem'}}>Market Price:</span> <span className='fw-bold'>{marketPrice}</span></Col>
            <Col xs={2} >
              <Stack direction='horizontal' gap={1} className='align-items-center'>
                <span style={{color: '#9c9fa4', fontSize: '0.65rem'}}>Alert Price:</span>
                <AlertsTableInputAlertPrice inputValue={data.price} handler={handleEditAlertsPriceData} />
              </Stack>
            </Col>
            <Col xs={3}>
              <AlertsTableInput inputValue={data.comment} placeHolder='Type comment' handler={handleEditCommentData} />
            </Col>
            <Col xs={3}>
              <Stack direction='horizontal'>
                <button className='alerts-table__icon'>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.49933 1L7.49895 13.9983" stroke="#8997DC" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M13.9993 7.49805L1.00103 7.49842" stroke="#8997DC" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                <button className='alerts-table__icon'>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10.166" y="4.5" width="5.83333" height="7" rx="1" fill="#8997DC"/>
                    <rect x="12.5" y="3.33398" width="1.16667" height="9.33333" rx="0.583333" fill="#8997DC"/>
                    <rect x="4.33398" y="1" width="1.16667" height="3" rx="0.583333" fill="#8997DC"/>
                    <rect x="4.33398" y="13.9961" width="1.16667" height="3" rx="0.583333" fill="#8997DC"/>
                    <rect x="2.5" y="3.83398" width="4.83333" height="10.6667" rx="0.5" stroke="#8997DC"/>
                  </svg>
                </button>

                <button className='alerts-table__icon' onClick={() => handleEditBooleanData('sendToTelegram')}>
                  {data.sendToTelegram
                    ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3315_2663)">
                        <path d="M9.00701 18.014C13.9815 18.014 18.014 13.9815 18.014 9.00701C18.014 4.03258 13.9815 0 9.00701 0C4.03258 0 0 4.03258 0 9.00701C0 13.9815 4.03258 18.014 9.00701 18.014Z" fill="#27A5E5"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.06874 8.90939C6.69227 7.75896 8.44598 7.01539 9.32984 6.65062C11.8271 5.61243 12.3462 5.43005 12.6829 5.41602C12.7531 5.41602 12.9214 5.43005 13.0337 5.51422C13.1178 5.58437 13.1459 5.68258 13.1599 5.75273C13.174 5.82287 13.188 5.9772 13.174 6.10347C13.0337 7.52046 12.4584 10.9858 12.1498 12.5711C12.0235 13.2445 11.771 13.469 11.5325 13.4971C11.0134 13.5392 10.6065 13.1463 10.1015 12.8237C9.31581 12.3046 8.86687 11.9819 8.09524 11.4768C7.21137 10.8876 7.78658 10.5649 8.29165 10.0458C8.41792 9.90549 10.7328 7.81508 10.7749 7.61867C10.7749 7.59061 10.7889 7.50643 10.7328 7.46434C10.6767 7.42225 10.6065 7.43628 10.5504 7.45031C10.4662 7.46434 9.20358 8.30612 6.74839 9.96161C6.38362 10.2141 6.06094 10.3264 5.76632 10.3264C5.44364 10.3264 4.82634 10.144 4.36336 9.98967C3.80217 9.80729 3.35323 9.70908 3.39531 9.40043C3.42337 9.2461 3.64785 9.07775 4.06874 8.90939Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_3315_2663">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                    : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3315_2700)">
                        <path d="M9.00701 18.014C13.9815 18.014 18.014 13.9815 18.014 9.00701C18.014 4.03258 13.9815 0 9.00701 0C4.03258 0 0 4.03258 0 9.00701C0 13.9815 4.03258 18.014 9.00701 18.014Z" fill="#323750"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.06874 8.90939C6.69227 7.75896 8.44598 7.01539 9.32984 6.65062C11.8271 5.61243 12.3462 5.43005 12.6829 5.41602C12.7531 5.41602 12.9214 5.43005 13.0337 5.51422C13.1178 5.58437 13.1459 5.68258 13.1599 5.75273C13.174 5.82287 13.188 5.9772 13.174 6.10347C13.0337 7.52046 12.4584 10.9858 12.1498 12.5711C12.0235 13.2445 11.771 13.469 11.5325 13.4971C11.0134 13.5392 10.6065 13.1463 10.1015 12.8237C9.31581 12.3046 8.86687 11.9819 8.09524 11.4768C7.21137 10.8876 7.78658 10.5649 8.29165 10.0458C8.41792 9.90549 10.7328 7.81508 10.7749 7.61867C10.7749 7.59061 10.7889 7.50643 10.7328 7.46434C10.6767 7.42225 10.6065 7.43628 10.5504 7.45031C10.4662 7.46434 9.20358 8.30612 6.74839 9.96161C6.38362 10.2141 6.06094 10.3264 5.76632 10.3264C5.44364 10.3264 4.82634 10.144 4.36336 9.98967C3.80217 9.80729 3.35323 9.70908 3.39531 9.40043C3.42337 9.2461 3.64785 9.07775 4.06874 8.90939Z" fill="#8997DC"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_3315_2700">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                  }
                </button>

                <button className='alerts-table__icon' onClick={() => setShowConfirmModal(true)}>
                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.75592 0.234315C9.59964 0.0842854 9.38768 0 9.16667 0H5.83333C5.61232 0 5.40036 0.0842854 5.24408 0.234315C5.0878 0.384344 5 0.587827 5 0.8C5 1.01217 5.0878 1.21566 5.24408 1.36569C5.40036 1.51571 5.61232 1.6 5.83333 1.6H9.16667C9.38768 1.6 9.59964 1.51571 9.75592 1.36569C9.9122 1.21566 10 1.01217 10 0.8C10 0.587827 9.9122 0.384344 9.75592 0.234315Z" fill="#545D88"/>
                    <path d="M14.1667 2.4C14.3877 2.4 14.5996 2.48429 14.7559 2.63431C14.9122 2.78434 15 2.98783 15 3.2C15 3.41217 14.9122 3.61566 14.7559 3.76569C14.5996 3.91571 14.3877 4 14.1667 4H13.3333L13.3308 4.0568L12.5533 14.5136C12.5234 14.9173 12.3352 15.2951 12.0268 15.5709C11.7183 15.8467 11.3124 16 10.8908 16H4.10833C3.68678 16 3.28089 15.8467 2.9724 15.5709C2.66392 15.2951 2.47576 14.9173 2.44583 14.5136L1.66833 4.0576C1.66707 4.03842 1.66651 4.01921 1.66667 4H0.833333C0.61232 4 0.400358 3.91571 0.244078 3.76569C0.0877973 3.61566 0 3.41217 0 3.2C0 2.98783 0.0877973 2.78434 0.244078 2.63431C0.400358 2.48429 0.61232 2.4 0.833333 2.4H14.1667Z" fill="#545D88"/>
                  </svg>
                </button>

                <button className={`alerts-table__icon ${data.active ? 'text-success' : 'text-danger'}`} onClick={() => handleEditBooleanData('active')}>
                  {data.active ? 'ON' : 'OFF'}
                </button>
              </Stack>
            </Col>
            <Col>
              {data.id}
              <button style={{ backgroundColor: 'transparent' }}>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.21913 9.02391L0.299756 1.62469C-0.224054 0.969931 0.242119 -8.9938e-07 1.08063 -8.62727e-07L12.9194 -3.45239e-07C13.7579 -3.08587e-07 14.2241 0.969932 13.7002 1.6247L7.78087 9.02391C7.38054 9.52432 6.61946 9.52432 6.21913 9.02391Z" fill="#9C9FA4"/>
                </svg>
              </button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} data-bs-theme='dark' fullscreen='sm-down' centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this alert?
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='secondary' className='px-5' onClick={() => setShowConfirmModal(false)}>No</Button>
          <Button variant='primary' className='px-5' onClick={() => onDelete(data.id)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};