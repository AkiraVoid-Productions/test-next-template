---
to: "<%= locals.to ? `${locals.to}/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.render.tsx` : `src/components/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.render.tsx` %>"
---
<%
  NamePascal = h.changeCase.pascal(name)
%>
<%
  nameCamel = h.changeCase.camel(name)
%>
'use client';

import RenderComponent from '@/types/RenderComponent';
import { <%= NamePascal %>Slots, <%= NamePascal %>States } from './<%= NamePascal %>.types';
import { getSlots } from '@fluentui/react-components';

export const render<%= NamePascal %>: RenderComponent<<%= NamePascal %>States> = states => {
  const { slots, slotProps } = getSlots<<%= NamePascal %>Slots>(states);

  return <slots.root {...slotProps.root}></slots.root>
};