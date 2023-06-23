'use client';

import { createContext } from 'react';

import { StorageProviderContextValues } from './StorageProvider.types';

/**
 * The context of `StorageProvider`.
 *
 * @access client
 */
export const StorageProviderContext =
  createContext<StorageProviderContextValues>({
    trackedItems: [],
    setItemValue: () => {},
    removeItem: () => {},
    track: <T>() => ({} as T),
  });
