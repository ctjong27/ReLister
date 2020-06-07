// using react snippet installed as extension
// react arrow function component
// rafc - for all of our componets we make in application
import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

// using code from [https://react.semantic-ui.com/collections/menu/#variations-inverted]
export const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      {/* semantic UI container used for formatting the menu items */}
      <Container>
        <Menu.Item as={NavLink} exact to="/">
          {/* in react, when adding styles you need to add object in expression */}
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            // there is no need to do () => with openCreateForm because that is a function, not a react functionalty component like setSelectedActivity
            // header is not working so not using header tag
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
