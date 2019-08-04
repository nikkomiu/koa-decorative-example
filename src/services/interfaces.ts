export interface IItem {
  id?: string;
  name: string;
  description: string;
}

export interface IResourceService {
  list(): void;
  create(item: IItem): IItem;
  detail(id: string): IItem;
  update(id: string, item: IItem): IItem;
  replace(id: string, item: IItem): IItem;
  delete(id: string): IItem;
}
