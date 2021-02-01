import React, { useContext } from "react";
import NavbarMenu from "../static/NavbarMenu";
import NavbarMenuMobile from "../static/NavbarMenuMobile";
import { AppBar, Toolbar, Container, CssBaseline } from "@material-ui/core";
import { AuthContext } from "../context/auth";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <CssBaseline />
      <AppBar style={{ background: "none" }} position="static">
        <Container>
          <Toolbar>
            <NavbarMenu user={user} logout={logout} />
            <NavbarMenuMobile user={user} logout={logout} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
