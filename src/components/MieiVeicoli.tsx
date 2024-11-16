import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { VeicoliFilter } from "./VeicoliFilter";
import { VeicoloCard } from "./VeicoloCard";
import { RootState } from "../types/types";
import { SET_VEICOLI, SET_FILTERS } from "../redux/actions/actions";

export const MieiVeicoli: React.FC = () => {
  const dispatch = useDispatch();
  const { veicoli, filteredVeicoli, filters } = useSelector((state: RootState) => state.veicoli);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      const veicoliUtente = veicoli.filter(v => v.proprietario === user.username);
      dispatch({ type: SET_VEICOLI, payload: veicoliUtente });
    }
  }, [dispatch, user]);

  const handleFilterChange = (newFilters: typeof filters) => {
    dispatch({ type: SET_FILTERS, payload: newFilters });
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">I Miei Veicoli</h1>
      <VeicoliFilter filters={filters} onFilterChange={handleFilterChange} />
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredVeicoli.map((veicolo, idx) => (
          <Col key={idx}>
            <VeicoloCard veicolo={veicolo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};