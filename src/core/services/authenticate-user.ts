import { localStorage } from './add-user-to-local';

export const getUser = (): string | null => {
  const user: string | null = localStorage.get('PLAYER') || null;
  return user;
};
