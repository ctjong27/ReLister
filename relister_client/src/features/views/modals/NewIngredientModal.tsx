import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import IngredientForm from "../forms/IngredientForm";

const NewIngredientModal: React.FC = () => {
  const [modelIsOpen, triggerModalView] = useState<boolean>(false);

  return (
    <Modal
      onClose={() => triggerModalView(false)}
      open={modelIsOpen}
      trigger={
        <Button
          onClick={() => triggerModalView(true)}
          as="a"
          style={{ marginLeft: "0.5em" }}
        >
          New Ingredient
        </Button>
      }
    >
      <Modal.Header>New Ingredient</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <IngredientForm triggerModalView={triggerModalView} ingredientId={''} isNewIngredient={true}/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(NewIngredientModal);
