import React from 'react'
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

export const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
//   type, // always going to be text area
  placeholder,
  rows,
  meta: { touched, error },
}) => {
    return (
      <Form.Field error={touched && !!error} width={width}>
        {/* returning properties of input */}
        {/* returns onchange handler, etc */}
        <textarea rows={rows} {...input} placeholder={placeholder} />
        {/* if touched and is in error, then show label */}
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
};
