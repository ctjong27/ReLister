import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import IngredientList from "./IngredientList";
import { observer } from "mobx-react-lite";
// import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import IngredientStore from "../../app/stores/ingredientStore";

const ActivityDashboard: React.FC = () => {
  const ingredientStore = useContext(IngredientStore);

  useEffect(() => {
    ingredientStore.loadIngredients();
  }, [ingredientStore]);

  // // mobx-react-lite turns react components into observers that detects changes in observables
  // if (activityStore.loadingInitial)
  //   return <LoadingComponent content="Loading activities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <IngredientList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
