import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { VeicoliFilter } from "./VeicoliFilter";
import { VeicoloCard } from "./VeicoloCard";
import { AcquistoModal } from "./AcquistoModal";
import { RootState } from "../types/types";
import { SET_VEICOLI, SET_FILTERS, UPDATE_VEICOLO } from "../redux/actions/actions";
import { Stato, Veicolo } from "../DB";
import { sendPurchaseEmail } from "./emailService";

export const VeicoliUser: React.FC = () => {
  const dispatch = useDispatch();
  const { veicoli, filteredVeicoli, filters } = useSelector((state: RootState) => state.veicoli);
  const user = useSelector((state: RootState) => state.auth.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedVeicolo, setSelectedVeicolo] = useState<Veicolo | null>(null);

  useEffect(() => {
    const veicoliDisponibili = veicoli.filter(v => v.stato === Stato.VENDESI);
    dispatch({ type: SET_VEICOLI, payload: veicoliDisponibili });
  }, [dispatch]);

  const handleFilterChange = (newFilters: typeof filters) => {
    dispatch({ type: SET_FILTERS, payload: newFilters });
  };

  const handleAcquistaClick = (veicolo: Veicolo) => {
    setSelectedVeicolo(veicolo);
    setShowModal(true);
  };

  const handleConfirmAcquisto = async (email: string) => {
    if (!user || !selectedVeicolo) return;

    const veicoloAggiornato = {
      ...selectedVeicolo,
      stato: Stato.VENDUTO,
      proprietario: user.username,
    };

    try {
      await sendPurchaseEmail(user.username, veicoloAggiornato, email);
     // eventualmente: dispatch({ type: UPDATE_VEICOLO, payload: veicoloAggiornato });
      alert("Acquisto completato con successo!");
    } catch (error) {
      console.error("Errore durante l'acquisto:", error);
      alert("Errore durante l'acquisto.");
    } finally {
      setShowModal(false);
      setSelectedVeicolo(null);
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
              onAcquista={() => handleAcquistaClick(veicolo)}
            />
          </Col>
        ))}
      </Row>
      <AcquistoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmAcquisto}
        veicolo={selectedVeicolo}
      />
    </Container>
  );
};
