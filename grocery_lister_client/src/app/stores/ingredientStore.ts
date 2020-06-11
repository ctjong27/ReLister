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

  @computed get ingredientsByDate() {
    console.log(this.groupIngredientsByDate(Array.from(this.ingredientRegistry.values())));
    return this.groupIngredientsByDate(Array.from(this.ingredientRegistry.values()));
  }

  groupIngredientsByDate(ingredients: IIngredient[]) {
    const sortedIngredients = ingredients.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )

    return Object.entries(sortedIngredients.reduce((ingredients, ingredient) => {
      const date = ingredient.date.toISOString().split('T')[0];
      ingredients[date] = ingredients[date] ? [...ingredients[date], ingredient] : [ingredient];
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
          ingredient.date = new Date(ingredient.date);
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
