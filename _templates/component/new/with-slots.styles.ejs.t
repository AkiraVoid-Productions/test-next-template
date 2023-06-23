---
to: "<%= locals.to ? `${locals.to}/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.styles.ts` : `src/components/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.styles.ts` %>"
---
<%
  NamePascal = h.changeCase.pascal(name)
%>
<%
  nameCamel = h.changeCase.camel(name)
%>
'use client';

import {
  SlotClassNames,
  makeStyles,
  mergeClasses,
} from '@fluentui/react-components';
import { <%= NamePascal %>Slots, <%= NamePascal %>States } from './<%= NamePascal %>.types';

export const <%= nameCamel %>ClassNames: SlotClassNames<<%= NamePascal %>Slots> = {
  root: '<%= NamePascal %>',
};

const useStyles = makeStyles({
  root: {}
});

export function use<%= NamePascal %>Styles(states: <%= NamePascal %>States) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    <%= nameCamel %>ClassNames.root,
    classNames.root,
    states.root.className
  );

  return states;
}
