import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IIngredient } from "../../../app/models/ingredient";
import { Form as FinalForm, Field, Form } from "react-final-form";
import NumberInput from "../../../app/common/form/NumberInput";
import BuyIngredientModal from "../modals/BuyIngredientModal";
import EditIngredientModal from "../modals/EditIngredientModal";

const IngredientListItem: React.FC<{ ingredient: IIngredient }> = ({
  ingredient,
}) => {
  const handleFinalFormSubmit = (values: any) => {};

  return (
    <Segment.Group>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{ingredient.name}</Item.Header>
            <Item.Description>
              {ingredient.actual_amount} out of {ingredient.total_amount}{" "}
            </Item.Description>
          </Item.Content>
          <EditIngredientModal 
            ingredientId={ingredient.id}/>
          <BuyIngredientModal
            ingredientId={ingredient.id}
            actualAmount={ingredient.actual_amount}/>
        </Item>
      </Item.Group>
    </Segment.Group>
  );
};

export { IngredientListItem };
