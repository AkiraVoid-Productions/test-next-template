'use client';

import React from 'react';

import { useIsServer } from '@/utilities/common';

import { StorageProviderContext } from './StorageProvider.context';
import { StorageItem, StorageType } from './StorageProvider.types';

/**
 * Mount a component that provides storage control and storage supervise
 * context.
 */
export function StorageProvider({ children }: React.PropsWithChildren) {
  const [trackedItems, setTrackedItems] = React.useState<StorageItem[]>([]);
  const isServer = useIsServer();

  const setItemValue = React.useCallback(
    function <T>(
      key: string,
      valueOrSetter: T | ((previousValue: T) => T),
      storageType = StorageType.Local
    ) {
      if (isServer) {
        throw 'Storage cannot be accessed on server.';
      }

      const storage =
        storageType === StorageType.Local ? localStorage : sessionStorage;
      const currentValue = storage.getItem(key);
      const value =
        typeof valueOrSetter === 'function'
          ? (valueOrSetter as (previousValue: T) => T)(
              (currentValue ? JSON.parse(currentValue) : null) as T
            )
          : valueOrSetter;
      setTrackedItems(previous => {
        const previousItemIndex = previous.findIndex(i => i.key === key);
        const newItem = {
          key,
          value: JSON.stringify(value),
          storageType,
        };
        storage.setItem(key, newItem.value);

        // Automatically add to track.
        if (previousItemIndex > -1) {
          previous.splice(previousItemIndex, 1, newItem);
          return [...previous];
        }

        return [...previous, newItem];
      });
    },
    [isServer]
  );

  const removeItem = React.useCallback(
    (key: string) => {
      if (isServer) {
        throw 'Storage cannot be accessed on server.';
      }

      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
      setTrackedItems(previous => {
        const itemIndex = previous.findIndex(i => i.key === key);
        if (itemIndex > -1) {
          previous.splice(itemIndex, 1);
          return [...previous];
        }

        return previous;
      });
    },
    [isServer]
  );

  const track = React.useCallback(
    function <T>(
      key: string,
      initialValue: T,
      storageType = StorageType.Local
    ) {
      if (isServer) {
        throw 'Storage cannot be accessed on server.';
      }

      const currentTracked = trackedItems.find(i => i.key === key);
      if (currentTracked) {
        return JSON.parse(currentTracked.value) as T;
      }

      const storage =
        storageType === StorageType.Local ? localStorage : sessionStorage;
      const value = storage.getItem(key);
      if (value) {
        // Just add to track.
        setTrackedItems(previous => [...previous, { key, value, storageType }]);
        return JSON.parse(value) as T;
      }

      setItemValue(key, initialValue, storageType);
      return initialValue;
    },
    [isServer, setItemValue, trackedItems]
  );

  return (
    <StorageProviderContext.Provider
      value={{
        trackedItems,
        setItemValue,
        removeItem,
        track,
      }}
    >
      {children}
    </StorageProviderContext.Provider>
  );
}
