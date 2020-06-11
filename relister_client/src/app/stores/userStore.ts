import { observable, action, computed, configure, runInAction } from 'mobx';
import { IUser } from '../models/user';
import { createContext } from 'react';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class UserStore {

    @observable userRegistry = new Map(); // allows changed map or new entries to refresh everything
    @observable user: IUser | null = null;
    //   @observable loadingInitial = false;
    //   @observable submitting = false;
    //   @observable target = '';

    @computed get usersByDate() {
        console.log(this.groupUsersByDate(Array.from(this.userRegistry.values())));
        return this.groupUsersByDate(Array.from(this.userRegistry.values()));
    }

    groupUsersByDate(users: IUser[]) {
        const sortedUsers = users.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        )

        return Object.entries(sortedUsers.reduce((users, user) => {
          const date = user.date.toISOString().split('T')[0];
          users[date] = users[date] ? [...users[date], user] : [user];
          return users;
        },

        {} as { [key: string]: IUser[] }));
      }
    
}

export default createContext(new UserStore());
