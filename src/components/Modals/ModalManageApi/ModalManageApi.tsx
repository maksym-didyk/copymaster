import React, { FC, useState } from 'react';
import './ModalManageApi.scss';
import { Button, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import { ModalManageApiRow } from './ModalManageApiRow/ModalManageApiRow';
import classNames from 'classnames';

interface Props {
  show: boolean,
  onClose: () => void
}

export const ModalManageApi: FC<Props> = ({show, onClose}) => {
  const [currentAction, setCurrentAction] = useState('Add');

  return (
    <Modal show={show} onHide={onClose} data-bs-theme='dark' size='lg' fullscreen='sm-down' centered>
      <Modal.Header closeButton>
        <Modal.Title>Addiction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap={4}>
          <div className='modalmanageapi__switcher'>
            {['Remove', 'Add'].map((item, index) =>
              <p
                key={index}
                className={classNames('markets__switcher w-50 px-5 py-2', { active: item === currentAction })}
                onClick={() => setCurrentAction(item)}
              >
                {item}
              </p>
            )}
          </div>

          <Container fluid>
            <Row className='modalmanageapi__table-row align-items-center mb-4'>
              <Col xs={11}>
                <Row>
                  <Col className='fw-bold'>
                    Egorov
                  </Col>
                  <Col><span style={{color: '#9c9fa4', fontSize: '0.8rem'}}>Market:</span> Binance</Col>
                  <Col>
                    <Stack direction='horizontal' gap={1} className='align-items-center flex-wrap'>
                      <span style={{color: '#9c9fa4', fontSize: '0.8rem'}}>Balance:</span>
                      <span className='text-success fw-bold'>5000</span>
                      USDT
                    </Stack>
                  </Col>
                </Row>
              </Col>
              <Col></Col>
            </Row>
            <div className='modalmanageapi__maxrows'>
              <ModalManageApiRow balance={5000} user={'Egorov'} />
              <ModalManageApiRow balance={10000} user={'Golovan'} />
              <ModalManageApiRow balance={6700} user={'Bovsunovska'} />
              <ModalManageApiRow balance={6700} user={'Didyk'} />
              <ModalManageApiRow balance={6700} user={'Vorobiov'} />
              <ModalManageApiRow balance={6700} user={'Vorobiov'} />
              <ModalManageApiRow balance={6700} user={'Vorobiov'} />
              <ModalManageApiRow balance={6700} user={'Vorobiov'} />
              <ModalManageApiRow balance={6700} user={'Vorobiov'} />
              <ModalManageApiRow balance={6700} user={'Vorobiov'} />
            </div>
          </Container>
        </Stack>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='secondary' className='px-4' onClick={onClose}>Reset changes</Button>
        <Button variant='primary' className='px-5' onClick={onClose}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}