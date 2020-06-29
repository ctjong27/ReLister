import { observable, action, computed, configure, runInAction } from 'mobx';
import { IUser } from '../models/user';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { history } from '../..';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class UserStore {

  @observable user: IUser | null = null;

  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @observable loggedIn = false;

  @action loginUser = async (user: IUser) => {
    this.submitting = true;
    try {
      user = await agent.Users.login(user);
      runInAction('loading user', () => {
        this.submitting = false;
        this.user = user
        console.log(this.user);
        this.loggedIn = true;
        const cookies = new Cookies();
        // cookies.set('myCat', 'Pacman', { path: '/' });
        cookies.set('jwt', user.access_token);
        cookies.set('id', user.id);
        console.log(JSON.stringify(user))
        // localStorage.setItem('usr', JSON.stringify(user))
        history.push('/shopping_list');
      });
    }
    catch (error) {
      runInAction('create user error', () => {
        this.submitting = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error);
    }
    // }
    // else {

    // }
  };

  @action signoutUser = async () => {
    this.submitting = true;
    this.user = { id: "", username: "", password: "", access_token: "" };
    try {
      // user = await agent.Users.login(user);
      runInAction('signout user', () => {
        this.submitting = false;
        console.log(this.user);
        this.loggedIn = false;

        const cookies = new Cookies();
        cookies.remove('jwt')
        cookies.remove('id')
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
