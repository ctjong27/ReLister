import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import AtomList from "./AtomList";
import { observer } from "mobx-react-lite";
// import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import AtomStore from "../../app/stores/atomStore";

const ActivityDashboard: React.FC = () => {
  const atomStore = useContext(AtomStore);

  useEffect(() => {
    atomStore.loadAtoms();
  }, [atomStore]);

  // // mobx-react-lite turns react components into observers that detects changes in observables
  // if (activityStore.loadingInitial)
  //   return <LoadingComponent content="Loading activities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <AtomList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
