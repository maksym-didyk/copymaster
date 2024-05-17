import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  show: boolean,
  onClose: () => void
}

export const ModalManageApi: FC<Props> = ({show, onClose}) => {
  return (
    <Modal show={show} onHide={onClose} data-bs-theme='dark' fullscreen='sm-down' centered>
      <Modal.Header closeButton>
        <Modal.Title>Addiction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Manage API in progress now
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='secondary' className='px-5' onClick={onClose}>Reset changes</Button>
        <Button variant='primary' className='px-5' onClick={onClose}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}