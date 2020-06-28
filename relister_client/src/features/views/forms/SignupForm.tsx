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
} from "revalidate";
import UserStore from "../../../app/stores/userStore";
import { UserFormValues } from "../../../app/models/user";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";

const validate = combineValidators({
  username: isRequired("Username"),
  password: isRequired("Password"),
});

interface IProps {
  signUpSubmitted(): void;
}

// const UserForm: React.FC<RouteComponentProps<DetailParams>> = ({
const SignupForm: React.FC<IProps> = ({signUpSubmitted}) => {
  const userStore = useContext(UserStore);
  const {
    registerUser,
    editUser,
    submitting,
    // user: initialFormState,
    // clearUser,
  } = userStore;

  const [user, setUser] = useState(new UserFormValues());
  const [loading, setLoading] = useState(false);

  const handleFinalFormSubmit = (values: any) => {
    const { date, time, ...user } = values;
    // user.date = dateAndTime;

    if (!user.id) {
      let newUser = {
        ...user,
        // id: uuid(), // generates a new guid
      };
      registerUser(newUser);
    } else {
      editUser(user);
    }
    signUpSubmitted();
  };

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        initialValues={user}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field
              name="username"
              placeholder="Username"
              value={user.username}
              component={TextInput}
            />
            <Field
              name="password"
              placeholder="Password"
              value={user.username}
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
  );
};

export default observer(SignupForm);
