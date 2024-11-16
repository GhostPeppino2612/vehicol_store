import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";
import { RootState } from "./types/types";
import { Ruolo } from "./DB";
import { Login } from "./components/Login";
import { VeicoliAdmin } from "./components/VeicoliAdmin";
import { VeicoliVenduti } from "./components/VeicoliVenduti";
import { Statistiche } from "./components/Statistiche";
import { VeicoliUser } from "./components/VeicoliUser";
import { MieiVeicoli } from "./components/MieiVeicoli";
import { ProfiloUtente } from "./components/ProfiloUtente";
import { Db } from "./DB";
import { LOGOUT } from "./redux/actions/actions";

const PrivateRoute: React.FC<{
  element: React.ReactElement;
  requiredRole?: Ruolo;
}> = ({ element, requiredRole }) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && auth.user?.ruolo !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const AdminNavbar: React.FC = () => (
  <Nav className="me-auto">
    <Nav.Link href="/admin/veicoli">Veicoli in Vendita</Nav.Link>
    <Nav.Link href="/admin/venduti">Veicoli Venduti</Nav.Link>
    <Nav.Link href="/admin/statistiche">Statistiche</Nav.Link>
  </Nav>
);

const UserNavbar: React.FC = () => (
  <Nav className="me-auto">
    <Nav.Link href="/user/veicoli">Veicoli Disponibili</Nav.Link>
    <Nav.Link href="/user/miei-veicoli">I Miei Veicoli</Nav.Link>
    <Nav.Link href="/user/profilo">Profilo</Nav.Link>
  </Nav>
);

const AppNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth.isAuthenticated);

  if (!auth.isAuthenticated) return null;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">Concessionario</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {auth.user?.ruolo === Ruolo.ADMIN ? <AdminNavbar /> : <UserNavbar />}
          <Nav>
            <Nav.Link
              href="/login"
              onClick={() => {
                dispatch({ type: LOGOUT});
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export const App: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <Container className="flex-grow-1">
          <Routes>
            <Route
              path="/login"
              element={auth.isAuthenticated ? <Navigate to="/" /> : <Login db={Db} />}
            />

            <Route
              path="/admin/veicoli"
              element={
                <PrivateRoute element={<VeicoliAdmin />} requiredRole={Ruolo.ADMIN} />
              }
            />
            <Route
              path="/admin/venduti"
              element={
                <PrivateRoute element={<VeicoliVenduti />} requiredRole={Ruolo.ADMIN} />
              }
            />
            <Route
              path="/admin/statistiche"
              element={
                <PrivateRoute element={<Statistiche />} requiredRole={Ruolo.ADMIN} />
              }
            />

            <Route
              path="/user/veicoli"
              element={
                <PrivateRoute element={<VeicoliUser />} requiredRole={Ruolo.USER} />
              }
            />
            <Route
              path="/user/miei-veicoli"
              element={
                <PrivateRoute element={<MieiVeicoli />} requiredRole={Ruolo.USER} />
              }
            />
            <Route
              path="/user/profilo"
              element={
                <PrivateRoute element={<ProfiloUtente />} requiredRole={Ruolo.USER} />
              }
            />

            <Route
              path="/"
              element={
                <Navigate
                  to={
                    auth.user?.ruolo === Ruolo.ADMIN ? "/admin/veicoli" : "/user/veicoli"
                  }
                  replace
                />
              }
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
