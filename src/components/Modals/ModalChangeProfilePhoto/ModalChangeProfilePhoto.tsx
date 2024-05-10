import React, { FC, useState } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import avatar_1 from '../../../assets/images/avatars/1.png';
import avatar_2 from '../../../assets/images/avatars/2.png';
import avatar_3 from '../../../assets/images/avatars/3.png';
import avatar_4 from '../../../assets/images/avatars/4.png';
import avatar_5 from '../../../assets/images/avatars/5.png';
import avatar_6 from '../../../assets/images/avatars/6.png';
import avatar_7 from '../../../assets/images/avatars/7.png';
import avatar_8 from '../../../assets/images/avatars/8.png';

interface Props {
  show: boolean,
  onClose: () => void
}

export const ModalChangeProfilePhoto: FC<Props> = ({show, onClose}) => {
  const [chosenAvatar, setChosenAvatar] = useState(avatar_1);

  const avatars = [avatar_1, avatar_2, avatar_3, avatar_4, avatar_5, avatar_6, avatar_7, avatar_8];

  return (
    <Modal show={show} size='lg' onHide={onClose} data-bs-theme='dark' fullscreen='sm-down' centered>
      <Modal.Header closeButton>
        <Modal.Title>Change profile photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex gap-4 justify-content-center flex-wrap'>
          {avatars.map(avatar =>
            <img
              src={avatar}
              alt='Avatar'
              style={{width: '7rem', height: '7rem', cursor: 'pointer', border: chosenAvatar === avatar ? '3px solid white' : '3px solid transparent', borderRadius: '7rem'}}
              onClick={() => setChosenAvatar(avatar)}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='secondary' className='px-4' onClick={() => onClose()}>Cancel</Button>
        <Button variant='primary' className='px-5' onClick={() => onClose()}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}