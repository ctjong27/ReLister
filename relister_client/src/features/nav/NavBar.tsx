import React, { useState, useEffect, useContext } from "react";
import { Menu, Container, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { UserFormValues } from "../../app/models/user";
import { NavBarAuth } from "./NavBarAuth";
import NavBarUnauth from "./NavBarUnauth";
import UserStore from "../../app/stores/userStore";
import Cookies from 'universal-cookie';
import { type } from "os";

const NavBar: React.FC = () => { // 
  
  // const [trigger, setTrigger] = useState<Boolean>(false);

  const userStore = useContext(UserStore);
  const {
    loggedIn
  } = userStore;

  const cookies = new Cookies();
  const jwt = cookies.get('jwt')

  // useEffect(() => {
  //   if (false) {
  //     setTrigger(true);
  //   }
  //   else {
  //     setTrigger(false)
  //   }

  // }, []);
    
  var navbar;
  // if (loggedIn) {
  if (jwt !== null && jwt !== '' && typeof jwt !== 'undefined') {
      return (<NavBarAuth />) ;
  } else {
    return (<NavBarUnauth />) ;
  }
};

export default observer(NavBar);
