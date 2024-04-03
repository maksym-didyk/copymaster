import React, { useCallback, useEffect, useState } from 'react';
import './Markets.scss';
import { Calculator } from '../Calculator';
import { CalculatorButtonType, MarketsTabsType } from '../../types/enums';
import { CustomSelect } from '../CustomSelect';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { client } from '../../api/fetchClient';
import { Stack } from 'react-bootstrap';
import { AlertsListTypeContent, BalanceType, BalanceTypeBody, MarketsSpotType } from '../../types/types';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useParams, useNavigate } from 'react-router-dom';
import { MarketsTable } from '../MarketsTable/MarketsTable';
import { MarketsTabs } from './MarketsTabs/MarketsTabs';
import { AlertsTable } from '../AlertsTable/AlertsTable';

export const Markets = () => {
  const [markets, setMarkets] = useState<string[]>([]);
  const [currentMarket, setCurrentMarket] = useState('BINANCE');
  const [symbols, setSymbols] = useState<string[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState('XRP_USDT');
  const [symbolPrice, setSymbolPrice] = useState(0);
  const [alertsPrice, setAlertsPrice] = useState(0);
  const [alertExecuted, setAlertExecuted] = useState<AlertsListTypeContent>();
  const [counterEarning, setCounterEarning] = useLocalStorage('counterEarning', true);
  const [tradeType, setTradeType] = useState('SPOT');
  const [tradeTypes, setTradeTypes] = useState<string[]>([]);
  const [userBalance, setUserBalance] = useState<BalanceType>();
  const [currentTab, setCurrentTab] = useState<MarketsTabsType>(MarketsTabsType.buy);

  const websocketUrl = '/websocket-url';

  let { tradeTypeUrl, currentMarketUrl, currentSymbolUrl, currentTabUrl } = useParams();
  const navigate = useNavigate();

  const handleCurrentTabChange = (tab: MarketsTabsType) => {
    setCurrentTab(tab);
    navigate(`/markets/${tradeType.toLocaleLowerCase()}/${tab}/${currentMarket.toLocaleLowerCase()}/${currentSymbol}`);
  }

  const currentUrlToType = (tabValue: string | undefined) => {
    const enumValue = Object.values(MarketsTabsType).find(tab => tab === tabValue);

    if (enumValue !== undefined) {
      setCurrentTab(enumValue);
    }
  }

  useEffect(() => {
    currentUrlToType(currentTabUrl);
  }, [currentTabUrl]);

  const currentSymbolArray = currentSymbol.split('_');
  const counterEarningIndex = counterEarning ? 0 : 1;

  const getMarketsData = useCallback(async (url = '') => {
    try {
      const loadedData = await client.get<MarketsSpotType>('/api/markets' + url);

      if (loadedData.hasOwnProperty('error')) {
        navigate('/markets');
      } else {
        const { markets, market, symbols, symbol, symbolPrice, counterEarning, tradeType, tradeTypes } = loadedData.body;

        setMarkets([...markets, 'BYBIT', 'COINBASE']);
        setCurrentMarket(market);
        setSymbols(symbols);
        setCurrentSymbol(symbol);
        setCounterEarning(counterEarning);
        setTradeType(tradeType);
        setTradeTypes([...tradeTypes, 'FUTURES', 'INVERSE']);
        setSymbolPrice(symbolPrice === null ? 0 : symbolPrice);
      }
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
    setSymbolPrice(() => 0);
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
          setSymbolPrice(() => marketMessage.price);
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
          console.log(marketMessage);
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

        stompClient.send('/app/init-web-id', {}, JSON.stringify({ userName, symbol: currentSymbol }));
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
    }

    getUserBalance(`/${tradeType}/symbol-quantities/${currentMarket}/${currentSymbol}`);

    return () => {
        handleSocketClose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSymbol, currentMarket, tradeType]);

  return (
    <main className='markets px-3 px-md-5'>
      <Stack direction="horizontal" gap={3} className='justify-content-end justify-content-lg-between my-3 flex-wrap'>
        <Stack direction="horizontal" gap={3}>
          <div className='markets__spot'>
            {tradeTypes.map((trade, index) =>
              <span key={index} className={classNames('markets__switcher', {
                active: trade === tradeType,
              })}>{capitalizeFirstLetter(trade)}</span>
            )}
          </div>

          <div className='markets__spot'>
            {markets.map((market, index) =>
              <span key={index} className={classNames('markets__switcher', {
                active: market === currentMarket,
              })}>{capitalizeFirstLetter(market)}</span>
            )}
          </div>
        </Stack>

        <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-end py-3'>
          <CustomSelect data={['Split position','Choose average','Average All']} title={'Average '} />
          <CustomSelect data={symbols} title={currentSymbol} handler={handleSymbolsChange} isSymbols />
        </Stack>
      </Stack>

      <div className='d-flex gap-3 flex-wrap flex-lg-row flex-column-reverse'>
        <Calculator currency={currentSymbolArray} type={CalculatorButtonType.buy} marketPrice={symbolPrice} balance={userBalance?.first} />
        <Calculator currency={currentSymbolArray} type={CalculatorButtonType.sell} marketPrice={symbolPrice} balance={userBalance?.second} />

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
            <p className='markets__marketprice-value'>{symbolPrice}</p>
          </div>
        </Stack>
      </div>

      <MarketsTabs currentTab={currentTab} tabChange={handleCurrentTabChange} />

      {(currentTab === MarketsTabsType.buy || currentTab === MarketsTabsType.sell || currentTab === MarketsTabsType.all) &&
        <MarketsTable tabType={currentTab} counterEarning={counterEarning} marketPrice={symbolPrice} tradeType={tradeType} currentMarket={currentMarket} currentSymbol={currentSymbol} />
      }

      {currentTab === MarketsTabsType.alerts &&
        <AlertsTable alertsPrice={alertsPrice} currentMarket={currentMarket} alertExecuted={alertExecuted} />
      }
    </main>
  );
};