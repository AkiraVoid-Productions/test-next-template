'use client';

import {
  makeStyles,
  mergeClasses,
  SlotClassNames,
} from '@fluentui/react-components';

import {
  LocaleSelectorSlots,
  LocaleSelectorStates,
} from './LocaleSelector.types';

export const localeSelectorClassNames: SlotClassNames<LocaleSelectorSlots> = {
  root: 'LocaleSelector',
  button: 'LocaleSelector-Button',
  list: 'LocaleSelector-List',
};

const useStyles = makeStyles({
  root: {},
  button: {},
  list: {},
});

export function useLocaleSelectorStyles(states: LocaleSelectorStates) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    localeSelectorClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.button) {
    states.button.className = mergeClasses(
      localeSelectorClassNames.button,
      classNames.button,
      states.button.className
    );
  }

  if (states.list) {
    states.list.className = mergeClasses(
      localeSelectorClassNames.list,
      classNames.list,
      states.list.className
    );
  }

  return states;
}
