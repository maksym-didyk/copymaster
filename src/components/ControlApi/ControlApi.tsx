import React, { useState } from 'react';
import './ControlApi.scss';
import { Stack } from 'react-bootstrap';
import { ModalAddApi } from '../Modals/ModalAddApi/ModalAddApi';
import imgButtonPlayVideo from '../../assets/images/button_play_video.png';

export const ControlApi = () => {
  const [showModalAddAlert, setShowModalAddAlert] = useState(false);

  return (
    <main style={{maxWidth: '78rem', margin: '0 auto'}}>
      <Stack direction='horizontal' gap={3} className='account__bgfield flex-wrap flex-lg-nowrap' style={{ margin: '7rem 0 0' }}>
        <Stack direction="vertical" gap={3}>
          <h4>Add your control API</h4>
          Press “Add API Key” to add new API Keys and start working with them
        </Stack>
        <button className='header__button header__button--fill fw-bold' onClick={() => setShowModalAddAlert(true)}>Add</button>
      </Stack>

      <Stack direction='horizontal' gap={5} className='account__bgfield additional align-items-center align-content-center justify-content-center flex-wrap flex-lg-nowrap' style={{ margin: '4.5rem 0' }}>
        <div className='account__bgfield' style={{padding: '9.35rem 19rem'}}>
          <img src={imgButtonPlayVideo} alt='Play Video Button' className='controlapi__playbutton' />
        </div>
        <Stack direction="vertical" gap={3}>
          <h4>You have no API keys</h4>
          <p className='text-secondary'>How to add your control API</p>
          <ul>
            <li style={{listStyle: 'disc'}}>Copymaster provides clients with the most powerful, industry-leading API functionalities. You can use API to check market data, process automated trading orders and much more. See API Documentation page for more details.</li>
            <li style={{listStyle: 'disc'}}>Each account can have up to 20 keys.</li>
          </ul>
          <button className='header__button header__button--fill fw-bold' onClick={() => setShowModalAddAlert(true)}>Add</button>
        </Stack>
      </Stack>

      {showModalAddAlert &&
        <ModalAddApi
          show={showModalAddAlert}
          markets={['BINANCE', 'BYBIT', 'COINBASE']}
          onClose={() => setShowModalAddAlert(false)}
        />
      }
  </main>
  );
};