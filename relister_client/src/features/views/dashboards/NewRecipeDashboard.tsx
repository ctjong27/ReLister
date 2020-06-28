import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";

const NewRecipeDashboard: React.FC = () => {
  const [modelIsOpen, triggerModalView] = useState<boolean>(false);

  return (
    <Modal
      onClose={() => triggerModalView(false)}
      open={modelIsOpen}
      trigger={
        <Button
          onClick={() => triggerModalView(true)}
          floated="right"
          primary
          as="a"
          style={{ marginLeft: "0.5em" }}
        >
          New Recipe
        </Button>
      }
    >
      <Modal.Header>New Recipe Name</Modal.Header>
      <Modal.Content image>
        {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
        <Modal.Description>
          <RecipeForm triggerModalView={triggerModalView} />
          {/* <Header>Default Profile Image</Header>
        <p>
          We've found the followiasdfng gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?asdf</p> */}
          {/* <Modal.Actions>
          <NewRecipeDashboard />
        </Modal.Actions> */}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(NewRecipeDashboard);

// import { Component } from "react";
// import React from "react";
// import { Button, Icon, Modal, ButtonGroup } from "semantic-ui-react";
// import RecipeForm from "../../forms/RecipeForm";

// // const NewRecipeDashboard: React.FC {
// // const NewRecipeDashboard: React.FC<RouteComponentProps> = ({ location }) => {
// class NewRecipeDashboard extends Component {
//   state = { open: false };

//   open = () => this.setState({ open: true });
//   close = () => this.setState({ open: false });

//   render() {
//     const { open } = this.state;

//     return (
//       <Modal
//         open={open}
//         onOpen={this.open}
//         onClose={this.close}
//         size="small"
//         trigger={
//           <ButtonGroup floated="right">
//             <Button
//               // primary
//               icon
//               color="green"
//             >
//               Add New Recipe
//               {/* <Icon name='right chevron' /> */}
//             </Button>
//           </ButtonGroup>
//         }
//       >
//         <Modal.Header>Modal #2</Modal.Header>
//         <Modal.Content>
//           <RecipeForm />
//           <p>That's everythingasdasd!</p>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button icon="check" content="All Done" onClick={this.close} />
//         </Modal.Actions>
//       </Modal>
//     );
//   }
// }

// export default NewRecipeDashboard;
