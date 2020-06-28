import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import { observer } from "mobx-react-lite";
import UserStore from "../../../app/stores/userStore";
import { NavLink } from "react-router-dom";

const SignoutDashboard: React.FC = () => {
  const userStore = useContext(UserStore);
  const {
    signoutUser,
  } = userStore;

  const [model_open, triggerModalView] = useState<boolean>(false);

  return (
    <Modal
      closeIcon
      onClose={() => triggerModalView(false)}
      open={model_open}
      // onActionClick={}
      trigger={
        <Button
          primary
          as="a"
          onClick={() => triggerModalView(true)}
          style={{ marginLeft: "0.5em" }}
        >
          Sign Out
        </Button>
      }
    >
      <Modal.Header>Sign Out</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Button
            as="a"
            floated="right"
            onClick={() => triggerModalView(false)}
            style={{ marginLeft: "0.5em" }}
          >
            Cancel
          </Button>
          <Button
            // as="a"
            floated="right"
            as={NavLink}
            exact
            to="/"
            onClick={signoutUser}
            style={{ marginLeft: "0.5em" }}
          >
            Yes
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(SignoutDashboard);