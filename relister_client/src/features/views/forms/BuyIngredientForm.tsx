import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid, Item, Icon } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  isRequiredIf,
} from "revalidate";
import IngredientStore from "../../../app/stores/ingredientStore";
import UserStore from "../../../app/stores/userStore";
import {
  IngredientFormValues,
  IIngredient,
} from "../../../app/models/ingredient";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import NumberInput from "../../../app/common/form/NumberInput";

interface IProps {
  triggerModalView(active: boolean): void;
}

const IngredientForm: React.FC<IProps> = ({ triggerModalView }) => {
    
  const ingredientStore = useContext(IngredientStore);
  const userStore = useContext(UserStore);

  const { createIngredient, editIngredient, submitting } = ingredientStore;
  const { user } = userStore;

  const [ingredient, setIngredient] = useState(new IngredientFormValues());
  const [loading, setLoading] = useState(false);

  
  const handleFinalFormSubmit = (values: any) => {
    const { ...ingredient } = values;

    if (!ingredient.id) {
      // console.log(newIngredient);
      let recipeId = ingredient.relist ? "1" : "0";

      let newIngredient: IIngredient = {
        ...ingredient,
        recipe_id: recipeId,
        // id: uuid(), // generates a new guid
      };
      createIngredient(newIngredient, recipeId, user!.id);
    } else {
      editIngredient(ingredient);
    }
    triggerModalView(false);
  };

  return (
    <Segment clearing>
      <Grid centered>
        <FinalForm
        //   validate={validate}
          initialValues={ingredient}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              <Item.Group>
                <Item>
                  <Button>
                    <Icon name="minus" />
                  </Button>
                  <Field
                    name="actual_amount"
                    // placeholder="Actual Amount"
                    value={ingredient.actual_amount}
                    component={NumberInput}
                  />
                  <Button>
                    <Icon name="plus" />
                  </Button>
                </Item>
              </Item.Group>

              <Button
                // adding a loading indicator
                loading={submitting}
                floated="right"
                positive
                type="submit"
                content="Submit"
                disabled={loading || pristine || invalid}
              />
              <Button
                as="a"
                floated="right"
                onClick={() => triggerModalView(false)}
                style={{ marginLeft: "0.5em" }}
              >
                Cancel
              </Button>
            </Form>
          )}
        />
      </Grid>
    </Segment>
  );
};

export default observer(IngredientForm);
