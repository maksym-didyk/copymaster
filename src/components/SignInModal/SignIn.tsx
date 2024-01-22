import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  show: boolean,
  onClose: () => void,
}

export const SignIn: FC<Props> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        This is footer
      </Modal.Footer>
    </Modal>
  );
}