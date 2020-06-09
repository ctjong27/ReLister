export interface IGroup {
    id: string;
    name: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IGroupFormValues extends Partial<IGroup> {
    time?: Date;
}

export class GroupFormValues implements IGroupFormValues {
    id?: string= undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = "";
    venue: string = "";

    constructor(init?: IGroupFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}