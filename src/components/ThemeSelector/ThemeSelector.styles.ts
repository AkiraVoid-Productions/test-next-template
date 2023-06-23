'use client';

import {
  makeStyles,
  mergeClasses,
  SlotClassNames,
} from '@fluentui/react-components';

import { ThemeSelectorSlots, ThemeSelectorStates } from './ThemeSelector.types';

export const themeSelectorClassNames: SlotClassNames<ThemeSelectorSlots> = {
  root: 'ThemeSelector',
  button: 'ThemeSelector-Button',
  list: 'ThemeSelector-List',
};

const useStyles = makeStyles({
  root: {},
  button: {},
  list: {},
});

export function useThemeSelectorStyles(states: ThemeSelectorStates) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    themeSelectorClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.button) {
    states.button.className = mergeClasses(
      themeSelectorClassNames.button,
      classNames.button,
      states.button.className
    );
  }

  if (states.list) {
    states.list.className = mergeClasses(
      themeSelectorClassNames.list,
      classNames.list,
      states.list.className
    );
  }

  return states;
}
