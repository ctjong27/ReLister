import React, { useContext, useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import IngredientListDashboard from "../views/dashboards/IngredientListDashboard";
import IngredientStore from "../../app/stores/ingredientStore";

const PantryListPage: React.FC = () => {
  const ingredientStore = useContext(IngredientStore);
  ingredientStore.clearIngredients()
  return (
      <IngredientListDashboard filterType={'pantry'} />
  );
};

export default observer(PantryListPage);
