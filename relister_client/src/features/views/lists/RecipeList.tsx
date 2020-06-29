import React, { useContext, Fragment } from "react";
import { Item, Label, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import RecipeStore from "../../../app/stores/recipeStore";
import { RecipeListItem } from "../listitems/RecipeListItem";
import EditRecipeDashboard from "../dashboards/EditRecipeDashboard";

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
              <Item>
                <RecipeListItem key={recipe.id} recipe={recipe} />
                <EditRecipeDashboard />
              </Item>
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(RecipeList);