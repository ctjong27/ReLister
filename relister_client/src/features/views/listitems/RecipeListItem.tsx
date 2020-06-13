import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IIngredient } from "../../../app/models/ingredient";
import { IRecipe } from "../../../app/models/recipe";

export const RecipeListItem: React.FC<{ recipe: IRecipe }> = ({
    recipe,
}) => {
  console.log("test")
  return (
    <Segment.Group>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{recipe.name}</Item.Header>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment.Group>
  );
};
