import React, { FC, useState } from 'react';
import { Button, Col, Modal, Row, Stack } from 'react-bootstrap';

interface Props {
  show: boolean,
  markets?: string[],
  onClose: () => void
}

export const ModalAddApi: FC<Props> = ({show, markets, onClose}) => {
  const [valueApiName, setValueApiName] = useState('');
  const [valueApiKey, setValueApiKey] = useState('');
  const [valueSecretKey, setValueSecretKey] = useState('');

  return (
    <Modal show={show} onHide={onClose} data-bs-theme='dark' fullscreen='sm-down' centered>
      <Modal.Header closeButton>
        <Modal.Title>Add your control API</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap={3}>
          <Stack direction='vertical' className='calculator' gap={3}>
            <Row className='align-items-center'>
              <Col>API name</Col>
              <Col className='text-white fw-bold'>
                <div className='alerts-table__inputwrapper-modal'>
                  <input
                    type='text'
                    value={valueApiName}
                    size={20}
                    onChange={(event) => setValueApiName(event.target.value)}
                    style={{ background: 'transparent', outline: 'none', border: '0' }}
                  />
                </div>
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col>API key</Col>
              <Col className='text-white fw-bold'>
                <div className='alerts-table__inputwrapper-modal'>
                  <input
                    type='text'
                    value={valueApiKey}
                    size={20}
                    style={{ background: 'transparent', outline: 'none', border: '0' }}
                    onChange={(event) => setValueApiKey(event.target.value)}
                  />
                </div>
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col>Secret key</Col>
              <Col className='text-white fw-bold'>
                <div className='alerts-table__inputwrapper-modal'>
                  <input
                    type='password'
                    value={valueSecretKey}
                    size={20}
                    style={{ background: 'transparent', outline: 'none', border: '0' }}
                    onChange={(event) => setValueSecretKey(event.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Stack>
        </Stack>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='secondary' className='px-4' onClick={() => onClose()}>Decline</Button>
        <Button variant='primary' className='px-4'>Add API</Button>
      </Modal.Footer>
    </Modal>
  )
}