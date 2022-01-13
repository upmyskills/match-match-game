import { TUserDataForm } from '../models';
import AddUserToLocalstore from './add-user-to-localstore';

export const localStorage = new AddUserToLocalstore();

export const addUserToLocalFormData = (fields: TUserDataForm): void => {
  localStorage.set('PLAYER', JSON.stringify(fields));
};

export const delUserFromLocalData = (): void => {
  localStorage.destroy();
};
