import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import IngredientForm from "../forms/IngredientForm";
import BuyIngredientForm from "../forms/BuyIngredientForm";

interface IProps {
    ingredientId: string;
    actualAmount: string;
  }

const BuyIngredientModal: React.FC<IProps> = ({ingredientId, actualAmount}) => {
  const [modelIsOpen, triggerModalView] = useState<boolean>(false);

  return (
    <Modal
      onClose={() => triggerModalView(false)}
      closeIcon
      open={modelIsOpen}
      trigger={
        <Button
          floated="right"
          color="orange"
          onClick={() => triggerModalView(true)}
        //   as="a"
          style={{ marginLeft: "0.5em" }}
        >
          Buy
        </Button>
      }
    >
      <Modal.Header>New Ingredient</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <BuyIngredientForm triggerModalView={triggerModalView} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(BuyIngredientModal);
