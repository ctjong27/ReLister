import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import SignupForm from "../forms/SignupForm";
import { toast } from "react-toastify";

const SignupDashboard: React.FC = () => {
  const [modelIsOpen, triggerModalView] = useState<boolean>(false);

  const signUpSubmitted = () => {
    triggerModalView(false);
    toast.success('Sign Up Completed!');
  }

  return (
    <Modal
      onClose={() => triggerModalView(false)}
      open={modelIsOpen}
      closeIcon
      trigger={
        <Button
          as="a"
          onClick={() => triggerModalView(true)}
          primary
          style={{ marginLeft: "0.5em" }}
        >
          Sign Up
        </Button>
      }
    >
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <SignupForm signUpSubmitted={signUpSubmitted} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(SignupDashboard);
