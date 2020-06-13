import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import RecipeStore from "../../../app/stores/recipeStore";
import { RecipeListItem } from "../listitems/RecipeListItem";

const RecipeList: React.FC = () => {
  const recipeStore = useContext(RecipeStore);
  // calculated object is returned from recipeStore
  const {recipesByUser} = recipeStore;
  return (
    <Fragment>
      {recipesByUser.map(([user, recipes]) => (
        <Fragment key={user} >
          <Label size="large" color="blue">
            {user}
          </Label>
          <Item.Group divided>
            {recipes.map((recipe) => (
              <RecipeListItem key={recipe.id} recipe={recipe} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(RecipeList);