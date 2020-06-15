import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan, isRequiredIf } from "revalidate";
import IngredientStore from "../../app/stores/ingredientStore";
import { IngredientFormValues } from "../../app/models/ingredient";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { SelectInput } from "../../app/common/form/SelectInput";
import { TextAreaInput } from "../../app/common/form/TextAreaInput";
import NumberInput from "../../app/common/form/NumberInput";

const validate = combineValidators({
  name: isRequired({message: 'Name is required'}),
  // missing_amount: isRequiredIf({field:cityIsNotEmpty},{message: 'Description needs to be at least 4 characters'}),
  actual_amount: isRequired({message: 'Actual Amount is required'}),
  total_amount: isRequired({message: 'Total Amount is required'}),
  unit: isRequired({message: 'Unit is required'}),
  
// const composeValidators = (...validators:any) => (value:any) =>
// validators.reduce((error, validator) => error || validator(value), undefined)

  category: isRequired('Category'),
  // multiple validations through composeValidators
  description: composeValidators(
    isRequired('Description'),
    // message is config
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 4 characters'}))(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time'),
})

const IngredientForm: React.FC = ({
}) => {
  const ingredientStore = useContext(IngredientStore);
  const {
    createIngredient,
    editIngredient,
    submitting,
    // ingredient: initialFormState,
    loadIngredient,
    // clearIngredient,
  } = ingredientStore;

  const [ingredient, setIngredient] = useState(new IngredientFormValues());

  const [loading, setLoading] = useState(false);

  const handleFinalFormSubmit = (values: any) => {
    const { date, time, ...ingredient } = values;
    // ingredient.date = dateAndTime;

    if (!ingredient.id) {
      let newIngredient = {
        ...ingredient,
        id: uuid(), // generates a new guid
      };
      createIngredient(newIngredient);
    } else {
      editIngredient(ingredient);
    }
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
                <Field
                  name="name"
                  placeholder="Name"
                  value={ingredient.name}
                  component={TextInput}
                />
                <Field
                  name="missing_amount"
                  placeholder="Missing Amount"
                  // value={(parseInt(ingredient.total_amount) - parseInt(ingredient.actual_amount)).toString}
                  value={(parseInt(ingredient.total_amount) - parseInt(ingredient.actual_amount)).toString()}
                  component={NumberInput}
                />
                <Field
                  name="actual_amount"
                  placeholder="Actual Amount"
                  value={ingredient.actual_amount}
                  component={NumberInput}
                />
                <Field
                  name="total_amount"
                  placeholder="Total Amount"
                  value={ingredient.total_amount}
                  component={NumberInput}
                />
                <Field
                  name="unit"
                  placeholder="Unit"
                  value={ingredient.unit}
                  component={TextInput}
                />
                <Button
                  // adding a loading indicator
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  disabled={loading || pristine || invalid}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(IngredientForm);
