import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, Row, Col } from "react-bootstrap";
import { RootState } from "../types/types";
import { Stato } from "../DB";

export const Statistiche: React.FC = () => {
  const { veicoli } = useSelector((state: RootState) => state.veicoli);
  const veicoliVenduti = veicoli.filter(v => v.stato === Stato.VENDUTO);

  const maxPrezzo = Math.max(...veicoliVenduti.map(v => v.prezzo));
  const minPrezzo = Math.min(...veicoliVenduti.map(v => v.prezzo));
  const prezzoMedio = veicoliVenduti.reduce((acc, v) => acc + v.prezzo, 0) / veicoliVenduti.length;

  const brandCount = veicoliVenduti.reduce((acc, v) => {
    acc[v.brand] = (acc[v.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const brandPiuVenduto = Object.entries(brandCount).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0];

  return (
    <Container className="py-4">
      <h1 className="mb-4">Statistiche di Vendita</h1>
      <Row xs={1} md={2} className="g-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Prezzo Massimo</Card.Title>
              <Card.Text>€{maxPrezzo.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Prezzo Minimo</Card.Title>
              <Card.Text>€{minPrezzo.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Prezzo Medio</Card.Title>
              <Card.Text>€{prezzoMedio.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Brand Più Venduto</Card.Title>
              <Card.Text>{brandPiuVenduto}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};