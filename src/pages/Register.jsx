import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import axios from "axios";
import { registerRoute } from "../utils/Allapi";
import "../css/Title.css";
const Register = () => {
  const [Username, setUsername] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (Password === ConfirmPassword) {
      const res = await axios.post(registerRoute, {
        username: Username,
        email: Email,
        password: Password,
      });
      const data = await res.data;
      if (data.status === true) {
        setloading(false);
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      } else {
        seterror(data.msg);
        setTimeout(() => {
          seterror(null);
        }, 2000);
      }
    } else {
      seterror("Mismatched Password");
      setloading(true);
      setTimeout(() => {
        seterror(null);
        setloading(false);
      }, 2000);
    }
  };

  return (
    <div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="logo-container">
            <ul>
              <li>
                <div class="logo-holder logo-4">
                  <a href="">
                    <i class="fas fa-book-open"></i>
                    <div class="left">
                      <h3>BotBuddy</h3>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="name"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="w-100 mt-2"
                    type="submit"
                  >
                    {loading ? "Waiting..." : "Signup "}
                  </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                  Already have an account?<Link to="/login">Log in</Link>
                </div>
              </Card.Body>
            </Card>
          </>
        </div>
      </Container>
    </div>
  );
};

export default Register;
