import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityListItem } from "./AtomListItem";
import AtomStore from "../../app/stores/atomStore";

// react.fc allows me to pass in parameters as indicated in type
// OH! React.FC<t> means I get to specify what type is passed in
const AtomList: React.FC = () => {
  const atomStore = useContext(AtomStore);
  const {atomsByDate} = atomStore;
  return (
    <Fragment>
      {atomsByDate.map(([group, atoms]) => (
        <Fragment key={group} >
          <Label size="large" color="blue">
            {group}
          </Label>
          {/*  clearing removes any float to prevent flaoting funkiness */}
          {/* adds divider between each item */}
          <Item.Group divided>
            {atoms.map((atom) => (
              <ActivityListItem key={atom.id} atom={atom} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(AtomList);