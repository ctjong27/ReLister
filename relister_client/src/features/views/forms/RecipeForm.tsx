import React, { useState, useContext, useEffect, SetStateAction, Dispatch } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import RecipeStore from "../../../app/stores/recipeStore";
import { RecipeFormValues } from "../../../app/models/recipe";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import UserStore from "../../../app/stores/userStore";

const validate = combineValidators({
  // date: isRequired('Date'),
  // time: isRequired('Time'),
});

interface IProps {
  triggerModalView(active: boolean): void;
}

const RecipeForm: React.FC<IProps> = ({triggerModalView}) => {

  const recipeStore = useContext(RecipeStore);
  const {
    createRecipe,
    editRecipe,
    submitting,
  } = recipeStore;

  const userStore = useContext(UserStore);
  const { user } = userStore;

  const [recipe, setRecipe] = useState(new RecipeFormValues());

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (match.params.id) {
  //     setLoading(true);

  //     loadRecipe(match.params.id)
  //       .then(
  //         (recipe) => setRecipe(new RecipeFormValues(recipe))
  //       )
  //       .finally(() => setLoading(false));
  //   }

  // }, [
  //   match.params.id,
  //   loadRecipe,
  // ]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...recipe } = values;
    // recipe.date = dateAndTime;

    if (!recipe.id) {
      let newRecipe = {
        ...recipe,
        // id: uuid(), // generates a new guid
      };
      if (user !== null) {
        createRecipe(newRecipe, user.id);
      }
    } else {
      editRecipe(recipe);
    }

    triggerModalView(false)
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={recipe}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="name"
                  placeholder="Name"
                  value={recipe.name}
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
                {/* <Button
                  onClick={
                    recipe.id
                      ? () => history.push(`/activities/${recipe.id}`)
                      : () => history.push(`/activities`)
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
                /> */}
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(RecipeForm);
