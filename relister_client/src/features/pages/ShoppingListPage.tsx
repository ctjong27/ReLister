import React, { useContext, useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import IngredientListDashboard from "../views/dashboards/IngredientListDashboard";
import IngredientStore from "../../app/stores/ingredientStore";

const ShoppingListPage: React.FC = () => {
  const ingredientStore = useContext(IngredientStore);
  ingredientStore.clearIngredients()
  console.log('shoppinglistpage.tsx=shopping')
  return (
      <IngredientListDashboard filterType={'shopping'} />
  );
};

export default observer(ShoppingListPage);
