import React, { useContext, useEffect, Fragment } from "react";
import { Grid, Button } from "semantic-ui-react";
import IngredientList from "../lists/IngredientList";
import { observer } from "mobx-react-lite";
// import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import IngredientStore from "../../../app/stores/ingredientStore";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const IngredientListDashboard: React.FC = () => {
  const ingredientStore = useContext(IngredientStore);

  useEffect(() => {
    ingredientStore.loadIngredients();
  }, [ingredientStore]);

  // // mobx-react-lite turns react components into observers that detects changes in observables
  if (ingredientStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Fragment>
      <Grid centered>
        <Grid.Column width={10}>
          <Button color='green' floated="right">Shop</Button>
          <br/>
          <br/>
          <IngredientList />
        </Grid.Column>
        {/* <Grid.Column width={6}>
        <h2>Ingredient filters</h2>
      </Grid.Column> */}
      </Grid>
    </Fragment>
  );
};

export default observer(IngredientListDashboard);
