import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  show: boolean,
  onClose: () => void,
}

export const ModalDeleteApi: FC<Props> = ({show, onClose}) => {
  return (
    <Modal show={show} onHide={onClose} data-bs-theme='dark' fullscreen='sm-down' centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete API?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You cannot undo this action after clicking OK
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='secondary' className='px-5' onClick={onClose}>Undo</Button>
        <Button variant='danger' className='px-5' onClick={onClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  )
}