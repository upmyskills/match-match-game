import { DATABASE_NAME } from '../const';
import { ResultModel } from '../models';

const store = 'ladder';

export const openConnection = (): IDBOpenDBRequest => {
  const DB_REQUEST = indexedDB.open(DATABASE_NAME);
  DB_REQUEST.onupgradeneeded = () => {
    const datastore = DB_REQUEST.result.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
    datastore.createIndex('login', 'login');
    datastore.createIndex('image', 'image');
    datastore.createIndex('score', 'score');
    datastore.createIndex('difficulty', 'difficulty');

    // console.log('onUpgradeNeeded!');
  };

  DB_REQUEST.onsuccess = () => {
    // console.log('onSuccess!');
  };

  return DB_REQUEST;
};

export const pushResultToDB = (obj: ResultModel): void => {
  const DB_REQUEST = indexedDB.open(DATABASE_NAME);

  DB_REQUEST.onsuccess = () => {
    const connection = DB_REQUEST.result;
    const transaction = connection.transaction(store, 'readwrite');
    const dbStore = transaction.objectStore(store);

    dbStore.add(obj);
  };
};

export const getResultsFromDB = (): Promise<IDBRequest[]> => new Promise((res) => {
  const DB_REQUEST = indexedDB.open(DATABASE_NAME);
  DB_REQUEST.onsuccess = () => {
    const connection = DB_REQUEST.result;
    const transaction = connection.transaction(store, 'readonly');
    const dbStore = transaction.objectStore(store);
    const data = dbStore.getAll();

    data.onsuccess = () => {
    };

    transaction.oncomplete = () => {
      res(data.result);
      connection.close();
    };
  };
});

export const getSortedResults = (): Promise<IDBCursorWithValue[]> => new Promise((res) => {
  const DB_REQUEST = indexedDB.open(DATABASE_NAME);
  DB_REQUEST.onsuccess = () => {
    const connection = DB_REQUEST.result;
    const transaction = connection.transaction(store, 'readonly');
    const dbStore = transaction.objectStore(store);
    const data = dbStore.index('score').openCursor(null, 'prev');

    const resData: Array<IDBCursorWithValue> = [];
    data.onsuccess = () => {
      const cursor = data.result;
      if (cursor) {
        resData.push(cursor.value);
        cursor?.continue();
      }
    };

    transaction.oncomplete = () => {
      const arr = resData.sort((a, b) => +(a as unknown as ResultModel).score - +(b as unknown as ResultModel).score);

      connection.close();
      res(arr.reverse());
    };
  };
});

export const getResult = (player: string): Promise<IDBRequest> => new Promise((res) => {
  const DB_REQUEST = indexedDB.open(DATABASE_NAME);
  DB_REQUEST.onsuccess = () => {
    const connection = DB_REQUEST.result;
    const transaction = connection.transaction(store);
    const dbStore = transaction.objectStore(store);
    const index = dbStore.index('login');
    const data = index.get(player);

    data.onsuccess = () => {
      res(data.result);
    };

    transaction.oncomplete = () => {
      connection.close();
    };
  };
});
