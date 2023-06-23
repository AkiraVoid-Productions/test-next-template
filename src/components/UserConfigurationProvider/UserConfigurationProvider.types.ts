import UserConfiguration from '@/types/UserConfiguration';

/** Represents the values of `UserConfigurationProvider` context. */
export type UserConfigurationProviderContextValues = {
  /** The user configuration. */
  configuration: Required<UserConfiguration>;
  /**
   * Set user configuration by given key and value.
   *
   * @param key The key of configuration to be set.
   * @param value The value of configuration to be set to.
   */
  setConfiguration: <T extends keyof UserConfiguration>(
    key: T,
    value: Required<UserConfiguration>[T]
  ) => void;
};
