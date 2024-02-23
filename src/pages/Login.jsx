import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../utils/Allapi";
import "../css/Title.css";
const Login = () => {
  const [errorMessages, setErrorMessages] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();

  const validteform = () => {
    if (Username === "") {
      setErrorMessages("Username required");
      return false;
    } else if (Password === "") {
      setErrorMessages("Password required");
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true)
    if (validteform()) {
      const res = await axios.post(loginRoute, {
        Username,
        Password,
      });
      const data = await res.data;
      console.log(res.data);
      if (data.status === false) {
        setErrorMessages(data.msg);
        setTimeout(() => {
          setErrorMessages(null);
        }, 2000);
      }
      if (data.status === true) {
        setloading(false)
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

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
                <h2 className="text-center mb-4">Log In</h2>
                {errorMessages && (
                  <Alert variant="danger">{errorMessages}</Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  {}
                  <Button
                    disabled={loading}
                    className="w-100 mt-2"
                    type="submit"
                  >
                    {loading ? "Waiting..." : "Log in"}
                  </Button>
                </Form>
                <div className="w-100 text-center mt-2 ">
                  Need an account?<Link to="/register">Sign up</Link>
                </div>
              </Card.Body>
            </Card>
          </>
        </div>
      </Container>
    </div>
  );
};

export default Login;
