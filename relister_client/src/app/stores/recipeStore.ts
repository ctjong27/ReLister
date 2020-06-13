import { observable, action, computed, configure, runInAction } from 'mobx';
import { IRecipe } from '../models/recipe';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import agent from '../api/agent';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class RecipeStore {

  @observable recipeRegistry = new Map(); // allows changed map or new entries to refresh everything
  @observable recipe: IRecipe | null = null;
  @observable loadingInitial = false;
  //   @observable submitting = false;
  //   @observable target = '';

  @computed get recipesByUser() {
    // recipeRegistry is populated by loadRecipes at one point 
    return this.groupRecipesByUser(Array.from(this.recipeRegistry.values()));
  }

  groupRecipesByUser(recipes: IRecipe[]) {
    // sorted
    const sortedRecipes = recipes.sort(
      (a, b) => parseInt(a.user_id) - parseInt(b.user_id)
    )

    // restructured
    return Object.entries(sortedRecipes.reduce((recipes, recipe) => {
      const userId = recipe.user_id
      recipes[userId] = recipes[userId] ? [...recipes[userId], recipe] : [recipe];
      console.log(userId)
      return recipes;
    },
    {} as { [key: string]: IRecipe[] }));
  }

  @action loadRecipes = async () => {
    this.loadingInitial = true;
    try {
      // this returns result of promise
      const recipes = await agent.Recipes.list();
      runInAction('loading activities', () => {
        recipes.forEach((recipe) => {
          this.recipeRegistry.set(recipe.id, recipe); // setting map
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

export default createContext(new RecipeStore());
