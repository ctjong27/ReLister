import { observable, action, computed, configure, runInAction } from 'mobx';
import { IIngredient } from '../models/ingredient';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import agent from '../api/agent';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class IngredientStore {

  @observable ingredientRegistry = new Map(); // allows changed map or new entries to refresh everything
  @observable ingredient: IIngredient | null = null;
  @observable loadingInitial = false;
  //   @observable submitting = false;
  //   @observable target = '';

  @computed get ingredientsByRecipe() {
    // console.log(this.groupIngredientsByRecipe(Array.from(this.ingredientRegistry.values())));
    return this.groupIngredientsByRecipe(Array.from(this.ingredientRegistry.values()));
  }

  groupIngredientsByRecipe(ingredients: IIngredient[]) {
    const sortedIngredients = ingredients.sort(
      // (a, b) => a.recipe_id - b.recipe_id
      (a, b) => parseInt(a.recipe_id) - parseInt(b.recipe_id)
      // (a, b) => (a.recipe_id).localeCompare(b.recipe_id)
    )

    return Object.entries(sortedIngredients.reduce((ingredients, ingredient) => {
      const recipeId = ingredient.recipe_id
      // if ingredient with recipeId is found, add it to the list, else make an ew list
      ingredients[recipeId] = ingredients[recipeId] ? [...ingredients[recipeId], ingredient] : [ingredient];
      return ingredients;
    },
    {} as { [key: string]: IIngredient[] }));
  }

  @action loadIngredients = async () => {
    this.loadingInitial = true;
    try {
      // this returns result of promise
      const ingredients = await agent.Ingredients.list();
      runInAction('loading activities', () => {
        ingredients.forEach((ingredient) => {
          this.ingredientRegistry.set(ingredient.id, ingredient); // setting map
        });
        this.loadingInitial = false;
      })
    }
    catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error)
    }
  };

}

export default createContext(new IngredientStore());
