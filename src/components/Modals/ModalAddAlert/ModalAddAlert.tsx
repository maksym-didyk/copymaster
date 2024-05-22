import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Col, Form, Modal, Row, Spinner, Stack } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import classNames from 'classnames';
import { CustomSelect } from '../../CustomSelect';
import { toast } from 'react-toastify';
import { client } from '../../../api/fetchClient';
import { AlertsListTypeContent, SymbolType } from '../../../types/types';

interface Props {
  show: boolean,
  markets: string[],
  currentMarket: string,
  pairsData: SymbolType[],
  alertsPrice: any,
  onClose: () => void,
  onAdd: (newAlert: AlertsListTypeContent) => void
}

export const ModalAddAlert: FC<Props> = ({show, markets, currentMarket, pairsData, alertsPrice, onClose, onAdd}) => {
  const [valueCoinPair, setValueCoinPair] = useState('');
  const [valueMarketPrice, setValueMarketPrice] = useState(0);
  const [value, setValue] = useState<string | number>(0);
  const [valueAlertType, setAlertType] = useState('');
  const [valueFrequency, setValueFrequency] = useState('');
  const [valueComment, setValueComment] = useState('');
  const [checkedTelegram, setCheckedTelegram] = useState(false);
  const [counterRound, setCounterRound] = useState(8);

  const currency = valueCoinPair.split('/')[1];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // Заміна коми на крапку
    newValue = newValue.replace(/,/g, '.');

    // Обмеження цифр після крапки
    const [integerPart, decimalPart] = newValue.split('.');
    if (decimalPart && decimalPart.length > counterRound) {
      newValue = `${integerPart}.${decimalPart.slice(0, counterRound)}`;
    }

    // Дозволяємо вводити тільки цифри та один раз крапку
    newValue = newValue.replace(/[^\d.]/g, '');

    // Додаємо додаткову перевірку для запобігання більше ніж одній крапці
    const dotCount = newValue.split('.').length - 1;
    if (dotCount > 1) {
      const lastDotIndex = newValue.lastIndexOf('.');
      newValue = newValue.slice(0, lastDotIndex) + newValue.slice(lastDotIndex + 1);
    };

    setValue(newValue);
  };

  const handleAlertTypeChange = (alertType: string) => {
    setAlertType(() => alertType);
  }

  const handleAddAlert = async () => {
    const valueCoinPairFormatted = valueCoinPair.replace('/', '_');
    // const isCoinPairOk = pairsData.indexOf(valueCoinPairFormatted);
    const isCoinPairOk = pairsData.some(pair => pair.name === valueCoinPairFormatted);

    if (!isCoinPairOk) {
      return toast.error('Coin pair incorrect. Choose again');
    };

    if (!valueAlertType) {
      return toast.error('Choose alert type');
    };

    if (!valueFrequency) {
      return toast.error('Choose frequency');
    };

    const newAlert = {
      market: currentMarket,
      symbol: valueCoinPairFormatted,
      price: value,
      type: valueAlertType,
      informing: valueFrequency,
      comment: valueComment,
      favorite: false,
      sendToTelegram: checkedTelegram,
      active: true
    };

    try {
      const loadedData: AlertsListTypeContent = await client.post('/api/alert/', newAlert);

      if (loadedData.error) {
        return toast.error(loadedData.error);
      };

        onAdd(loadedData);
        toast.success('Alert added');
        onClose();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleSelectCoinPair = (event: ChangeEvent<HTMLInputElement>)=> {
    const newValue = event.target.value;
    const valueCoinPairFormatted = newValue.replace('/', '_');
    const findCoinPair = pairsData.find(pair => pair.name === valueCoinPairFormatted);

    if (findCoinPair !== undefined) {
      setCounterRound(() => findCoinPair.counterRound);
    };

    if (alertsPrice.hasOwnProperty(valueCoinPairFormatted)) {
      return setValueMarketPrice(alertsPrice[valueCoinPairFormatted]);
    };

    setValueMarketPrice(0);
  };

    // useEffect(()=> {
    //   const valueCoinPairFormatted = valueCoinPair.replace('/', '_');

    //   if (valueCoinPair && alertsPrice.hasOwnProperty(valueCoinPairFormatted)) {
    //       return setValueMarketPrice(alertsPrice[valueCoinPairFormatted]);
    //   };

    //   setValueMarketPrice(0);
    // }, [alertsPrice, valueCoinPair]);

  return (
    <Modal show={show} onHide={onClose} data-bs-theme='dark' fullscreen='sm-down' centered >
      <Modal.Header closeButton>
        <Modal.Title>Add notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap={3}>
          <div className='markets__spot'>
            {markets.map((market, index) =>
              <span key={index} style={{padding: '0.5rem 2rem', fontSize: '0.9rem'}} className={classNames('markets__switcher nocursor', {
                active: market === currentMarket,
              })}>{capitalizeFirstLetter(market)}</span>
            )}

            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none">
              <path d="M2.90894 23.668C2.24227 23.668 1.68498 23.4388 1.23706 22.9805C0.789144 22.5117 0.565186 21.8919 0.565186 21.1211C0.565186 20.3503 0.789144 19.7357 1.23706 19.2773C1.68498 18.8086 2.24227 18.5742 2.90894 18.5742C3.5756 18.5742 4.13289 18.8086 4.58081 19.2773C5.02873 19.7357 5.25269 20.3503 5.25269 21.1211C5.25269 21.8919 5.02873 22.5117 4.58081 22.9805C4.13289 23.4388 3.5756 23.668 2.90894 23.668Z" fill="#9C9FA4"/>
              <path d="M2.90894 14.3867C2.24227 14.3867 1.68498 14.1576 1.23706 13.6992C0.789144 13.2305 0.565186 12.6107 0.565186 11.8398C0.565186 11.069 0.789144 10.4544 1.23706 9.99609C1.68498 9.52734 2.24227 9.29297 2.90894 9.29297C3.5756 9.29297 4.13289 9.52734 4.58081 9.99609C5.02873 10.4544 5.25269 11.069 5.25269 11.8398C5.25269 12.6107 5.02873 13.2305 4.58081 13.6992C4.13289 14.1576 3.5756 14.3867 2.90894 14.3867Z" fill="#9C9FA4"/>
              <path d="M2.90894 5.10547C2.24227 5.10547 1.68498 4.8763 1.23706 4.41797C0.789144 3.94922 0.565186 3.32943 0.565186 2.55859C0.565186 1.78776 0.789144 1.17318 1.23706 0.714844C1.68498 0.246094 2.24227 0.0117187 2.90894 0.0117188C3.5756 0.0117188 4.13289 0.246094 4.58081 0.714844C5.02873 1.17318 5.25269 1.78776 5.25269 2.55859C5.25269 3.32943 5.02873 3.94922 4.58081 4.41797C4.13289 4.8763 3.5756 5.10547 2.90894 5.10547Z" fill="#9C9FA4"/>
            </svg>
          </div>

          <Stack direction='vertical' gap={3} style={{background: '#1c1e29', borderRadius: '1rem', padding: '1rem'}}>
            <Row className='align-items-center'>
              <Col>Coin pair</Col>
              <Col>
                <input
                  list="coinpairs"
                  value={valueCoinPair}
                  placeholder='Choose pair'
                  onChange={(event) => setValueCoinPair(event.target.value)}
                  onSelect={handleSelectCoinPair}
                  className='alerts-table__input-modal-coinpair'
                />
                <datalist id="coinpairs">
                {pairsData.map((pair) =>
                  <option key={pair.id} value={pair.name.replace('_', '/')} />
                )}
                </datalist>
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col>Market price</Col>
              <Col className='text-white fw-bold'>{(valueMarketPrice === 0 && valueCoinPair !== '') ? <Spinner animation='border' variant='secondary' size='sm' /> : valueMarketPrice} {currency}</Col>
            </Row>

            <Row className='align-items-center'>
              <Col>
                <CustomSelect
                  data={[{
                    id: 1, 
                    name: 'PRICE_REACHES',
                    market: '',
                    minCounterQuantity: 0,
                    baseCurrency: '',
                    counterCurrency: '',
                    baseRound: 0,
                    counterRound: 0,
                    simpleName: ''
                  }, {
                    id: 2, 
                    name: 'PRICE_RISES_ABOVE',
                    market: '',
                    minCounterQuantity: 0,
                    baseCurrency: '',
                    counterCurrency: '',
                    baseRound: 0,
                    counterRound: 0,
                    simpleName: ''
                  }, {
                    id: 3, 
                    name: 'PRICE_DROPS_BELOW',
                    market: '',
                    minCounterQuantity: 0,
                    baseCurrency: '',
                    counterCurrency: '',
                    baseRound: 0,
                    counterRound: 0,
                    simpleName: ''
                  }]}
                  title={valueAlertType ? valueAlertType : 'Alert type '}
                  value={valueAlertType}
                  handler={handleAlertTypeChange} 
                />
              </Col>
              <Col>
                <CustomSelect
                  data={[{
                    id: 1, 
                    name: 'ONLY_ONCE',
                    market: '',
                    minCounterQuantity: 0,
                    baseCurrency: '',
                    counterCurrency: '',
                    baseRound: 0,
                    counterRound: 0,
                    simpleName: ''
                  }, {
                    id: 2, 
                    name: 'ALWAYS',
                    market: '',
                    minCounterQuantity: 0,
                    baseCurrency: '',
                    counterCurrency: '',
                    baseRound: 0,
                    counterRound: 0,
                    simpleName: ''
                  }]}
                  title={valueFrequency ? valueFrequency : 'Frequency '}
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
                    size={7}
                    style={{background: 'transparent', outline: 'none', border: '0'}}
                  />
                  {currency}
                </div>
              </Col>
            </Row>

            <Row className='align-items-center'>
              <Col className=''>
                <p className='mb-2'>Comment</p>
                <div>
                  <textarea
                    value={valueComment}
                    onChange={event => setValueComment(event.target.value)}
                    rows={3}
                    maxLength={200}
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
                    <g clipPath="url(#clip0_3315_3346)">
                    <path d="M12.0094 24.0187C18.6419 24.0187 24.0187 18.6419 24.0187 12.0094C24.0187 5.37677 18.6419 0 12.0094 0C5.37677 0 0 5.37677 0 12.0094C0 18.6419 5.37677 24.0187 12.0094 24.0187Z" fill="#27A5E5"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.42498 11.8785C8.92303 10.3446 11.2613 9.35321 12.4398 8.86685C15.7695 7.48259 16.4616 7.23941 16.9106 7.2207C17.0041 7.2207 17.2286 7.23941 17.3782 7.35165C17.4905 7.44518 17.5279 7.57612 17.5466 7.66965C17.5653 7.76318 17.584 7.96895 17.5653 8.13731C17.3782 10.0266 16.6113 14.647 16.1997 16.7608C16.0314 17.6587 15.6947 17.958 15.3767 17.9954C14.6845 18.0516 14.142 17.5278 13.4686 17.0976C12.4211 16.4054 11.8225 15.9752 10.7936 15.3018C9.61516 14.5161 10.3821 14.0859 11.0555 13.3937C11.2239 13.2067 14.3104 10.4195 14.3665 10.1576C14.3665 10.1202 14.3852 10.0079 14.3104 9.9518C14.2356 9.89568 14.142 9.91439 14.0672 9.9331C13.955 9.9518 12.2714 11.0742 8.99786 13.2815C8.5115 13.6182 8.08126 13.7679 7.68843 13.7679C7.25818 13.7679 6.43511 13.5247 5.81781 13.3189C5.06956 13.0757 4.47097 12.9448 4.52709 12.5333C4.5645 12.3275 4.8638 12.103 5.42498 11.8785Z" fill="white"/>
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