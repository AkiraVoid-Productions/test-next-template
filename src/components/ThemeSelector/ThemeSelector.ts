'use client';

import { forwardRef } from 'react';

import { ForwardRefComponent } from '@fluentui/react-components';

import { useThemeSelector } from './ThemeSelector.props';
import { renderThemeSelector } from './ThemeSelector.render';
import { useThemeSelectorStyles } from './ThemeSelector.styles';
import { ThemeSelectorProps } from './ThemeSelector.types';

/** Let user select site theme. */
export const Component: ForwardRefComponent<ThemeSelectorProps> = forwardRef(
  (props, ref) => {
    const states = useThemeSelector(props, ref);
    useThemeSelectorStyles(states);

    return renderThemeSelector(states);
  }
);

Component.displayName = 'ThemeSelector';
