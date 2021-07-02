import { error } from "console";
import { useState } from "react";

export enum StorageType {
  LocalStorage,
  SessionStorage,
}

export const useStorage = (
  key: string,
  initialValue: any,
  storageType: StorageType
) => {
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const item =
        storageType == StorageType.LocalStorage
          ? window.localStorage.getItem(key)
          : window.sessionStorage.getItem(key);
      console.log(item);
      console.log(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any | ((val: any) => any)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      console.log(valueToStore);
      // Save state
      setStoredValue(valueToStore);
      if (storageType == StorageType.LocalStorage) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
};
