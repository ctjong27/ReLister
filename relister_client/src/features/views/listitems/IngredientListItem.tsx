import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IIngredient } from "../../../app/models/ingredient";
import { Form as FinalForm, Field, Form } from "react-final-form";
import NumberInput from "../../../app/common/form/NumberInput";

const IngredientListItem: React.FC<{ ingredient: IIngredient }> = ({
  ingredient,
}) => {
  const handleFinalFormSubmit = (values: any) => {};

  return (
    <Segment.Group>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{ingredient.name}</Item.Header>
              <Item.Description>
                {ingredient.actual_amount} out of {ingredient.total_amount}{" "}
              </Item.Description>
            </Item.Content>
          </Item>
          
          {/* <FinalForm
            // validate={validate}
            initialValues={ingredient}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} 
              // loading={loading}
              >
                  <label>Name</label>
                  <Field
                    name="name"
                    // placeholder="Name"
                    value={ingredient.name}
                    component={NumberInput}
                  />
                  </Form>
                  )}
            /> */}
        </Item.Group>

      {/* <FinalForm onSubmit={handleFinalFormSubmit}
      >
          <Field
            name="change_amount"
            // placeholder="Total Amount"
            component={NumberInput}
          />
      </FinalForm> */}


      
      {/* <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as="a">{ingredient.name}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="marker" /> {ingredient.name}, {ingredient.name}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{ingredient.name}</span>
        <Button
          as={Link}
          to={`/activities/${ingredient.id}`}
          // onClick={() => selectActivity(activity.id)}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment> */}
    </Segment.Group>
  );
};


export { IngredientListItem };