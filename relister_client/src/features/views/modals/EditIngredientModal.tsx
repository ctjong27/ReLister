import { useContext, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import IngredientForm from "../forms/IngredientForm";

interface IProps {
  ingredientId: string;
}

const EditIngredientModal: React.FC<IProps> = ({ingredientId}) => {
  const [modelIsOpen, triggerModalView] = useState<boolean>(false);

  return (
    <Modal
      onClose={() => triggerModalView(false)}
      open={modelIsOpen}
      trigger={
        <Button
          color='orange'
          onClick={() => triggerModalView(true)}
          style={{ marginLeft: "0.5em" }}
        >
          Edit
        </Button>
      }
    >
      <Modal.Header>Edit Ingredient</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <IngredientForm triggerModalView={triggerModalView} ingredientId={ingredientId} isNewIngredient={false}/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default observer(EditIngredientModal);
