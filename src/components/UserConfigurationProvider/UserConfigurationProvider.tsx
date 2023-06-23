'use client';

import React from 'react';

import UserConfiguration from '@/types/UserConfiguration';
import { defaultUserConfiguration } from '@/utilities/configuration';
import { useStorage } from '@/utilities/storage';

import { UserConfigurationProviderContext } from './UserConfigurationProvider.context';

/** Provides the abilities to let user configure the site behaviors. */
export function UserConfigurationProvider({
  children,
}: React.PropsWithChildren) {
  const [userConfiguration, setUserConfiguration] = useStorage<
    Required<UserConfiguration>
  >('userConfiguration', defaultUserConfiguration);

  const setConfiguration = React.useCallback(
    function <T extends keyof UserConfiguration>(
      key: T,
      value: Required<UserConfiguration>[T]
    ) {
      setUserConfiguration(previous => ({ ...previous, [key]: value }));
    },
    [setUserConfiguration]
  );

  return (
    <UserConfigurationProviderContext.Provider
      value={{
        configuration: userConfiguration ?? defaultUserConfiguration,
        setConfiguration,
      }}
    >
      {children}
    </UserConfigurationProviderContext.Provider>
  );
}
