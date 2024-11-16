import React from "react";
import { Card, Button } from "react-bootstrap";
import { Veicolo, Stato } from "../DB";

interface VeicoloCardProps {
  veicolo: Veicolo;
  onAcquista?: () => void;
  isAdmin?: boolean;
}

export const VeicoloCard: React.FC<VeicoloCardProps> = ({ veicolo, onAcquista, isAdmin }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{veicolo.brand} {veicolo.modello}</Card.Title>
        <Card.Text>
          <strong>Tipo:</strong> {veicolo.tipo}<br />
          <strong>Anno:</strong> {veicolo.anno}<br />
          <strong>Km:</strong> {veicolo.kilometri.toLocaleString()}<br />
          <strong>Alimentazione:</strong> {veicolo.alimentazione}<br />
          <strong>Prezzo:</strong> €{veicolo.prezzo.toLocaleString()}<br />
          <strong>Stato:</strong> {veicolo.stato}
          {isAdmin && veicolo.stato === Stato.VENDUTO && (
            <><br /><strong>Proprietario:</strong> {veicolo.proprietario}</>
          )}
        </Card.Text>
        {!isAdmin && veicolo.stato === Stato.VENDESI && onAcquista && (
          <Button variant="primary" onClick={onAcquista}>
            Acquista
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};