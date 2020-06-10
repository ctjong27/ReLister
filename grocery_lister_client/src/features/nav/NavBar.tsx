import React, { useState, useEffect } from "react";
import { Menu, Container, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { UserFormValues } from "../../app/models/user";
import { NavBarAuth } from "./NavBarAuth";
import NavBarUnauth from "./NavBarUnauth";

const NavBar: React.FC = () => { // 
  
  const [trigger, setTrigger] = useState<Boolean>(false);

  useEffect(() => {
    if (true) {
      setTrigger(true);
    }
    else {
      setTrigger(false)
    }

  }, []);
    
  var navbar;
  if (trigger) {
    return (<NavBarAuth />) ;
  } else {
    return (<NavBarUnauth />) ;
  }
};

export default observer(NavBar);
