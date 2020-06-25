export interface IUser {
    id: string;
    username: string;
    password: string;
    access_token: string;
}

export interface IUserFormValues extends Partial<IUser> {
}

export class UserFormValues implements IUserFormValues {
    id: string = "";
    username: string = "";
    password: string = "";
    access_token: string = ""

    constructor(init?: IUserFormValues) {
        Object.assign(this, init);
    }
}