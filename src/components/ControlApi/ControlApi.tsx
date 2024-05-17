import React, { useEffect, useState } from 'react';
import './ControlApi.scss';
import { Stack } from 'react-bootstrap';
import { ModalAddApi } from '../Modals/ModalAddApi/ModalAddApi';
import imgButtonPlayVideo from '../../assets/images/button_play_video.png';
import { ControlApiCard } from './ControlApiCard/ControlApiCard';

export const ControlApi = () => {
  const [showModalAddAlert, setShowModalAddAlert] = useState(false);
  const [isAddedAPIKey, setIsAddedAPIKey] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [mainId, setMainId] = useState(2);
  const [data, setData] = useState<any[]>([]);

  function updateIsMainById(array: any[], id: number, newIsMain: boolean) {
    array.forEach(item => {
      if (item.isMain) {
        item.isMain = false;
      }
    });

    const obj = array.find(item => item.id === id);
    if (obj) {
      obj.isMain = newIsMain;
    }

    setData(array);
  };

  const handleChangeMainId = () => {
    updateIsMainById(data, mainId, true);
    setIsChanging(false);
  };

  useEffect(() => {
    const ApiArray = [
      {
        id: 1,
        name: 'Resu.n',
        key: '125f165dg13651dfg13',
        market: 'Binance',
        balance: 3642,
        currency: 'USDT',
        isMain: false,
        hasChild: false
      },
      {
        id: 2,
        name: 'Didyk.m',
        key: '7sdf165dg13651dfg45',
        market: 'Binance',
        balance: 360,
        currency: 'USDT',
        isMain: true,
        hasChild: true
      },
      {
        id: 3,
        name: 'Vorobiov.i',
        key: '02df165dg13651dfg29',
        market: 'Binance',
        balance: 1200,
        currency: 'USDT',
        isMain: false,
        hasChild: true
      },
    ];

    setData(ApiArray);
  }, []);

  return (
    <main style={{maxWidth: '78rem', margin: '0 auto', padding: '0.5rem'}}>
      <Stack direction='horizontal' gap={3} className='account__bgfield flex-wrap flex-lg-nowrap mt-5'>
        <Stack direction='vertical' gap={3}>
          <h4>Add your control API</h4>
          Press “Add API Key” to add new API Keys and start working with them
        </Stack>
        <button className='header__button header__button--fill fw-bold px-5 py-2' onClick={() => setShowModalAddAlert(true)}>Add</button>
      </Stack>

      {isAddedAPIKey
        ? <Stack direction='vertical' gap={3} className='mt-5'>
            <div className='d-flex justify-content-between px-4'>
              <h3>Your API now <span style={{color:'#3548FE'}}>Vorobiov</span></h3>
              {isChanging
                ? <button className='header__button header__button--fill fw-bold px-5 py-2 text-black' style={{background: '#36FF6C'}} onClick={handleChangeMainId}>OK</button>
                : <button className='header__button header__button--fill fw-bold px-4 py-2' onClick={() => setIsChanging(true)}>Change API</button>
              }
            </div>

            {data.map(item =>
              <Stack direction='horizontal' gap={4} key={item.id}>
                {isChanging && (
                  item.id === mainId
                  ? <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" cursor='pointer'>
                        <path fill-rule="evenodd" clipRule="evenodd" d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM20.4885 10.3358C21.2262 9.51375 21.1579 8.24927 20.3358 7.51152C19.5138 6.77376 18.2493 6.84211 17.5115 7.66418L10.8327 15.1063L8.40218 12.7167C7.61454 11.9423 6.34825 11.953 5.57385 12.7407C4.79945 13.5283 4.81018 14.7946 5.59782 15.569L9.5209 19.4261C9.9104 19.8091 10.4396 20.0161 10.9855 19.999C11.5315 19.982 12.0467 19.7423 12.4116 19.3358L20.4885 10.3358Z" fill="#36FF6C"/>
                      </svg>
                    </div>
                  : <div onClick={() => setMainId(item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" cursor='pointer'>
                        <circle cx="13" cy="13" r="12.5" stroke="#36FF6C"/>
                      </svg>
                    </div>
                )}

                {isChanging
                  ? <div className='w-100' style={{cursor: 'pointer'}} onClick={() => setMainId(item.id)}>
                      <ControlApiCard key={item.id} data={item} />
                    </div>
                  : <ControlApiCard key={item.id} data={item} />
                }
              </Stack>
            )}
          </Stack>
        : <Stack direction='horizontal' gap={5} className='account__bgfield additional flex-wrap flex-lg-nowrap' style={{ margin: '4.5rem 0' }}>
            <div className='controlapi__video'>
              <img src={imgButtonPlayVideo} alt='Play Video Button' className='controlapi__playbutton' />
            </div>
            <Stack direction="vertical" gap={3} className='justify-content-center'>
              <h4>You have no API keys</h4>
              <p className='text-secondary'>How to add your control API</p>
              <ul>
                <li style={{listStyle: 'disc'}}>Copymaster provides clients with the most powerful, industry-leading API functionalities. You can use API to check market data, process automated trading orders and much more. See API Documentation page for more details.</li>
                <li style={{listStyle: 'disc'}}>Each account can have up to 20 keys.</li>
              </ul>
              <button className='header__button header__button--fill fw-bold' onClick={() => setShowModalAddAlert(true)}>Add</button>
            </Stack>
          </Stack>
      }

      {showModalAddAlert &&
        <ModalAddApi
          show={showModalAddAlert}
          onClose={() => setShowModalAddAlert(false)}
          handler={() => setIsAddedAPIKey(true)}
        />
      }
  </main>
  );
};