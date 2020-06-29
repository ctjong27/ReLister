import { observable, action, computed, configure, runInAction } from 'mobx';
import { IIngredient } from '../models/ingredient';
import { createContext, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { history } from '../..';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class IngredientStore {

  @observable ingredientRegistry = new Map(); // allows changed map or new entries to refresh everything
  @observable ingredient: IIngredient | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

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
      runInAction('loading ingredients', () => {
        ingredients.forEach((ingredient) => {
          this.ingredientRegistry.set(ingredient.id, ingredient); // setting map
        });
        this.loadingInitial = false;
      })
    }
    catch (error) {
      runInAction('load ingredients error', () => {
        this.loadingInitial = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error)
    }
  };

  @action loadIngredient = async (id: string) => {
    // user may click into 'view ingredient' or enter url directly
    let ingredient = this.getIngredient(id);
    if (ingredient) {
      this.ingredient = ingredient;
      // return the promise of ingredient so in IngredientForm, useEffect doesn't need to keep re-runnign when initalIngredient is updated
      return ingredient;
    } else {
      this.loadingInitial = true;
      try {
        ingredient = await agent.Ingredients.details(id);
        runInAction('getting ingredient', () => {
          ingredient.date = new Date(ingredient.date);
          this.ingredient = ingredient;
          // by setting the ingredientRegistry, no need to re-retrieve data we already have
          this.ingredientRegistry.set(ingredient.id, ingredient); // setting map
          this.loadingInitial = false;
        })
        return ingredient;
      } catch (error) {
        runInAction('get ingredient error', () => {
          this.loadingInitial = false;
        })
        // agent throw error
        toast.error('Problem Submitting Data');
        console.log(error)

        // throw error;
        // this erro can be caught in ingredient details page in client
        // previously ingredient details was used to send to 404 not found, now that is handled in agent.ts after axios return
      }
    }
  }

  @action clearIngredient = () => {
    this.ingredient = null;
  }

  getIngredient = (id: string) => {
    // mobx observable documentaion = get : returns value or undefined if not found
    return this.ingredientRegistry.get(id);
  }
  @action createIngredient = async (ingredient: IIngredient, recipe_id: string, user_id: string) => {
    this.submitting = true;
    try {
      await agent.Ingredients.create(ingredient.name, { ...ingredient, 'recipe_id':recipe_id, 'user_id':user_id});
      runInAction('creating ingredient', () => {
        this.ingredientRegistry.set(ingredient.id, ingredient);
        this.submitting = false;
      });
      // history.push(`/ingredient/${ingredient.id}`);
      history.push('/shopping_list');
    }
    catch (error) {
      runInAction('create ingredient error', () => {
        this.submitting = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  };

  @action editIngredient = async (ingredient: IIngredient) => {
    this.submitting = true;
    try {
      await agent.Ingredients.update(ingredient);
      runInAction('editing ingredient', () => {
        // overriding existing ingredient by using the key & ingredient data
        this.ingredientRegistry.set(ingredient.id, ingredient);
        this.ingredient = ingredient;
        this.submitting = false;
      });
      history.push(`/ingredient/${ingredient.id}`);
    }
    catch (error) {
      runInAction('edit ingredient error', () => {
        this.submitting = false
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  }

  // passing in event that is result of button being clicked
  @action deleteIngredient = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Ingredients.delete(id);
      runInAction('deleting ingredient', () => {
        this.ingredientRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete ingredient error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

export default createContext(new IngredientStore());
