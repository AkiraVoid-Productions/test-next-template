---
to: "<%= locals.to ? `${locals.to}/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.props.tsx` : `src/components/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.props.tsx` %>"
---
<%
  NamePascal = h.changeCase.pascal(name)
%>
<%
  nameCamel = h.changeCase.camel(name)
%>
'use client';

import UseComponent from '@/types/UseComponent';
import { <%= NamePascal %>Props, <%= NamePascal %>States } from './<%= NamePascal %>.types';
import {
  getNativeElementProps,
  resolveShorthand,
} from '@fluentui/react-components';
import React from 'react';

export const use<%= NamePascal %>: UseComponent<<%= NamePascal %>Props, <%= NamePascal %>States> = (
  props,
  ref
) => {
  const { } = props;

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', { ...props, ref }),
  };
};
