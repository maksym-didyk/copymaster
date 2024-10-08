import classNames from 'classnames';
import React, { FC, useId, useState } from 'react';
import { Col, Collapse, Row, Stack } from 'react-bootstrap';
import { ControlApiSubCard } from '../ControlApiSubCard/ControlApiSubCard';
import { ModalDeleteApi } from '../../Modals/ModalDeleteApi/ModalDeleteApi';
import { ModalAddApi } from '../../Modals/ModalAddApi/ModalAddApi';
import { ModalManageApi } from '../../Modals/ModalManageApi/ModalManageApi';

interface Props {
  data: any,
}

export const ControlApiCard: FC<Props> = ({data}) => {
  const [openRepeatAccounts, setOpenRepeatAccounts] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddApiModal, setShowAddApiModal] = useState(false);
  const [showManageApiModal, setManageApiModal] = useState(false);
  const collapseId = useId();

  return (
    <>
      <Stack direction="vertical" gap={0} className={classNames({ controlapi__cardwrapper: data.hasChild === true })}>
        <Stack direction="horizontal" gap={4} className={classNames('controlapi__card justify-content-between p-4 w-100', { main: data.isMain === true })}>
          {data.isMain
            ? <Row>
              <Col>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.2" cx="6" cy="6" r="6" fill="#36FF6C" />
                  <circle cx="6" cy="6" r="3" fill="#36FF6C" />
                </svg>
                {' '}
                <span style={{ color: '#36FF6C', fontSize: '0.8rem' }}>Active</span>
              </Col>
              <Col>
                <svg style={{ width: '5rem', height: '5rem' }} viewBox="0 0 263 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="131.5" cy="131.5" r="131.5" fill="#3548FE" />
                  <path d="M203 140.563C201.789 151.45 198.046 161.018 191.771 169.266C185.497 177.404 177.24 183.728 167.002 188.237C156.875 192.746 145.206 195 131.995 195C117.574 195 104.97 192.306 94.1813 186.917C83.393 181.528 74.9715 173.995 68.9169 164.317C62.9723 154.639 60 143.367 60 130.5C60 117.633 62.9723 106.361 68.9169 96.6829C74.9715 87.0051 83.393 79.4719 94.1813 74.0831C104.97 68.6944 117.574 66 131.995 66C145.206 66 156.875 68.2545 167.002 72.7634C177.24 77.2724 185.497 83.6509 191.771 91.899C198.046 100.037 201.789 109.55 203 120.437H168.654C167.553 115.159 165.406 110.705 162.214 107.075C159.021 103.336 154.838 100.477 149.664 98.4974C144.6 96.5179 138.711 95.5281 131.995 95.5281C124.289 95.5281 117.629 96.9578 112.015 99.8171C106.401 102.566 102.107 106.581 99.1351 111.859C96.1628 117.028 94.6767 123.242 94.6767 130.5C94.6767 137.758 96.1628 144.027 99.1351 149.306C102.107 154.474 106.401 158.488 112.015 161.348C117.629 164.097 124.289 165.472 131.995 165.472C138.711 165.472 144.6 164.537 149.664 162.668C154.838 160.798 159.021 157.994 162.214 154.254C165.406 150.515 167.553 145.951 168.654 140.563H203Z" fill="white" />
                </svg>
              </Col>
            </Row>
            : <Row>
              <Col></Col>
              <Col>
                <svg style={{ width: '5rem', height: '5rem' }} viewBox="0 0 263 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="131.5" cy="131.5" r="131.5" fill="#3548FE" />
                  <path d="M203 140.563C201.789 151.45 198.046 161.018 191.771 169.266C185.497 177.404 177.24 183.728 167.002 188.237C156.875 192.746 145.206 195 131.995 195C117.574 195 104.97 192.306 94.1813 186.917C83.393 181.528 74.9715 173.995 68.9169 164.317C62.9723 154.639 60 143.367 60 130.5C60 117.633 62.9723 106.361 68.9169 96.6829C74.9715 87.0051 83.393 79.4719 94.1813 74.0831C104.97 68.6944 117.574 66 131.995 66C145.206 66 156.875 68.2545 167.002 72.7634C177.24 77.2724 185.497 83.6509 191.771 91.899C198.046 100.037 201.789 109.55 203 120.437H168.654C167.553 115.159 165.406 110.705 162.214 107.075C159.021 103.336 154.838 100.477 149.664 98.4974C144.6 96.5179 138.711 95.5281 131.995 95.5281C124.289 95.5281 117.629 96.9578 112.015 99.8171C106.401 102.566 102.107 106.581 99.1351 111.859C96.1628 117.028 94.6767 123.242 94.6767 130.5C94.6767 137.758 96.1628 144.027 99.1351 149.306C102.107 154.474 106.401 158.488 112.015 161.348C117.629 164.097 124.289 165.472 131.995 165.472C138.711 165.472 144.6 164.537 149.664 162.668C154.838 160.798 159.021 157.994 162.214 154.254C165.406 150.515 167.553 145.951 168.654 140.563H203Z" fill="white" />
                </svg>
              </Col>
            </Row>}

          <Stack direction="vertical" gap={2}>
            <Row>
              <Col>API name</Col>
              <Col className='account__grey text-white'>
                {data.name}
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.4rem' }} viewBox="0 0 15 15" fill="none">
                  <path d="M5.43164 12.6562H2.8125C2.68818 12.6562 2.56895 12.6068 2.48105 12.5189C2.39314 12.431 2.34375 12.3118 2.34375 12.1874V9.56831C2.34354 9.50744 2.35533 9.44713 2.37846 9.39082C2.40158 9.33452 2.43558 9.28333 2.47852 9.24018L9.50977 2.20893C9.55338 2.16464 9.60538 2.12947 9.66271 2.10546C9.72005 2.08146 9.78159 2.06909 9.84375 2.06909C9.90591 2.06909 9.96745 2.08146 10.0248 2.10546C10.0821 2.12947 10.1341 2.16464 10.1777 2.20893L12.791 4.82221C12.8353 4.86583 12.8705 4.91782 12.8945 4.97516C12.9185 5.0325 12.9309 5.09404 12.9309 5.1562C12.9309 5.21836 12.9185 5.2799 12.8945 5.33724C12.8705 5.39458 12.8353 5.44657 12.791 5.49018L5.75977 12.5214C5.71662 12.5644 5.66543 12.5984 5.60913 12.6215C5.55282 12.6446 5.49251 12.6564 5.43164 12.6562V12.6562Z" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.96875 3.75L11.25 7.03125" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Col>
            </Row>
            <Row>
              <Col>API key</Col>
              <Col className='account__grey text-white'>
                {data.key}
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.4rem' }} viewBox="0 0 15 15" fill="none">
                  <path d="M5.43164 12.6562H2.8125C2.68818 12.6562 2.56895 12.6068 2.48105 12.5189C2.39314 12.431 2.34375 12.3118 2.34375 12.1874V9.56831C2.34354 9.50744 2.35533 9.44713 2.37846 9.39082C2.40158 9.33452 2.43558 9.28333 2.47852 9.24018L9.50977 2.20893C9.55338 2.16464 9.60538 2.12947 9.66271 2.10546C9.72005 2.08146 9.78159 2.06909 9.84375 2.06909C9.90591 2.06909 9.96745 2.08146 10.0248 2.10546C10.0821 2.12947 10.1341 2.16464 10.1777 2.20893L12.791 4.82221C12.8353 4.86583 12.8705 4.91782 12.8945 4.97516C12.9185 5.0325 12.9309 5.09404 12.9309 5.1562C12.9309 5.21836 12.9185 5.2799 12.8945 5.33724C12.8705 5.39458 12.8353 5.44657 12.791 5.49018L5.75977 12.5214C5.71662 12.5644 5.66543 12.5984 5.60913 12.6215C5.55282 12.6446 5.49251 12.6564 5.43164 12.6562V12.6562Z" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.96875 3.75L11.25 7.03125" stroke="#BEBFC3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Col>
            </Row>
            <Row>
              <Col>Market</Col>
              <Col className='account__grey text-white'>{data.market}</Col>
            </Row>
            <Row>
              <Col>Balance</Col>
              <Col className='text-success'>{data.balance} USDT</Col>
            </Row>
          </Stack>

          <Stack direction="vertical" className='justify-content-around align-items-end'>
            <button className='alerts-table__icon' onClick={() => setShowConfirmModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <path d="M3.00728 3.85H15.039L15.001 4.70556L14.9987 4.75774L14.0668 17.16L14.0668 17.1602C14.0509 17.3717 13.9507 17.5811 13.7695 17.7415C13.5868 17.9031 13.3371 18 13.069 18H4.93C4.66195 18 4.41221 17.9031 4.22952 17.7415C4.04827 17.5811 3.94806 17.3717 3.9322 17.1602L3.93219 17.16L3 4.75424L3.00728 3.85Z" fill="white" stroke="white" strokeWidth="2" />
              </svg>
            </button>

            <button className='alerts-table__icon' onClick={() => setManageApiModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                <g clipPath="url(#clip0_832_3152)">
                  <path d="M10.878 3.74992H1C0.801088 3.74992 0.610322 3.6709 0.46967 3.53025C0.329018 3.3896 0.25 3.19884 0.25 2.99992C0.25 2.80101 0.329018 2.61024 0.46967 2.46959C0.610322 2.32894 0.801088 2.24992 1 2.24992H10.878C11.0333 1.81123 11.3207 1.43145 11.7007 1.16284C12.0807 0.894229 12.5346 0.75 13 0.75C13.4654 0.75 13.9193 0.894229 14.2993 1.16284C14.6793 1.43145 14.9667 1.81123 15.122 2.24992H17C17.1989 2.24992 17.3897 2.32894 17.5303 2.46959C17.671 2.61024 17.75 2.80101 17.75 2.99992C17.75 3.19884 17.671 3.3896 17.5303 3.53025C17.3897 3.6709 17.1989 3.74992 17 3.74992H15.122C14.9667 4.18861 14.6793 4.5684 14.2993 4.83701C13.9193 5.10562 13.4654 5.24985 13 5.24985C12.5346 5.24985 12.0807 5.10562 11.7007 4.83701C11.3207 4.5684 11.0333 4.18861 10.878 3.74992ZM17 11.7499C17.1989 11.7499 17.3897 11.6709 17.5303 11.5303C17.671 11.3896 17.75 11.1988 17.75 10.9999C17.75 10.801 17.671 10.6102 17.5303 10.4696C17.3897 10.3289 17.1989 10.2499 17 10.2499H7.122C6.96673 9.81123 6.67931 9.43145 6.29929 9.16284C5.91928 8.89423 5.46536 8.75 5 8.75C4.53464 8.75 4.08072 8.89423 3.70071 9.16284C3.32069 9.43145 3.03327 9.81123 2.878 10.2499H1C0.801088 10.2499 0.610322 10.3289 0.46967 10.4696C0.329018 10.6102 0.25 10.801 0.25 10.9999C0.25 11.1988 0.329018 11.3896 0.46967 11.5303C0.610322 11.6709 0.801088 11.7499 1 11.7499H2.878C3.03281 12.1891 3.32006 12.5694 3.70013 12.8384C4.0802 13.1074 4.53436 13.2518 5 13.2518C5.46564 13.2518 5.9198 13.1074 6.29987 12.8384C6.67994 12.5694 6.96719 12.1891 7.122 11.7499H17Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_832_3152">
                    <rect width="18" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button className='alerts-table__icon' onClick={() => setShowAddApiModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M8.99951 2L8.99911 15.9986" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M15.9995 9L2.00088 9.00041" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </Stack>
        </Stack>

        {data.hasChild &&
          <div
            onClick={() => setOpenRepeatAccounts(!openRepeatAccounts)}
            aria-controls={collapseId}
            aria-expanded={openRepeatAccounts}
            style={{ minHeight: '1.1rem', cursor: 'pointer' }}
          >
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '1.1rem', cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" viewBox="0 0 23 16" fill="none">
                <path d="M21 2L12.7111 13.3427C12.1119 14.1627 10.8881 14.1627 10.2889 13.3427L2 2" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            <Collapse in={openRepeatAccounts}>
              <Stack direction="vertical" gap={5} id={collapseId} className='my-5'>
                <ControlApiSubCard />
                <ControlApiSubCard />
                <ControlApiSubCard />
                <ControlApiSubCard />
              </Stack>
            </Collapse>
          </div>}
      </Stack>
      
      {showConfirmModal &&
        <ModalDeleteApi show={showConfirmModal} onClose={() => setShowConfirmModal(false)} />
      }

      {showAddApiModal &&
        <ModalAddApi
          show={showAddApiModal}
          onClose={() => setShowAddApiModal(false)}
          handler={() => setShowAddApiModal(false)}
        />
      }

      {showManageApiModal &&
        <ModalManageApi show={showManageApiModal} onClose={() => setManageApiModal(false)} />
      }
    </>
  );
};