import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IIngredient } from "../../../app/models/ingredient";

export const IngredientListItem: React.FC<{ ingredient: IIngredient }> = ({
  ingredient,
}) => {
  console.log("test")
  return (
    <Segment.Group>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{ingredient.name}</Item.Header>
            <Item.Description>{ingredient.actual_amount} out of {ingredient.total_amount} </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
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
