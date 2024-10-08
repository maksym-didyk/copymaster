import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Markets.scss';
import { Calculator } from '../Calculator';
import { CalculatorButtonType, MarketsTabsType } from '../../types/enums';
import { CustomSelect } from '../CustomSelect';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { Stack } from 'react-bootstrap';
import { AlertsListTypeContent, BalanceType, BalanceTypeBody, MarketsSpotType, SymbolType } from '../../types/types';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useParams, useNavigate } from 'react-router-dom';
import { MarketsTable } from '../MarketsTable/MarketsTable';
import { MarketsTabs } from './MarketsTabs/MarketsTabs';
import { AlertsTable } from '../AlertsTable/AlertsTable';
import useAlertSeen from '../../hooks/useAlertSeen';
import MarketPriceProvider from '../../context/MarketPriceProvider';

export const Markets = () => {
  const [markets, setMarkets] = useState<string[]>([]);
  const [currentMarket, setCurrentMarket] = useState('BINANCE');
  const [symbols, setSymbols] = useState<SymbolType[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState('XRP_USDT');
  // const [symbolPrice, setSymbolPrice] = useState(0);
  const [alertsPrice, setAlertsPrice] = useState(0);
  const [alertExecuted, setAlertExecuted] = useState<AlertsListTypeContent>();
  const [tradeType, setTradeType] = useState('SPOT');
  const [tradeTypes, setTradeTypes] = useState<string[]>([]);
  const [userBalance, setUserBalance] = useState<BalanceType>();
  const [currentTab, setCurrentTab] = useState<MarketsTabsType>(MarketsTabsType.buy);
  const [counterEarning, setCounterEarning] = useLocalStorage('counterEarning', true);

  const { setAlertsNotSeenList } = useAlertSeen();
  const { marketPriceContext, setMarketPriceContext } = useContext(MarketPriceProvider);

  const websocketUrl = '/websocket-url';

  let { tradeTypeUrl, currentMarketUrl, currentSymbolUrl, currentTabUrl } = useParams();
  const navigate = useNavigate();

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const counterEarningParam = searchParams.get('counterEarning');

  // let [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get('counterEarning'));

  // const [searchParams, setSearchParams] = useSearchParams();

  // Установка параметров запроса
  // setSearchParams({ counterEarning: 'true' });

  const handleCurrentTabChange = (tab: MarketsTabsType) => {
    setCurrentTab(tab);
    navigate(`/markets/${tradeType.toLocaleLowerCase()}/${tab}/${currentMarket.toLocaleLowerCase()}/${currentSymbol}`); //  + searchParams.toString()
  };

  const currentUrlToType = (tabValue: string | undefined) => {
    const enumValue = Object.values(MarketsTabsType).find(tab => tab === tabValue);

    if (enumValue !== undefined) {
      setCurrentTab(enumValue);
    };
  };

  useEffect(() => {
    currentUrlToType(currentTabUrl);
  }, [currentTabUrl]);

  const currentSymbolArray = currentSymbol.split('_');
  const counterEarningIndex = counterEarning ? 1 : 0;

  const getMarketsData = useCallback(async (url = '') => {
    try {
      const loadedData = await client.get<MarketsSpotType>('/api/markets' + url);

      if (loadedData.hasOwnProperty('error')) {
        return navigate('/markets');
      }

      const { markets, market, symbols, symbol, symbolPrice, counterEarning, tradeType, tradeTypes } = loadedData.body;

      setMarkets([...markets, 'BYBIT', 'COINBASE']);
      setCurrentMarket(market);
      setSymbols(symbols);
      setCurrentSymbol(symbol.name);
      setCounterEarning(counterEarning);
      setTradeType(tradeType);
      setTradeTypes([...tradeTypes, 'FUTURES', 'INVERSE']);
      // setSymbolPrice(symbolPrice === null ? 0 : symbolPrice);
      setMarketPriceContext(symbolPrice === null ? 0 : symbolPrice);
    } catch (error) {
      toast.error(`${error}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserBalance = useCallback(async (url = '') => {
    try {
      const loadedData = await client.get<BalanceTypeBody>('/api/markets' + url);
      setUserBalance(loadedData.body);
    } catch (error) {
      toast.error(`${error}`);
    }
  }, []);

  const handleCurrentSymbolChange = async (index: number) => {
    if (counterEarningIndex !== index) {
      await getMarketsData(`/${tradeType}/${currentMarket}/${currentSymbol}?counterEarning=${!counterEarning}`);
    }
  };

  const handleSymbolsChange = async (symbol: string) => {
    // setSymbolPrice(() => 0);
    setMarketPriceContext(0);
    await getMarketsData(`/${tradeType}/${currentMarket}/${symbol}?counterEarning=${counterEarning}`);

    navigate(`/markets/${tradeType.toLocaleLowerCase()}/${currentTab}/${currentMarket.toLocaleLowerCase()}/${symbol}`);
  };

  useEffect(() => {
    getMarketsData(`/${tradeTypeUrl}/${currentMarketUrl}/${currentSymbolUrl}?counterEarning=${counterEarning}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    let isConnected = false;

    const connectMarketPriceWebsocket = (stompClient: any, sessionId: string) => {
      stompClient.subscribe(`/user/${sessionId}/market-price`, (message: any) => {
          const marketMessage = JSON.parse(message.body);
          // setSymbolPrice(() => marketMessage.price);
          setMarketPriceContext(marketMessage.price);
      });
    };

    const connectAlertsPriceWebsocket = (stompClient: any, sessionId: string) => {
      stompClient.subscribe(`/user/${sessionId}/BINANCE/alert-prices`, (message: any) => {
          const marketMessage = JSON.parse(message.body);
          setAlertsPrice(() => marketMessage)
      });
    };

    const connectAlertsExecutedWebsocket = (stompClient: any, sessionId: string) => {
      stompClient.subscribe(`/user/${sessionId}/BINANCE/alert-price-executed`, (message: any) => {
          const marketMessage = JSON.parse(message.body);
          setAlertExecuted(marketMessage);
      });
    };

    const handleSocketClose = () => {
      if (isConnected) {
        stompClient.disconnect(() => {
          isConnected = false;
          toast.info('Socket connection closed');
        });
      }
    };

    const websocketMarketPrice = () => {
      handleSocketClose();

      stompClient.connect({ symbol: currentSymbol, market: currentMarket }, (frame: any) => {
        isConnected = true;
        const userName = frame.headers['user-name'];
        toast.success('Socket connected');
  
        const subscription = stompClient.subscribe(`/user/${userName}/web-id`, (message: any) => {
          subscription.unsubscribe();
          connectMarketPriceWebsocket(stompClient, message.body);
          connectAlertsPriceWebsocket(stompClient, message.body);
          connectAlertsExecutedWebsocket(stompClient, message.body);
        });

        stompClient.send('/app/init-web-id', {}, JSON.stringify({ userName, market: currentMarket, symbolName: currentSymbol }));
      }, (message: any) => {
        if (message.startsWith('Whoops! Lost connection to')) {
          toast.error('Socket lost. Reload this page');
        } else {
          toast.error(`Socket lost. Error: ${message}`);
        }
      });
    };

    if (!isConnected) {
      websocketMarketPrice();
    };

    getUserBalance(`/${tradeType}/symbol-quantities/${currentMarket}/${currentSymbol}`);

    return () => {
        handleSocketClose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSymbol, currentMarket, tradeType]);

  useEffect(() => {
    const getAlertsCount = async () => {
      try {
        const loadedData = await client.get<number[]>('/api/alert/not-seen-id-list?market=BINANCE');
        setAlertsNotSeenList(loadedData);
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    getAlertsCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='markets px-3 px-md-5'>
      <Stack direction="horizontal" gap={3} className='justify-content-end justify-content-lg-between my-3 flex-wrap'>
        <Stack direction="horizontal" gap={3}>
          <div className='markets__spot'>
            {tradeTypes.map((trade, index) =>
              <span key={index} className={classNames('markets__switcher nocursor', {
                active: trade === tradeType,
              })}>{capitalizeFirstLetter(trade)}</span>
            )}
          </div>

          <div className='markets__spot'>
            {markets.map((market, index) =>
              <span key={index} className={classNames('markets__switcher nocursor', {
                active: market === currentMarket,
              })}>{capitalizeFirstLetter(market)}</span>
            )}
          </div>
        </Stack>

        <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-end py-3'>
          <CustomSelect data={[{
            id: 1,
            name: 'Split position',
            market: '',
            minCounterQuantity: 0,
            baseCurrency: '',
            counterCurrency: '',
            baseRound: 0,
            counterRound: 0,
            simpleName: ''
          },
          {
            id: 2,
            name: 'Choose average',
            market: '',
            minCounterQuantity: 0,
            baseCurrency: '',
            counterCurrency: '',
            baseRound: 0,
            counterRound: 0,
            simpleName: ''
          },
          {
            id: 3,
            name: 'Average All',
            market: '',
            minCounterQuantity: 0,
            baseCurrency: '',
            counterCurrency: '',
            baseRound: 0,
            counterRound: 0,
            simpleName: ''
          }]} title={'Average '} />
          <CustomSelect data={symbols} title={currentSymbol} handler={handleSymbolsChange} isSymbols />
        </Stack>
      </Stack>

      <div className='d-flex gap-3 flex-wrap flex-lg-row flex-column-reverse'>
        <Calculator currency={currentSymbolArray} type={CalculatorButtonType.buy} balance={userBalance?.first} />
        <Calculator currency={currentSymbolArray} type={CalculatorButtonType.sell} balance={userBalance?.second} />

        <Stack direction="vertical" gap={3}>
          <div className='markets__marketprice earn'>
            Choose your earn:

            <ul className='markets__options'>
              {currentSymbolArray.map((symbol, index) =>
                <li key={symbol} className={classNames('markets__switcher', {
                  active: counterEarningIndex === index,
                })} onClick={() => handleCurrentSymbolChange(index)}>{symbol}</li>
              )}
            </ul>
          </div>

          <div className='markets__marketprice'>
            Market price:
            <p className='markets__marketprice-value'>{marketPriceContext}</p>
          </div>
        </Stack>
      </div>

      <MarketsTabs currentTab={currentTab} tabChange={handleCurrentTabChange} />

      {(currentTab === MarketsTabsType.buy || currentTab === MarketsTabsType.sell || currentTab === MarketsTabsType.all) &&
        <MarketsTable
          tabType={currentTab}
          counterEarning={counterEarning}
          tradeType={tradeType}
          currentMarket={currentMarket}
          currentSymbol={currentSymbol}
        />
      }

      {currentTab === MarketsTabsType.alerts &&
        <AlertsTable alertsPrice={alertsPrice} currentMarket={currentMarket} alertExecuted={alertExecuted} />
      }
    </main>
  );
};