export interface IRecipe {
    id: string;
    user_id: string;
    name: string;
}

export interface IRecipeFormValues extends Partial<IRecipe> {
}

export class RecipeFormValues implements IRecipeFormValues {
    id: string="";
    user_id: string="";
    name: string="";

    constructor(init?: IRecipeFormValues) {
        Object.assign(this, init);
    }
}