export interface IUser {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IUserFormValues extends Partial<IUser> {
    time?: Date;
}

export class UserFormValues implements IUserFormValues {
    id?: string= undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = "";
    venue: string = "";

    constructor(init?: IUserFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}