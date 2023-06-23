'use client';

import UseComponent from '@/types/UseComponent';
import {
  getNativeElementProps,
  MenuButton,
  MenuItemRadio,
  MenuList,
  resolveShorthand,
} from '@fluentui/react-components';
import { WeatherSunnyRegular } from '@fluentui/react-icons';

import { useThemeSwitch } from '../ThemeProvider';
import { useUserConfiguration } from '../UserConfigurationProvider';
import { ThemeSelectorProps, ThemeSelectorStates } from './ThemeSelector.types';

export const useThemeSelector: UseComponent<
  ThemeSelectorProps,
  ThemeSelectorStates
> = (props, ref) => {
  const { button, list, strings, menuProps } = props;
  const changeTheme = useThemeSwitch();
  const {
    userConfiguration: { theme },
  } = useUserConfiguration();

  const resolvedButton = resolveShorthand(button, {
    required: true,
    defaultProps: {
      appearance: 'subtle',
      icon: <WeatherSunnyRegular />,
      children: strings?.[theme] ?? theme,
    },
  });

  const resolvedList = resolveShorthand(list, {
    required: true,
    defaultProps: {
      children: (
        <>
          <MenuItemRadio name='theme' value='browser'>
            {strings?.browser}
          </MenuItemRadio>
          <MenuItemRadio name='theme' value='light'>
            {strings?.light}
          </MenuItemRadio>
          <MenuItemRadio name='theme' value='dark'>
            {strings?.dark}
          </MenuItemRadio>
          <MenuItemRadio name='theme' value='highContrast'>
            {strings?.highContrast}
          </MenuItemRadio>
        </>
      ),
    },
  });

  return {
    components: {
      root: 'div',
      button: MenuButton,
      list: MenuList,
    },
    root: getNativeElementProps('div', { ...props, ref }),
    button: resolvedButton,
    list: resolvedList,
    menuProps: {
      onCheckedValueChange: (_, data) =>
        data.checkedItems &&
        data.checkedItems.length > 0 &&
        changeTheme(
          data.checkedItems[0] as 'light' | 'dark' | 'highContrast' | 'browser'
        ),
      checkedValues: { theme: [theme] },
      ...menuProps,
    },
    tooltipContent: strings?.selectTheme ?? '',
  };
};
