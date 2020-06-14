export interface IIngredient {
    // id, recipe_id, user_id, name, actual_amount, total_amount, unit
    id: string;
    recipe_id: string;
    user_id: string;
    name: string;
    actual_amount: string;
    total_amount: string;
    unit: string;
}

export interface IIngredientFormValues extends Partial<IIngredient> {

}

export class IngredientFormValues { //implements IIngredientFormValues {
    id: string= "";
    recipe_id: string = "";
    user_id: string = "";
    name: string = "";
    actual_amount: string = "";
    total_amount: string = "";
    unit: string = "";

    constructor(init?: IIngredientFormValues) {
        
        Object.assign(this, init);
    }
}