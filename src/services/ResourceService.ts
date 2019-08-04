import uuid from 'uuid';

import { IResourceService, IItem } from './interfaces';

class ResourceService implements IResourceService {
  private items: IItem[] = [
    { id: uuid(), name: 'First Test Item', description: 'Some first item' },
    { id: uuid(), name: 'Second Test Item', description: 'Some second item' },
  ];

  list() {
    return this.items.map(i => ({ ...i }));
  }

  create(item: IItem) {
    const finalItem = { ...item, id: uuid() };

    this.items.push(finalItem);

    return finalItem;
  }

  detail(id: string) {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      throw new Error('not found');
    }

    return item;
  }

  update(id: string, item: Partial<IItem>): IItem {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx < 0) {
      throw new Error('not found');
    }

    this.items[idx] = { ...this.items[idx], ...item, id };

    return this.items[idx];
  }

  replace(id: string, item: IItem): IItem {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx < 0) {
      throw new Error('not found');
    }

    this.items[idx] = { ...item, id };

    return this.items[idx];
  }

  delete(id: string): IItem {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx < 0) {
      throw new Error('not found');
    }

    const [item] = this.items.splice(idx, 1);

    return item;
  }
}

export default ResourceService;
