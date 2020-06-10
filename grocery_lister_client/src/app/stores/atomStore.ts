import { observable, action, computed, configure, runInAction } from 'mobx';
import { IAtom } from '../models/atom';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import agent from '../api/agent';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class AtomStore {

  @observable atomRegistry = new Map(); // allows changed map or new entries to refresh everything
  @observable atom: IAtom | null = null;
  @observable loadingInitial = false;
  //   @observable submitting = false;
  //   @observable target = '';

  @computed get atomsByDate() {
    console.log(this.groupAtomsByDate(Array.from(this.atomRegistry.values())));
    return this.groupAtomsByDate(Array.from(this.atomRegistry.values()));
  }

  groupAtomsByDate(atoms: IAtom[]) {
    const sortedAtoms = atoms.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )

    return Object.entries(sortedAtoms.reduce((atoms, atom) => {
      const date = atom.date.toISOString().split('T')[0];
      atoms[date] = atoms[date] ? [...atoms[date], atom] : [atom];
      return atoms;
    },

      {} as { [key: string]: IAtom[] }));
  }

  @action loadAtoms = async () => {
    this.loadingInitial = true;
    try {
      // this returns result of promise
      const activities = await agent.Atoms.list();
      runInAction('loading activities', () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.atomRegistry.set(activity.id, activity); // setting map
        });
        this.loadingInitial = false;
      })
    }
    catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
      toast.error('Problem Submitting Data');
      console.log(error)
    }
  };

}

export default createContext(new AtomStore());
