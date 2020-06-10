import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAtom } from "../../app/models/atom";

export const ActivityListItem: React.FC<{ atom: IAtom }> = ({
  atom: atom,
}) => {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group> 
            {/* item group is required for styling to work correctly for items */}
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{atom.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="marker" /> {atom.venue}, {atom.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{atom.description}</span>
        <Button
          as={Link}
          to={`/activities/${atom.id}`}
          // onClick={() => selectActivity(activity.id)}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};
