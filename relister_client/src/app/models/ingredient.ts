export interface IIngredient {
    // id, recipe_id, user_id, name, actual_amount, total_amount, unit
    id: string;
    recipe_id: string;
    user_id: string;
    name: string;
    actual_amount: number;
    total_amount: number;
    unit: string;
    relist: boolean;
}

export interface IIngredientFormValues extends Partial<IIngredient> {

}

export class IngredientFormValues { //implements IIngredientFormValues {
    id: string= "";
    recipe_id: string = "";
    user_id: string = "";
    name: string = "";
    actual_amount: number = 0;
    total_amount: number = 0;
    unit: string = "";
    relist: boolean = false;

    constructor(init?: IIngredientFormValues) {
        
        Object.assign(this, init);
    }
}