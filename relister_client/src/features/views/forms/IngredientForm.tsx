import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
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

const validate = combineValidators({
  name: isRequired({ message: "Name is required" }),
  // missing_amount: isRequiredIf({field:cityIsNotEmpty},{message: 'Description needs to be at least 4 characters'}),
  // missing_amount: isRequired({message: 'Missing Amount is required'}),
  actual_amount: isRequired({ message: "Actual Amount is required" }),
  total_amount: isRequired({ message: "Total Amount is required" }),
  unit: isRequired({ message: "Unit is required" }),

  // const composeValidators = (...validators:any) => (value:any) =>
  // validators.reduce((error, validator) => error || validator(value), undefined)
});

interface IProps {
  triggerModalView(active: boolean): void;
  ingredientId: string;
  isNewIngredient: boolean;
}

const IngredientForm: React.FC<IProps> = ({
  triggerModalView,
  ingredientId,
  isNewIngredient,
}) => {
  const ingredientStore = useContext(IngredientStore);
  const {
    loadIngredient,
    createIngredient,
    editIngredient,
    submitting,
  } = ingredientStore;

  const userStore = useContext(UserStore);
  const { user } = userStore;
  const [ingredient, setIngredient] = useState(new IngredientFormValues());
  const [loading, setLoading] = useState(false);

  // set effect
  useEffect(() => {
    if (ingredientId !== '') {
      setLoading(true);

      loadIngredient(ingredientId)
        .then(
          (ingredient) => setIngredient(new IngredientFormValues(ingredient))
        )
        .finally(() => setLoading(false));
    }
  }, [ingredientId,
    loadIngredient,
    setIngredient]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...ingredient } = values;

    if (!ingredient.id) {
      let recipeId = ingredient.relist ? "1" : "0";

      let newIngredient: IIngredient = {
        ...ingredient,
        recipe_id: recipeId,
      };
      createIngredient(newIngredient, recipeId, user!.id);
    } else {
      editIngredient(ingredient);
    }
    triggerModalView(false);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={ingredient}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <label>Name</label>
                <Field
                  name="name"
                  value={ingredient.name}
                  component={TextInput}
                />

                <label>Actual Amount</label>
                <Field
                  name="actual_amount"
                  value={ingredient.actual_amount}
                  component={NumberInput}
                />

                <label>Total Amount</label>
                <Field
                  name="total_amount"
                  value={ingredient.total_amount}
                  component={NumberInput}
                />

                <label>Unit</label>
                <Field
                  name="unit"
                  value={ingredient.unit}
                  component={TextInput}
                />

                <label>Re-List</label>
                <Field
                  name="relist"
                  component="input"
                  type="checkbox"
                  format={(v) => v === true}
                  parse={(v) => (v ? true : false)}
                  style={{ marginLeft: "1.0em" }}
                />

                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  disabled={loading || pristine || invalid}
                />
                {/* https://codesandbox.io/s/rough-field-ufrpx?file=/index.js:1121-1206 */}
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(IngredientForm);
