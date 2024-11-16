import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container, Card } from "react-bootstrap";
import { LOGIN } from "../redux/actions/actions";
import { DB } from "../DB";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  db: DB;
}

export const Login: React.FC<LoginProps> = ({ db }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = db.utenti.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      dispatch({ type: LOGIN, payload: user });
      navigate(user.ruolo === "ADMIN" ? "/admin/veicoli" : "/user/veicoli");
    } else {
      setError("Credenziali non valide");
    }
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="py-3 display-1">Concessionario</h1>
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button variant="primary" type="submit" className="w-100">
              Accedi
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
