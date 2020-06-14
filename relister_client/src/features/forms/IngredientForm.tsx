import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from "revalidate";
import IngredientStore from "../../app/stores/ingredientStore";
import { IngredientFormValues } from "../../app/models/ingredient";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { SelectInput } from "../../app/common/form/SelectInput";
import { TextAreaInput } from "../../app/common/form/TextAreaInput";

const validate = combineValidators({
  title: isRequired({message: 'Event title is required'}), // custom message
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

interface DetailParams {
  id: string;
}

const IngredientForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
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

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);

      loadIngredient(match.params.id)
        .then(
          (ingredient) => setIngredient(new IngredientFormValues(ingredient))
        )
        .finally(() => setLoading(false));
    }

  }, [
    match.params.id,
    loadIngredient,
  ]);

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
        {/* <Segment clearing loading={loading}> */}
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={ingredient}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                {/* <Form.Input */}
                <Field
                  // onChange={handleInputChange}
                  name="title"
                  placeholder="Title"
                  value={ingredient.name}
                  component={TextInput}
                />
                {/* <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={ingredient.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  value={ingredient.category}
                  component={SelectInput}
                  options={category}
                /> */}
                {/* <Form.Group widths="equal">
                  <Field<Date>
                    name="date"
                    placeholder="Date"
                    value={ingredient.date}
                    date={true}
                    component={DateInput}
                  />
                  <Field<Date>
                    name="time"
                    placeholder="Time"
                    value={ingredient.time}
                    time={true}
                    component={DateInput}
                  />
                </Form.Group> */}
                <Field
                  name="actual_amount"
                  placeholder="Actual Amount"
                  value={ingredient.actual_amount}
                  component={TextInput}
                />
                <Field
                  name="total_amount"
                  placeholder="Total Amount"
                  value={ingredient.total_amount}
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
                <Button
                  onClick={
                    ingredient.id
                      ? () => history.push(`/activities/${ingredient.id}`)
                      : () => history.push(`/activities`)
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
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
