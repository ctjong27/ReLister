import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IngredientListItem } from "../listitems/IngredientListItem";
import IngredientStore from "../../../app/stores/ingredientStore";

// react.fc allows me to pass in parameters as indicated in type
// OH! React.FC<t> means I get to specify what type is passed in
const IngredientList: React.FC = () => {
  const ingredientStore = useContext(IngredientStore);
  const {ingredientsByRecipe} = ingredientStore;
  console.log(ingredientsByRecipe)
  return (
    <Fragment>
      {ingredientsByRecipe.map(([group, ingredients]) => (
        <Fragment key={group} >
          <Label size="large" color="blue">
            {group}
          </Label>
          {/*  clearing removes any float to prevent flaoting funkiness */}
          {/* adds divider between each item */}
          <Item.Group divided>
            {ingredients.map((ingredient) => (
              <IngredientListItem key={ingredient.id} ingredient={ingredient} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(IngredientList);