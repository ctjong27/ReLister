import { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import SignupForm from "../forms/SignupForm";

const SignupDashboard: React.FC = () => {
  
  return (
  <Modal closeIcon trigger=
    {
      <Button
        as="a"
        primary
        style={{ marginLeft: "0.5em" }}
      >
        Sign Up
      </Button>}>
    <Modal.Header>Sign Up</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <SignupForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
};

export default observer(SignupDashboard);