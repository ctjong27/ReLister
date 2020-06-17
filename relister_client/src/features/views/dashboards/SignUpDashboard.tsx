import { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import SignUpForm from "../forms/SignUpForm";

const SignUpDashboard: React.FC = () => {
  
  return (
  <Modal trigger=
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
        <SignUpForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
};

export default observer(SignUpDashboard);