import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto">
            {isLogin ? "Authorization" : "Registration"}
          </h2>
          <Form className="d-flex flex-column">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email..."
              className="mt-2"
            />
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password..."
              className="mt-2"
            />
            <Row className="d-flex justify-content-center mt-3 pl-3 pr-3">
              {isLogin ? (
                <div>
                  Have not account?
                  <NavLink className="p-2" to={REGISTRATION_ROUTE}>
                    Register here!
                  </NavLink>
                </div>
              ) : (
                <div>
                  Have account?
                  <NavLink className="p-2" to={LOGIN_ROUTE}>
                    Enter!
                  </NavLink>
                </div>
              )}
              <Button
                onClick={click}
                className="mt-3"
                variant={"outline-success"}
              >
                {isLogin ? "Enter" : "Registration"}
              </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
});

export default Auth;
