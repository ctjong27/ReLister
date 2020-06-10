import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityListItem } from "./ActivityListItem";
import itemStore from "../../app/stores/itemStore";

// react.fc allows me to pass in parameters as indicated in type
// OH! React.FC<t> means I get to specify what type is passed in
const ActivityList: React.FC = () => {
  const itemStore = useContext(itemStore);
  const {itemsByDate} = itemStore;
  return (
    <Fragment>
      {itemsByDate.map(([item, activities]) => (
        <Fragment key={group} >
          <Label size="large" color="blue">
            {group}
          </Label>
          {/*  clearing removes any float to prevent flaoting funkiness */}
          {/* adds divider between each item */}
          <Item.Group divided>
            {activities.map((item) => (
              <ActivityListItem key={item.id} activity={item} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);