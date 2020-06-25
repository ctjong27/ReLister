import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import LoginForm from "../forms/LoginForm";
import UserStore from "../../../app/stores/userStore";
import { NavLink } from "react-router-dom";

const SignoutDashboard: React.FC = () => {
  const userStore = useContext(UserStore);
  const {
    signoutUser,
    user
  } = userStore;
  

  const handleSignout = (values: any) => {
    const { date, time, ...user } = values;
    console.log(user)
    signoutUser();
  };

//   const closeModal = () {
//     this.setState({isOpen: !this.state.isOpen});
//  }

  const [model_open, triggerModalView] = useState<boolean>(false);


  
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     modalOpen: false,
  //     valueIntoModal: "123456abcdef"
  //   }
  // }

  // return (
  //   <Modal
  //     trigger={<Button>Basic Modal</Button>}
  //     // basic
  //     size='small'
  //     header={{ icon: 'archive', content: 'Archive Old Messages' }}
  //     content='Your inbox is getting full, would you like us to enable automatic archiving of old messages?'
  //     actions={[
  //       { basic: true, color: 'red', inverted: true, icon: 'remove', content: 'No',  },
  //       { color: 'green', inverted: true, icon: 'checkmark', content: 'Yes' },
  //     ]}
  //   />

  return (
    <Modal
      closeIcon
      onClose={() => triggerModalView(false)}
      open={model_open}
      // onActionClick={}
      trigger={
        <Button
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
          {/* <LoginForm /> */}

          <Button
            as="a"
            onClick={() => triggerModalView(false)}
            style={{ marginLeft: "0.5em" }}
          >
            Cancel
          </Button>
          <Button
            // as="a"
            as={NavLink}
            exact
            to="/"
            // onClick={() => {
            //   signoutUser;
            //   () => triggerModalView(false);
            // }}
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