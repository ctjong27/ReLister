import { observable, action, computed, configure, runInAction } from 'mobx';
import { IMolecule } from '../models/molecule';
import { createContext } from 'react';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class MoleculeStore {

    @observable moleculeRegistry = new Map(); // allows changed map or new entries to refresh everything
    @observable molecule: IMolecule | null = null;
    //   @observable loadingInitial = false;
    //   @observable submitting = false;
    //   @observable target = '';

    @computed get moleculesByDate() {
        console.log(this.grupMoleculesByDate(Array.from(this.moleculeRegistry.values())));
        return this.grupMoleculesByDate(Array.from(this.moleculeRegistry.values()));
    }

    grupMoleculesByDate(molecules: IMolecule[]) {
        const sortedMolecules = molecules.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        )

        return Object.entries(sortedMolecules.reduce((molecules, molecule) => {
          const date = molecule.date.toISOString().split('T')[0];
          molecules[date] = molecules[date] ? [...molecules[date], molecule] : [molecule];
          return molecules;
        },

        {} as { [key: string]: IMolecule[] }));
      }
    
}

export default createContext(new MoleculeStore());
