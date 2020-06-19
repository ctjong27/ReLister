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

  @observable loggedIn = false;

  getUser = (id: string) => {
    // mobx observable documentaion = get : returns value or undefined if not found
    return this.userRegistry.get(id);
  }
  
  @action loginUser = async (user: IUser) => {
    this.submitting = true;
    try {
      user = await agent.Users.login(user);
      runInAction('loading user', () => {
        this.userRegistry.set(user.id, user);
        this.submitting = false;
        this.user = user
        console.log(this.user);
        this.loggedIn = true;
      });
    }
    catch (error) {
      runInAction('create user error', () => {
        this.submitting = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  };

  @action signoutUser = async () => {
    this.submitting = true;
    this.user = {id:"", username:"", password:""};
    try {
      // user = await agent.Users.login(user);
      runInAction('signout user', () => {
        
        
        this.submitting = false;
        console.log(this.user);
        this.loggedIn = false;
      });
    }
    catch (error) {
      runInAction('create user error', () => {
        this.submitting = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
  };

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

  @action registerUser = async (user: IUser) => {
    this.submitting = true;
    try {
      await agent.Users.register(user);
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
