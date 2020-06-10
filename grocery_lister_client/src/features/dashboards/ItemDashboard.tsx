import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ItemStore from '../../app/stores/itemStore'
// import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const ItemDashboard: React.FC = () => {
  const activityStore = useContext(ItemStore);

  // useEffect is similar to multiple functionality including componentDidMount
  // previous data stored in activityStore.js
  // since function is being used within useEffect, we need to tell useEffect about dependencies it needs in dependency array
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  // mobx-react-lite turns react components into observers that detects changes in observables
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
