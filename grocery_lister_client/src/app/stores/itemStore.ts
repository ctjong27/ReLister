import { observable, action, computed, configure, runInAction } from 'mobx';
import { IItem } from '../models/item';
import { createContext } from 'react';

// turning on strict mode for MobX
configure({ enforceActions: 'always' });

class ItemStore {

    @observable itemRegistry = new Map(); // allows changed map or new entries to refresh everything
    @observable item: IItem | null = null;
    //   @observable loadingInitial = false;
    //   @observable submitting = false;
    //   @observable target = '';

    @computed get itemsByDate() {
        console.log(this.groupItemsByDate(Array.from(this.itemRegistry.values())));
        return this.groupItemsByDate(Array.from(this.itemRegistry.values()));
    }

    groupItemsByDate(items: IItem[]) {
        const sortedItems = items.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        )

        return Object.entries(sortedItems.reduce((items, item) => {
          const date = item.date.toISOString().split('T')[0];
          items[date] = items[date] ? [...items[date], item] : [item];
          return items;
        },

        {} as { [key: string]: IItem[] }));
      }
    
}

export default createContext(new ItemStore());
