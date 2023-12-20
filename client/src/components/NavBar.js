import React, { useContext } from "react";
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Button onClick={() => navigate(SHOP_ROUTE)}>Internet Shop</Button>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button className="m-2" onClick={() => navigate(ADMIN_ROUTE)}>
              Admin panel
            </Button>
            <Button className="m-2" onClick={() => logout()}>
              Exit
            </Button>
          </Nav>
        ) : (
          <Nav>
            <Button onClick={() => navigate(LOGIN_ROUTE)}>Authorization</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
