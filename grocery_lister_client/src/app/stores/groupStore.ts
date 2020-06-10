import { observable, action, computed, configure, runInAction } from 'mobx';
import { IGroup } from '../models/group';
import { createContext } from 'react';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class GroupStore {

    @observable groupRegistry = new Map(); // allows changed map or new entries to refresh everything
    @observable group: IGroup | null = null;
    //   @observable loadingInitial = false;
    //   @observable submitting = false;
    //   @observable target = '';

    @computed get groupsByDate() {
        console.log(this.combineGroupsByDate(Array.from(this.groupRegistry.values())));
        return this.combineGroupsByDate(Array.from(this.groupRegistry.values()));
    }

    combineGroupsByDate(groups: IGroup[]) {
        const sortedGroups = groups.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        )

        return Object.entries(sortedGroups.reduce((groups, group) => {
          const date = group.date.toISOString().split('T')[0];
          groups[date] = groups[date] ? [...groups[date], group] : [group];
          return groups;
        },

        {} as { [key: string]: IGroup[] }));
      }
    
}

export default createContext(new GroupStore());
