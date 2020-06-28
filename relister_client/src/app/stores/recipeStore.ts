import { observable, action, computed, configure, runInAction } from 'mobx';
import { IRecipe } from '../models/recipe';
import { createContext, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { history } from '../..';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class RecipeStore {

  @observable recipeRegistry = new Map(); // allows changed map or new entries to refresh everything
  @observable recipe: IRecipe | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

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

  @action loadRecipe = async (id: string) => {
    // user may click into 'view recipe' or enter url directly
    let recipe = this.getRecipe(id);
    if (recipe) {
      this.recipe = recipe;
      // return the promise of recipe so in RecipeForm, useEffect doesn't need to keep re-runnign when initalRecipe is updated
      return recipe;
    } else {
      this.loadingInitial = true;
      try {
        recipe = await agent.Recipes.details(id);
        runInAction('getting recipe', () => {
          recipe.date = new Date(recipe.date);
          this.recipe = recipe;
          // by setting the recipeRegistry, no need to re-retrieve data we already have
          this.recipeRegistry.set(recipe.id, recipe); // setting map
          this.loadingInitial = false;
        })
        return recipe;
      } catch (error) {
        runInAction('get recipe error', () => {
          this.loadingInitial = false;
        })
        // agent throw error
        toast.error('Problem Submitting Data');
        console.log(error)

        // throw error;
        // this erro can be caught in recipe details page in client
        // previously recipe details was used to send to 404 not found, now that is handled in agent.ts after axios return
      }
    }
  }

  @action clearRecipe = () => {
    this.recipe = null;
  }

  getRecipe = (id: string) => {
    // mobx observable documentaion = get : returns value or undefined if not found
    return this.recipeRegistry.get(id);
  }
  
  @action createRecipe = async (recipe: IRecipe, user_id: string) => {
    this.submitting = true;
    try {
      recipe = await agent.Recipes.create(recipe.name, {'user_id':user_id});

      runInAction('creating recipe', () => {
        this.recipeRegistry.set(recipe.id, recipe);
        console.log(this.recipeRegistry)
        this.submitting = false;
      });
      // history.push(`/activities/${recipe.id}`);
    }
    catch (error) {
      runInAction('create recipe error', () => {
        this.submitting = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  };

  @action editRecipe = async (recipe: IRecipe) => {
    this.submitting = true;
    try {
      await agent.Recipes.update(recipe);
      runInAction('editing recipe', () => {
        // overriding existing recipe by using the key & recipe data
        this.recipeRegistry.set(recipe.id, recipe);
        this.recipe = recipe;
        this.submitting = false;
      });
      history.push(`/activities/${recipe.id}`);
    }
    catch (error) {
      runInAction('edit recipe error', () => {
        this.submitting = false
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  }

  // passing in event that is result of button being clicked
  @action deleteRecipe = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Recipes.delete(id);
      runInAction('deleting recipe', () => {
        this.recipeRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete recipe error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

export default createContext(new RecipeStore());
