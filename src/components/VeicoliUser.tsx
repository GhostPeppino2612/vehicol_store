import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { VeicoliFilter } from "./VeicoliFilter";
import { VeicoloCard } from "./VeicoloCard";
import { RootState } from "../types/types";
import { SET_VEICOLI, SET_FILTERS, UPDATE_VEICOLO } from "../redux/actions/actions";
import { Stato } from "../DB";
import { sendPurchaseEmail } from "./emailService";

export const VeicoliUser: React.FC = () => {
  const dispatch = useDispatch();
  const { veicoli, filteredVeicoli, filters } = useSelector((state: RootState) => state.veicoli);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const veicoliDisponibili = veicoli.filter(v => v.stato === Stato.VENDESI);
    dispatch({ type: SET_VEICOLI, payload: veicoliDisponibili });
  }, [dispatch]);

  const handleFilterChange = (newFilters: typeof filters) => {
    dispatch({ type: SET_FILTERS, payload: newFilters });
  };

  const handleAcquista = async (veicolo: typeof veicoli[0]) => {
    if (!user) return;

    const veicoloAggiornato = {
      ...veicolo,
      stato: Stato.VENDUTO,
      proprietario: user.username
    };

    try {
      await sendPurchaseEmail(user.username, veicoloAggiornato);
      dispatch({ type: UPDATE_VEICOLO, payload: veicoloAggiornato });
    } catch (error) {
      console.error("Errore durante l'acquisto:", error);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Veicoli Disponibili</h1>
      <VeicoliFilter filters={filters} onFilterChange={handleFilterChange} />
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredVeicoli.map((veicolo, idx) => (
          <Col key={idx}>
            <VeicoloCard
              veicolo={veicolo}
              onAcquista={() => handleAcquista(veicolo)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};