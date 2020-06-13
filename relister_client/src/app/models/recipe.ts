export interface IRecipe {
    id: string;
    user_id: string;
    name: string;
}

// export interface IRecipeFormValues extends Partial<IRecipe> {
//     time?: Date;
// }

// export class RecipeFormValues implements IRecipeFormValues {
//     id: string="";
//     user_id: string="";
//     name: string="";

//     constructor(init?: IRecipeFormValues) {
//         if (init && init.date) {
//             init.time = init.date
//         }
//         Object.assign(this, init);
//     }
// }