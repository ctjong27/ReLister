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

export interface IUpdatedAmountValue {
  amount: number;
}

export class UpdatedAmountValue {
  amount: number = 55;

  constructor(init?: IUpdatedAmountValue) {
    Object.assign(this, init);
  }
}

interface IProps {
  triggerModalView(active: boolean): void;
  ingredientId: string;
  actualAmount: number;
}

const BuyIngredientForm: React.FC<IProps> = ({
  triggerModalView,
  ingredientId,
  actualAmount,
}) => {
  const ingredientStore = useContext(IngredientStore);
  const userStore = useContext(UserStore);

  const {
    createIngredient,
    editIngredient,
    loadIngredient,
    submitting,
  } = ingredientStore;
  const { user } = userStore;

  const [loading, setLoading] = useState(false);
  // const [ingredient, setIngredient] = useState(new IngredientFormValues());
  // const [updatedAmount, setUpdatedAmount] = useState(new UpdatedAmountValue());

  // useEffect(() => {
  //   setIngredient(new IngredientFormValues())
  //   setUpdatedAmount(new UpdatedAmountValue())
  // }, [
  //   setIngredient,
  //   setUpdatedAmount,
  // ]);

  const handleFinalFormSubmit = (values: any) => {
    setLoading(true);

    const { actualAmount } = values;

    loadIngredient(ingredientId)
      .then(
        // () => initialFormState && setActivity(initialFormState)
        // activity is promise returned from activityStore
        (ingredient) => {
          editIngredient({
            ...ingredient,
            actual_amount: ingredient.actual_amount + Number(actualAmount),
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <Segment clearing>
      <Grid centered>
        <FinalForm
          //   validate={validate}
          // initialValues={updatedAmount}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, pristine }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              <Item.Group>
                <Item>
                  <Field name="actualAmount" component={NumberInput} />
                </Item>
              </Item.Group>

              <Button
                loading={submitting}
                floated="right"
                positive
                type="submit"
                content="Submit"
                disabled={loading || pristine}
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

export default observer(BuyIngredientForm);
