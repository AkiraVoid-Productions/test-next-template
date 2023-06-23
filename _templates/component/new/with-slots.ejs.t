---
to: "<%= locals.to ? `${locals.to}/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.ts` : `src/components/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.ts` %>"
---
<%
  NamePascal = h.changeCase.pascal(name)
%>
<%
  nameCamel = h.changeCase.camel(name)
%>
'use client';

import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { <%= NamePascal %>Props } from './<%= NamePascal %>.types';
import { use<%= NamePascal %> } from './<%= NamePascal %>.props';
import { use<%= NamePascal %>Styles } from './<%= NamePascal %>.styles';
import { render<%= NamePascal %> } from './<%= NamePascal %>.render';

export const Component: ForwardRefComponent<<%= NamePascal %>Props> = forwardRef(
  (props, ref) => {
    const states = use<%= NamePascal %>(props, ref);
    use<%= NamePascal %>Styles(states);

    return render<%= NamePascal %>(states);
  }
);

Component.displayName = '<%= NamePascal %>';