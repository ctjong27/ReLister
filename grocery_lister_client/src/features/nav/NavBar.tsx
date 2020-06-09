import React, { useState } from "react";
import { Menu, Container, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { UserFormValues } from "../../app/models/user";

export const NavBar: React.FC = () => {
  
  const [user, setActivity] = useState(new UserFormValues());

  return (
    // https://react.semantic-ui.com/collections/menu/#types-basic
    

  );
};

export default observer(NavBar);
