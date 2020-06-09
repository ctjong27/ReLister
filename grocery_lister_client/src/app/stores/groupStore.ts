import { observable, action, computed, configure, runInAction } from 'mobx';
import { IGroup } from '../models/group';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class GroupStore {

    @observable groupRegistry = new Map(); // allows changed map or new entries to refresh everything
    @observable group: IGroup | null = null;
    //   @observable loadingInitial = false;
    //   @observable submitting = false;
    //   @observable target = '';

    @computed get activitiesByDate() {
        console.log(this.groupActivitiesByDate(Array.from(this.groupRegistry.values())));
        return this.groupActivitiesByDate(Array.from(this.groupRegistry.values()));
    }

    groupActivitiesByDate(groups: IGroup[]) {
        const sortedActivities = groups.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        )

        return Object.entries(sortedActivities.reduce((activities, activity) => {
          const date = activity.date.toISOString().split('T')[0];
          activities[date] = activities[date] ? [...activities[date], activity] : [activity];
          return activities;
        },

        {} as { [key: string]: IActivity[] }));
      }
    
}