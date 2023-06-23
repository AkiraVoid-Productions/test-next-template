'use client';

import { createContext, useContext } from 'react';

import { defaultUserConfiguration } from '@/utilities/configuration';

import { UserConfigurationProviderContextValues } from './UserConfigurationProvider.types';

/**
 * The context of `UserConfigurationProvider`.
 *
 * @access client
 */
export const UserConfigurationProviderContext =
  createContext<UserConfigurationProviderContextValues>({
    configuration: defaultUserConfiguration,
    setConfiguration: () => {},
  });

/**
 * Hook to `UserConfigurationProvider`, get user configuration and a function to
 * change user configuration.
 *
 * @returns User configuration and a function to change user configuration.
 */
export function useUserConfiguration() {
  const { configuration, setConfiguration } = useContext(
    UserConfigurationProviderContext
  );

  return {
    userConfiguration: configuration,
    setUserConfiguration: setConfiguration,
  };
}
