import { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import LoginForm from "../forms/LoginForm";

const LoginDashboard: React.FC = () => {
  
  return (
  <Modal closeIcon trigger=
    {
      <Button
        as="a"
        style={{ marginLeft: "0.5em" }}
      >
        Log In
      </Button>}>
    <Modal.Header>Log In</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <LoginForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
};

export default observer(LoginDashboard);