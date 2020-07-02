import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IIngredient } from "../../../app/models/ingredient";
import { Form as FinalForm, Field, Form } from "react-final-form";
import NumberInput from "../../../app/common/form/NumberInput";
import UpdateAmountModal from "../modals/UpdateAmountModal";
import EditIngredientModal from "../modals/EditIngredientModal";

const IngredientListItem: React.FC<{ ingredient: IIngredient, filterType:string }> = ({
  ingredient,
  filterType
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
          <UpdateAmountModal
            ingredientId={ingredient.id}
            actualAmount={ingredient.actual_amount}
            filterType={filterType}/>
        </Item>
      </Item.Group>
    </Segment.Group>
  );
};

export { IngredientListItem };
