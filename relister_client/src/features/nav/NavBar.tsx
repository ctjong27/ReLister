import React, { useState, useEffect, useContext } from "react";
import { Menu, Container, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { UserFormValues } from "../../app/models/user";
import { NavBarAuth } from "./NavBarAuth";
import NavBarUnauth from "./NavBarUnauth";
import UserStore from "../../app/stores/userStore";

const NavBar: React.FC = () => { // 
  
  // const [trigger, setTrigger] = useState<Boolean>(false);

  const userStore = useContext(UserStore);
  const {
    loggedIn
  } = userStore;

  // useEffect(() => {
  //   if (false) {
  //     setTrigger(true);
  //   }
  //   else {
  //     setTrigger(false)
  //   }

  // }, []);
    
  var navbar;
  if (loggedIn) {
    return (<NavBarAuth />) ;
  } else {
    return (<NavBarUnauth />) ;
  }
};

export default observer(NavBar);
