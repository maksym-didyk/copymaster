import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import classNames from 'classnames';
import { CustomSelect } from '../../CustomSelect';
import { toast } from 'react-toastify';
import { client } from '../../../api/fetchClient';
import { AlertsListTypeContent } from '../../../types/types';

interface Props {
  show: boolean,
  markets: string[],
  currentMarket: string,
  pairsData: string[],
  alertsPrice: any,
  onClose: () => void,
  onUpdate: () => Promise<any>
}

export const ModalAddAlert: FC<Props> = ({show, markets, currentMarket, pairsData, alertsPrice, onClose, onUpdate}) => {
  const [valueCoinPair, setValueCoinPair] = useState('');
  const [valueMarketPrice, setValueMarketPrice] = useState(0);
  const [value, setValue] = useState<string | number>(0);
  const [valueAlertType, setAlertType] = useState('PRICE_REACHES');
  const [valueFrequency, setValueFrequency] = useState('ONLY_ONCE');
  const [valueComment, setValueComment] = useState('');
  const [checkedTelegram, setCheckedTelegram] = useState(false);

  const currency = valueCoinPair.split('_')[1];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // Заміна коми на крапку
    newValue = newValue.replace(/,/g, '.');

    // Обмеження 8 цифр після крапки
    const [integerPart, decimalPart] = newValue.split('.');
    if (decimalPart && decimalPart.length > 8) {
      newValue = `${integerPart}.${decimalPart.slice(0, 8)}`;
    }

    // Дозволяємо вводити тільки цифри та один раз крапку
    newValue = newValue.replace(/[^\d.]/g, '');

    // Додаємо додаткову перевірку для запобігання більше ніж одній крапці
    const dotCount = newValue.split('.').length - 1;
    if (dotCount > 1) {
      const lastDotIndex = newValue.lastIndexOf('.');
      newValue = newValue.slice(0, lastDotIndex) + newValue.slice(lastDotIndex + 1);
    }

    setValue(newValue);
  };

  const handleAlertTypeChange = (alertType: string) => {
    setAlertType(() => alertType);
  }

  const handleAddAlert = async () => {
    const isCoinPairOk = pairsData.indexOf(valueCoinPair);

    if (isCoinPairOk === -1) {
      return toast.error('Coin pair incorrect. Choose again');
    }

    const newAlert = {
      market: currentMarket,
      symbol: valueCoinPair,
      price: value,
      type: valueAlertType,
      informing: valueFrequency,
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
        onClose();
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(()=> {
    if (valueCoinPair && alertsPrice.hasOwnProperty(valueCoinPair)) {
        setValueMarketPrice(alertsPrice[valueCoinPair]);
    }
  }, [alertsPrice, valueCoinPair]);

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

          <Stack direction='vertical' className='calculator' gap={3}>
            <Row className='align-items-center'>
              <Col>Coin pair:</Col>
              <Col>
                <input
                  list="coinpairs"
                  value={valueCoinPair}
                  placeholder='Choose pair'
                  onChange={(event) => setValueCoinPair(event.target.value)}
                  className='alerts-table__input-modal-coinpair'
                />
                <datalist id="coinpairs">
                {pairsData.map((pair) =>
                  <option key={pair} value={pair} />
                )}
                </datalist>
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col>Market price</Col>
              <Col className='text-white fw-bold'>{valueMarketPrice} {currency}</Col>
            </Row>

            <Row className='align-items-center'>
              <Col>
                <CustomSelect
                  data={['PRICE_REACHES', 'PRICE_RISES_ABOVE', 'PRICE_DROPS_BELOW']}
                  title={'Alert type '}
                  value={valueAlertType}
                  handler={handleAlertTypeChange} 
                />
              </Col>
              <Col>
                <CustomSelect
                  data={['ONLY_ONCE', 'ALWAYS']}
                  title={'Frequency '}
                  value={valueFrequency}
                  handler={setValueFrequency}
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
                    onChange={handleInputChange}
                    size={5}
                    style={{background: 'transparent', outline: 'none', border: '0'}}
                  />
                  {currency}
                </div>
              </Col>
            </Row>

            <Row className='align-items-center'>
              {/* <Col>Comment</Col> */}
              <Col className=''>
                <p className='mb-2'>Comment</p>
                <div>
                  <textarea
                    value={valueComment}
                    onChange={event => setValueComment(event.target.value)}
                    rows={3}
                    className='alerts-table__input-comment'
                    style={{border: '1px solid #3E435D', resize: 'none'}}
                  >
                  </textarea>
                </div>

              </Col>
            </Row>

            <Row>
              <Col>
                <Stack direction='horizontal' gap={1}>
                  <Form.Switch
                    label="Send also to Telegram"
                    onChange={event => setCheckedTelegram(event.target.checked)}
                    checked={checkedTelegram}
                  />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3315_3346)">
                    <path d="M12.0094 24.0187C18.6419 24.0187 24.0187 18.6419 24.0187 12.0094C24.0187 5.37677 18.6419 0 12.0094 0C5.37677 0 0 5.37677 0 12.0094C0 18.6419 5.37677 24.0187 12.0094 24.0187Z" fill="#27A5E5"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.42498 11.8785C8.92303 10.3446 11.2613 9.35321 12.4398 8.86685C15.7695 7.48259 16.4616 7.23941 16.9106 7.2207C17.0041 7.2207 17.2286 7.23941 17.3782 7.35165C17.4905 7.44518 17.5279 7.57612 17.5466 7.66965C17.5653 7.76318 17.584 7.96895 17.5653 8.13731C17.3782 10.0266 16.6113 14.647 16.1997 16.7608C16.0314 17.6587 15.6947 17.958 15.3767 17.9954C14.6845 18.0516 14.142 17.5278 13.4686 17.0976C12.4211 16.4054 11.8225 15.9752 10.7936 15.3018C9.61516 14.5161 10.3821 14.0859 11.0555 13.3937C11.2239 13.2067 14.3104 10.4195 14.3665 10.1576C14.3665 10.1202 14.3852 10.0079 14.3104 9.9518C14.2356 9.89568 14.142 9.91439 14.0672 9.9331C13.955 9.9518 12.2714 11.0742 8.99786 13.2815C8.5115 13.6182 8.08126 13.7679 7.68843 13.7679C7.25818 13.7679 6.43511 13.5247 5.81781 13.3189C5.06956 13.0757 4.47097 12.9448 4.52709 12.5333C4.5645 12.3275 4.8638 12.103 5.42498 11.8785Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_3315_3346">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </Stack>
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