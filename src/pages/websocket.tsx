import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';
// import SockJsClient from 'react-stomp';

export const WebsocketPage = () => {
  const SockJS = require('sockjs-client');
  const Stomp = require('stompjs');
  const websocketUrl = 'http://localhost/websocket-url';

  const [marketPrice, setMarketPrice] = useState();

  const websocketMarketPrice = () => {
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({symbol: 'XRP_USDT', market: 'BINANCE'}, (frame: any) => {
        const userName = frame.headers['user-name'];
        // console.log('Socket connected: ', userName);
        toast.success('Socket connected');

        const subscription = stompClient.subscribe(`/user/${userName}/web-id`, (message: any) => {
            subscription.unsubscribe();
            connectMarketPriceWebsocket(stompClient, message.body);
        });

        stompClient.send('/app/init-web-id', {},
            JSON.stringify({userName, symbol: 'XRP_USDT'}));
    }, (message: any) => {
        if (message.startsWith('Whoops! Lost connection to')) {
          // console.log('Зв\'язок із сервером втрачений. Перезавантажте сторінку.');
          toast.error('Connection lost. Reload the page');
        } else {
          // console.log('Connection lost. Error:', message);
          toast.error(`Connection lost. Error: ${message}`);
        }
    });
  };

  function connectMarketPriceWebsocket(stompClient: any, sessionId: string) {
    stompClient.subscribe(`/user/${sessionId}/market-price`, (message:any) => {
        const marketMessage = JSON.parse(message.body);

        setMarketPrice(() => marketMessage.price);
    });
  };

    useEffect(() => {
      websocketMarketPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>{marketPrice}</>
  );
};

export default WebsocketPage;