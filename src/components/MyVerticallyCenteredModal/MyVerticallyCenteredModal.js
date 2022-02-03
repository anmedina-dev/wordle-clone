import React from "react";
import { Modal, Button } from 'react-bootstrap'
import './MyVerticallyCenteredModalCSS.css'

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="ModalClass"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { props.result
        ? <h3>You Won!</h3>
        : <h3>You lost :/</h3>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}