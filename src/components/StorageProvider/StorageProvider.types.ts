/**
 * The type of storage.
 *
 * @export
 * @enum {number}
 */
export enum StorageType {
  /**
   * The storage stores data in local, and will not delete them after session
   * ended.
   */
  Local,
  /**
   * The storage stores data of this session, and will delete all data in it
   * after session ended.
   */
  Session,
}

/** Represents an item in storage. */
export type StorageItem = {
  /** The key of item in storage. */
  key: string;
  /** The value of item in storage. */
  value: string;
  /** The type of which storage is used to store item. */
  storageType: StorageType;
};

/** Represents the values of a StorageProviderContext. */
export type StorageProviderContextValues = {
  /** The items tracked by this storage provider. */
  trackedItems: StorageItem[];
  /**
   * Set the value of a stored item identified by `key`, or create an item
   * identified by `key` with given value if the item does not exist.
   *
   * @param key The key of item to be set.
   * @param valueOrSetter The new value to be set to, or a setter function used
   *   to generates new value by current value.
   * @param storageType The type of storage used to store this item. Default to
   *   `StorageType.Local`.
   */
  setItemValue: <T>(
    key: string,
    valueOrSetter: T | ((previousValue: T) => T),
    storageType?: StorageType
  ) => void;
  /**
   * Remove an item identified by `key` from all storages.
   *
   * @param key The key of stored item to be removed.
   */
  removeItem: (key: string) => void;
  /**
   * Track a stored item identified by `key`.
   *
   * @param key The key of stored item to be tracked.
   * @param initialValue The initial value to be set if specified item has not
   *   been stored.
   * @param storageType The type of storage used to store this item. Default to
   *   `StorageType.Local`.
   * @returns The current value of tracked item.
   */
  track: <T>(key: string, initialValue: T, storageType?: StorageType) => T;
};
