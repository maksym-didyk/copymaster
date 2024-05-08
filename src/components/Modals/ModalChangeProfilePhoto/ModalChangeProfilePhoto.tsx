import React, { FC } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

interface Props {
  show: boolean,
  onClose: () => void
}

export const ModalChangeProfilePhoto: FC<Props> = ({show, onClose}) => {
  return (
    <Modal show={show} onHide={onClose} data-bs-theme='dark' fullscreen='sm-down' centered>
      <Modal.Header closeButton>
        <Modal.Title>Change profile photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='secondary' className='px-4' onClick={() => onClose()}>Cancel</Button>
        <Button variant='primary' className='px-5' onClick={() => onClose()}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}