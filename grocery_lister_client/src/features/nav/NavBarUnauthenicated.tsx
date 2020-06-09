import React from "react";
import { Menu, Container, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    // https://react.semantic-ui.com/collections/menu/#types-basic

    <Menu
      fixed="top"
      // inverted
      // pointing
      // secondary
      size="large"
    >
      <Container>
        <Menu.Item as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          ReLister
        </Menu.Item>
        <Menu.Item name="Shopping List" as={NavLink} to="/shopping_list" />
        <Menu.Item name="Pantry List" as={NavLink} to="/pantry_list" />
        
        <Menu.Item position="right">
          <Button
            as="a"
            // inverted
          >
            Log in
          </Button>
          <Button
            as="a"
            // inverted
            primary
            style={{ marginLeft: "0.5em" }}
          >
            Sign Up
          </Button>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="test" />
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
