import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IIngredient } from "../../app/models/ingredient";

export const IngredientListItem: React.FC<{ ingredient: IIngredient }> = ({
  ingredient: ingredient,
}) => {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group> 
            {/* item group is required for styling to work correctly for items */}
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{ingredient.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="marker" /> {ingredient.venue}, {ingredient.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{ingredient.description}</span>
        <Button
          as={Link}
          to={`/activities/${ingredient.id}`}
          // onClick={() => selectActivity(activity.id)}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};
