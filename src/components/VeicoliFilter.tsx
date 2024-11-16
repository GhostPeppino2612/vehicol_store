import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { TipoVeicolo, Alimentazione } from "../DB";
import { VeicoliState } from "../types/types";

interface VeicoliFilterProps {
  filters: VeicoliState["filters"];
  onFilterChange: (filters: VeicoliState["filters"]) => void;
}

export const VeicoliFilter: React.FC<VeicoliFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleChange = (name: string, value: any) => {
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <Form className="mb-4">
      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={filters.brand || ""}
              onChange={(e) => handleChange("brand", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Modello</Form.Label>
            <Form.Control
              type="text"
              value={filters.modello || ""}
              onChange={(e) => handleChange("modello", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              value={filters.tipo || ""}
              onChange={(e) => handleChange("tipo", e.target.value)}
            >
              <option value="">Tutti</option>
              {Object.values(TipoVeicolo).map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Alimentazione</Form.Label>
            <Form.Select
              value={filters.alimentazione}
              onChange={(e) => handleChange("alimentazione", e.target.value)}
            >
              <option value="">Tutte</option>
              {Object.values(Alimentazione).map((alim) => (
                <option key={alim} value={alim}>
                  {alim}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Prezzo (€)</Form.Label>
            <div className="d-flex align-items-center">
            <span className="me-2">Min:</span>
              <Form.Range
                style={{width: "500px"}}
                min={0}
                max={100000}
                value={filters.prezzoMin || 0}
                onChange={(e) => handleChange("prezzoMin", Number(e.target.value))}
              />
              <span className="ms-2">{filters.prezzoMin || 0} €</span>
            </div>
            <div className="d-flex align-items-center mt-2">
            <span className="me-2">Max:</span>
              <Form.Range
                style={{width: "500px"}}
                min={0}
                max={100000}
                value={filters.prezzoMax || 100000}
                onChange={(e) => handleChange("prezzoMax", Number(e.target.value))}
              />
              <span className="ms-2">{filters.prezzoMax || 100000} €</span>
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Kilometraggio</Form.Label>
            <div className="d-flex align-items-center">
            <span className="me-2">Min:</span>
              <Form.Range
                style={{width: "450px"}}
                min={0}
                max={500000}
                value={filters.kmMin || 0}
                onChange={(e) => handleChange("kmMin", Number(e.target.value))}
              />
              <span className="ms-2">{filters.kmMin || 0} km</span>
            </div>
            <div className="d-flex align-items-center mt-2">
            <span className="me-2">Max:</span>
              <Form.Range
                style={{width: "450px"}}
                min={0}
                max={500000}
                value={filters.kmMax || 500000}
                onChange={(e) => handleChange("kmMax", Number(e.target.value))}
              />
              <span className="ms-2">{filters.kmMax || 500000} km</span>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};
