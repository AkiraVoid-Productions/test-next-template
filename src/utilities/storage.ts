'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  StorageProviderContext,
  StorageType,
} from '@/components/StorageProvider';

import { useIsServer } from './common';

/**
 * Access a item in storage identified by item key.
 *
 * @template T The type of the value in storage.
 * @param key The key of stored item to be accessed.
 * @param initialValue The initial value to be set if specified item has not
 *   been stored.
 * @param storageType The type of storage used to store this item.
 * @returns The value of the item (will be `undefined` if this hook is called on
 *   server side), a function to set the value of the item, a function to remove
 *   the item from storage.
 */
export function useStorage<T>(
  key: string,
  initialValue: T,
  storageType = StorageType.Local
): [T | undefined, Dispatch<SetStateAction<T>>, (key: string) => void] {
  const isServer = useIsServer();
  const { track, setItemValue, removeItem } = useContext(
    StorageProviderContext
  );
  const [storageValue, setStorageValueState] = useState<T>();

  useEffect(() => {
    setStorageValueState(track<T>(key, initialValue, storageType));
  }, [initialValue, key, storageType, track]);

  const setStorageValue = useCallback<Dispatch<SetStateAction<T>>>(
    valueOrSetter => {
      if (isServer) {
        throw 'Storage cannot be accessed on server.';
      }

      let value: T;
      if (typeof valueOrSetter === 'function') {
        value = (valueOrSetter as (prevState: T) => T)(storageValue!);
      } else {
        value = valueOrSetter;
      }

      setItemValue(key, value, storageType);
    },
    [isServer, key, setItemValue, storageType, storageValue]
  );

  const forget = useCallback(() => removeItem(key), [key, removeItem]);

  return [storageValue, setStorageValue, forget];
}
