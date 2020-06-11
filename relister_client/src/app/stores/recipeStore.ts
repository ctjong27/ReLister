import { observable, action, computed, configure, runInAction } from 'mobx';
import { IRecipe } from '../models/recipe';
import { createContext } from 'react';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class RecipeStore {

    @observable recipeRegistry = new Map(); // allows changed map or new entries to refresh everything
    @observable recipe: IRecipe | null = null;
    //   @observable loadingInitial = false;
    //   @observable submitting = false;
    //   @observable target = '';

    @computed get recipesByDate() {
        console.log(this.grupRecipesByDate(Array.from(this.recipeRegistry.values())));
        return this.grupRecipesByDate(Array.from(this.recipeRegistry.values()));
    }

    grupRecipesByDate(recipes: IRecipe[]) {
        const sortedRecipes = recipes.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        )

        return Object.entries(sortedRecipes.reduce((recipes, recipe) => {
          const date = recipe.date.toISOString().split('T')[0];
          recipes[date] = recipes[date] ? [...recipes[date], recipe] : [recipe];
          return recipes;
        },

        {} as { [key: string]: IRecipe[] }));
      }
    
}

export default createContext(new RecipeStore());
