import React, { useState } from 'react';
import './UserAccount.scss';
import { Stack } from 'react-bootstrap';

export const UserAccount = () => {
  const [isAddedAPIKey, setIsAddedAPIKey] = useState(false);

  return (
    <main className='account my-5 py-5 px-3 px-md-5'>
      <Stack direction="horizontal" gap={5} className='justify-content-end justify-content-lg-between my-3 flex-wrap'>
        <Stack direction="vertical" gap={3}>
          <svg width="263" height="263" viewBox="0 0 263 263" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="131.5" cy="131.5" r="131.5" fill="#3548FE"/>
            <path d="M203 140.563C201.789 151.45 198.046 161.018 191.771 169.266C185.497 177.404 177.24 183.728 167.002 188.237C156.875 192.746 145.206 195 131.995 195C117.574 195 104.97 192.306 94.1813 186.917C83.393 181.528 74.9715 173.995 68.9169 164.317C62.9723 154.639 60 143.367 60 130.5C60 117.633 62.9723 106.361 68.9169 96.6829C74.9715 87.0051 83.393 79.4719 94.1813 74.0831C104.97 68.6944 117.574 66 131.995 66C145.206 66 156.875 68.2545 167.002 72.7634C177.24 77.2724 185.497 83.6509 191.771 91.899C198.046 100.037 201.789 109.55 203 120.437H168.654C167.553 115.159 165.406 110.705 162.214 107.075C159.021 103.336 154.838 100.477 149.664 98.4974C144.6 96.5179 138.711 95.5281 131.995 95.5281C124.289 95.5281 117.629 96.9578 112.015 99.8171C106.401 102.566 102.107 106.581 99.1351 111.859C96.1628 117.028 94.6767 123.242 94.6767 130.5C94.6767 137.758 96.1628 144.027 99.1351 149.306C102.107 154.474 106.401 158.488 112.015 161.348C117.629 164.097 124.289 165.472 131.995 165.472C138.711 165.472 144.6 164.537 149.664 162.668C154.838 160.798 159.021 157.994 162.214 154.254C165.406 150.515 167.553 145.951 168.654 140.563H203Z" fill="white"/>
          </svg>

          <p>Change profile photo</p>

          {isAddedAPIKey &&
            <div className='account__bgfield text-center'>
              <h4>Add Sub-account</h4>
              <button className='header__button header__button--fill fw-bold'>Add</button>
            </div>
          }
        </Stack>
        <Stack direction="vertical" gap={3}>
          <h4>User Name</h4>
          <p>ID:</p>
          <p>E-mail:</p>
          <p>Telegram:</p>
          <p>Password: ************</p>

          {isAddedAPIKey &&
            <><p>Nikname:</p><p>KEY:</p><p>Market</p><p>Balance</p></>
          }

          <Stack direction='horizontal' className='account__bgfield'>
            {isAddedAPIKey === true
              ? <>
                  <Stack direction="vertical" gap={3}>
                    <h4>Add API-key to repeat your deals</h4>
                    Press “Add” to start work with API-key
                  </Stack>
                  <button className='header__button header__button--fill fw-bold'>Add</button>
                </>
              : <>
                  <Stack direction="vertical" gap={3}>
                    <h4>Add API key</h4>
                    Press “Add” to start work with Sub-account
                  </Stack>
                  <button className='header__button header__button--fill fw-bold' onClick={() => setIsAddedAPIKey(true)}>Add</button>
                </>
            }
          </Stack>
        </Stack>
      </Stack>
    </main>
  );
};