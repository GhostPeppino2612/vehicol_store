import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { VeicoliFilter } from "./VeicoliFilter";
import { VeicoloCard } from "./VeicoloCard";
import { RootState } from "../types/types";
import { SET_VEICOLI, SET_FILTERS } from "../redux/actions/actions";
import { Stato } from "../DB";

export const VeicoliAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const { veicoli, filteredVeicoli, filters } = useSelector((state: RootState) => state.veicoli);

  useEffect(() => {
    const veicoliDisponibili = veicoli.filter(v => v.stato === Stato.VENDESI);
    dispatch({ type: SET_VEICOLI, payload: veicoliDisponibili });
  }, [dispatch]);

  const handleFilterChange = (newFilters: typeof filters) => {
    dispatch({ type: SET_FILTERS, payload: newFilters });
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Veicoli in Vendita</h1>
      <VeicoliFilter filters={filters} onFilterChange={handleFilterChange} />
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredVeicoli.map((veicolo, idx) => (
          <Col key={idx}>
            <VeicoloCard veicolo={veicolo} isAdmin={true} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};