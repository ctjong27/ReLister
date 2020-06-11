export interface IRecipe {
    id: string;
    name: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IRecipeFormValues extends Partial<IRecipe> {
    time?: Date;
}

export class RecipeFormValues implements IRecipeFormValues {
    id?: string= undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = "";
    venue: string = "";

    constructor(init?: IRecipeFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}