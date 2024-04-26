import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { ModalAddApi } from '../Modals/ModalAddApi/ModalAddApi';

export const ControlApi = () => {
  const [showModalAddAlert, setShowModalAddAlert] = useState(false);

  return (
    <main style={{maxWidth: '78rem', margin: '0 auto'}}>
      <Stack direction='horizontal' className='account__bgfield' style={{ width: '78rem', margin: '7.4rem 0 0' }}>
        <Stack direction="vertical" gap={3}>
          <h4>Add your control API</h4>
          Press “Add API Key” to add new API Keys and start working with them
        </Stack>
        <button className='header__button header__button--fill fw-bold' onClick={() => setShowModalAddAlert(true)}>Add</button>
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