import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

// FieldRenderProps comes in from React Final Form
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  //!!error returns true if it exists
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {/* returning properties of input */}
      {/* input handles and returns onchange handler (passed in by react final form), etc */}
      <input {...input} placeholder={placeholder} type="text" />
      {/* if touched and is in error, then show label */}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;