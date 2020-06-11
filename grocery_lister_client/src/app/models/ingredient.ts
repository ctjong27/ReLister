export interface IIngredient {
    id: string;
    name: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IIngredientFormValues extends Partial<IIngredient> {
    time?: Date;
}

export class IngredientFormValues implements IIngredientFormValues {
    id?: string= undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = "";
    venue: string = "";

    constructor(init?: IIngredientFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}