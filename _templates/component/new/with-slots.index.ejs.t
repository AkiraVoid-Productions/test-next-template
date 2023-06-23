---
to: "<%= locals.to ? `${locals.to}/${h.changeCase.pascal(name)}/index.ts` : `src/components/${h.changeCase.pascal(name)}/index.ts` %>"
---
<%
  NamePascal = h.changeCase.pascal(name)
%>
'use client';

import { Component as <%= NamePascal %> } from './<%= NamePascal %>';

export * from './<%= NamePascal %>.props';
export * from './<%= NamePascal %>.render';
export * from './<%= NamePascal %>.styles';
export * from './<%= NamePascal %>.types';

export default <%= NamePascal %>;
