import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import classNames from 'classnames';
import { CustomSelect } from '../../CustomSelect';
import { toast } from 'react-toastify';
import { client } from '../../../api/fetchClient';
import { AlertsListTypeContent } from '../../../types/types';

interface Props {
  show: boolean,
  onClose: () => void,
  markets: string[],
  currentMarket: string,
  onUpdate: () => Promise<any>,
}

export const ModalAddAlert: FC<Props> = ({show, onClose, markets, currentMarket, onUpdate}) => {
  const [valueCoinPair, setValueCoinPair] = useState('XRP_USDT');
  const [value, setValue] = useState(0.56);
  const [valueComment, setValueComment] = useState('');
  const [checkedTelegram, setCheckedTelegram] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(+newValue);
  };

  const handleAddAlert = async () => {
    const newAlert = {
      market: currentMarket,
      symbol: valueCoinPair,
      price: value,
      type: 'PRICE_REACHES',
      comment: valueComment,
      favorite: false,
      sendToTelegram: checkedTelegram
    }
    try {
      const loadedData: AlertsListTypeContent = await client.post('/api/alert/', newAlert);

      if (loadedData.error !== undefined) {
        return toast.error(loadedData.error);
      } else {
        onUpdate();
        toast.success('Alert added');
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} data-bs-theme='dark' fullscreen='sm-down' centered>
      <Modal.Header closeButton>
        <Modal.Title>Add notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap={3}>
          <div className='markets__spot'>
            {markets.map((market, index) =>
              <span key={index} style={{padding: '0.5rem 2rem', fontSize: '0.9rem'}} className={classNames('markets__switcher', {
                active: market === currentMarket,
              })}>{capitalizeFirstLetter(market)}</span>
            )}
          </div>
          <Stack direction='vertical' className='calculator'>
            <Row className='align-items-center'>
              <Col>Coin pair:</Col>
              <Col>
                <input
                  type='text'
                  value={valueCoinPair}
                  onChange={(event) => setValueCoinPair(event.target.value)}
                  size={8}
                />
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col>Market price</Col>
              <Col className='text-white fw-bold'>0.57 USDT</Col>
            </Row>

            <Row className='align-items-center'>
              <Col><CustomSelect data={['Price reaches','Price rises above','Price drops to']} title={'Alert type '} /></Col>
              <Col><CustomSelect data={['Only once','Always']} title={'Frequency '} /></Col>
            </Row>

            <Row className='align-items-center'>
              <Col>Value</Col>
              <Col className='text-white fw-bold'>
                <input
                  type='text'
                  value={value}
                  onChange={handleInputChange}
                  size={5}
                />
                USDT
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col>Comment</Col>
              <Col className='text-white fw-bold'>
                <textarea
                  value={valueComment}
                  onChange={event => setValueComment(event.target.value)}
                  rows={4}>
                </textarea>
              </Col>
            </Row>

            <Row>
              <Col></Col>
              <Col>
                <Form.Switch
                  label="Send also to Telegram"
                  onChange={event => setCheckedTelegram(event.target.checked)} checked={checkedTelegram}
                />
              </Col>
            </Row>
          </Stack>
        </Stack>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='primary' onClick={handleAddAlert} className='px-5'>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}