import React from "react";
import { Menu, Container, Button, Segment, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export const NavBarAuth: React.FC = () => {
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
        <Menu.Menu position="left">
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
        </Menu.Menu>
        <Menu.Menu position="right">
          {/* <Dropdown item text="Add Item">
            <Dropdown.Menu>
              <Dropdown.Item>Home</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <Menu.Item >
            <Button
              as="a"
              // inverted
              style={{ marginLeft: "0.5em" }}
            >
              Add Group
            </Button>
            <Button
              as="a"
              // inverted
              style={{ marginLeft: "0.5em" }}
            >
              Add Item
            </Button>
            <Button
              as="a"
              // inverted
              primary
              style={{ marginLeft: "0.5em" }}
            >
              Sign Out
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default observer(NavBarAuth);
