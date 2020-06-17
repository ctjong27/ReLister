import { observable, action, computed, configure, runInAction } from 'mobx';
import { IUser } from '../models/user';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { toast } from 'react-toastify';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class UserStore {

  @observable userRegistry = new Map(); // allows changed map or new entries to refresh everything
  @observable user: IUser | null = null;
  
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  getUser = (id: string) => {
    // mobx observable documentaion = get : returns value or undefined if not found
    return this.userRegistry.get(id);
  }
  
  @action loadUser = async (id: string) => {
    // user may click into 'view user' or enter url directly
    let user = this.getUser(id);
    if (user) {
      this.user = user;
      // return the promise of user so in UserForm, useEffect doesn't need to keep re-runnign when initalUser is updated
      return user;
    } else {
      this.loadingInitial = true;
      try {
        user = await agent.Users.details(id);
        runInAction('getting user', () => {
          user.date = new Date(user.date);
          this.user = user;
          // by setting the userRegistry, no need to re-retrieve data we already have
          this.userRegistry.set(user.id, user); // setting map
          this.loadingInitial = false;
        })
        return user;
      } catch (error) {
        runInAction('get user error', () => {
          this.loadingInitial = false;
        })
        // agent throw error
        toast.error('Problem Submitting Data');
        console.log(error)

        // throw error;
        // this erro can be caught in user details page in client
        // previously user details was used to send to 404 not found, now that is handled in agent.ts after axios return
      }
    }
  }

  @action editUser = async (user: IUser) => {
    this.submitting = true;
    try {
      await agent.Users.update(user);
      runInAction('editing user', () => {
        // overriding existing user by using the key & user data
        this.userRegistry.set(user.id, user);
        this.user = user;
        this.submitting = false;
      });
      // history.push(`/activities/${user.id}`);
    }
    catch (error) {
      runInAction('edit user error', () => {
        this.submitting = false
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  }

  @action createUser = async (user: IUser) => {
    this.submitting = true;
    try {
      await agent.Users.create(user);
      runInAction('creating user', () => {
        this.userRegistry.set(user.id, user);
        this.submitting = false;
      });
      // history.push(`/activities/${user.id}`);
    }
    catch (error) {
      runInAction('create user error', () => {
        this.submitting = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  };

  // passing in event that is result of button being clicked
  @action deleteUser = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Users.delete(id);
      runInAction('deleting user', () => {
        this.userRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete user error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

export default createContext(new UserStore());
