import { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";
import React from "react";
import RecipeForm from "../../forms/RecipeForm";
import { observer } from "mobx-react-lite";
import IngredientForm from "../../forms/IngredientForm";

const NewIngredientDashboard: React.FC = () => {
  
  return (
  <Modal trigger=
    {
    <Button
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
        <IngredientForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
};

export default observer(NewIngredientDashboard);
