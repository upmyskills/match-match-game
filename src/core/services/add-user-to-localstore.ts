import { IStorage } from '../models';

class AddUserToLocalstore<T extends string> {
  localStorage: IStorage;

  constructor(
    getStorage = (): IStorage => window.localStorage,
  ) {
    this.localStorage = getStorage();
  }

  get(key: T): string | null {
    return this.localStorage.getItem(key);
  }

  set(key: T, value: string): void {
    this.localStorage.setItem(key, value);
  }

  clearItem(key: T): void {
    this.localStorage.removeItem(key);
  }

  destroy(): void {
    this.localStorage.clear();
  }
}

export default AddUserToLocalstore;
