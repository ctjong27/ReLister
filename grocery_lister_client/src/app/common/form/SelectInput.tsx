import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

export const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* Select does nto handle onchange like input */}
      <Select
        value={input.value}
        // onChange spits out event and data that contains information about what is selected
        onChange={(e, data) => input.onChange(data.value)}
        // input.onChange() sets input's data to data's value above
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
