import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Veicolo } from "../DB";

interface AcquistoModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (email: string) => void;
  veicolo: Veicolo | null;
}

export const AcquistoModal: React.FC<AcquistoModalProps> = ({ show, handleClose, handleConfirm, veicolo }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    handleConfirm(email);
    setEmail(""); 
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Conferma Acquisto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {veicolo && (
          <>
            <p>Stai acquistando:</p>
            <ul>
              <li><strong>Brand:</strong> {veicolo.brand}</li>
              <li><strong>Modello:</strong> {veicolo.modello}</li>
              <li><strong>Prezzo:</strong> €{veicolo.prezzo.toLocaleString()}</li>
            </ul>
          </>
        )}
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Indirizzo Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Conferma Acquisto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
