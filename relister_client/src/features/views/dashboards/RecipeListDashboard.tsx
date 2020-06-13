import React, { useContext, Fragment, useEffect } from "react";
import { Item, Label, Modal, Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IngredientListItem } from "../listitems/IngredientListItem";
import RecipeStore from "../../../app/stores/recipeStore";
import AddRecipe from "./NewRecipeDashboard";
import RecipeList from "../lists/RecipeList";

const RecipeListDashboard: React.FC = () => {
  const recipeStore = useContext(RecipeStore);

  useEffect(() => {
    recipeStore.loadRecipes();
  }, [recipeStore]);

  return (
  <Modal trigger={<Button>Add Group</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
      <Modal.Description>
        <RecipeList />
        {/* <Header>Default Profile Image</Header>
        <p>
          We've found the followiasdfng gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?asdf</p> */}
        <Modal.Actions>
          <AddRecipe />
        </Modal.Actions>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
};

export default observer(RecipeListDashboard);