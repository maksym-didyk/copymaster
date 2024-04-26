import React, { FC, useState } from 'react';
import { Button, Col, Modal, Row, Spinner, Stack } from 'react-bootstrap';

interface Props {
  show: boolean,
  markets: string[],
  onClose: () => void
}

export const ModalAddApi: FC<Props> = ({show, markets, onClose}) => {
  const [valueApiName, setValueApiName] = useState('');
  const [valueMarketPrice, setValueMarketPrice] = useState(0);
  const [value, setValue] = useState<string | number>(0);
  const [valueAlertType, setAlertType] = useState('');
  const [valueFrequency, setValueFrequency] = useState('');
  const [valueComment, setValueComment] = useState('');
  const [checkedTelegram, setCheckedTelegram] = useState(false);

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
              <Col>
                <input
                  type='text'
                  value={valueApiName}
                  size={20}
                  onChange={(event) => setValueApiName(event.target.value)}
                  className='alerts-table__input-modal-coinpair'
                  style={{background: 'transparent', outline: 'none', border: '0'}}
                />
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col>Value</Col>
              <Col className='text-white fw-bold'>
                <div className='alerts-table__inputwrapper-modal'>
                  <input
                    type='text'
                    value={value}
                    size={20}
                    style={{background: 'transparent', outline: 'none', border: '0'}}
                  />
                </div>
              </Col>
            </Row>
          </Stack>
        </Stack>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
      <Button variant='secondary' className='px-4' onClick={() => onClose()}>Decline</Button>
        <Button variant='primary' className='px-4'>Next</Button>
      </Modal.Footer>
    </Modal>
  )
}