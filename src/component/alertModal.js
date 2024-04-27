import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertModal(props) {
  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  console.log(show, props.type, props.mes);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.type == 'success' ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.mes}</Modal.Body>
      </Modal>
    </>
  );
}

export default AlertModal;