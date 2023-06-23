---
to: "<%= locals.to ? `${locals.to}/${h.changeCase.pascal(name)}/index.tsx` : `src/components/${h.changeCase.pascal(name)}/index.tsx` %>"
---
<%
  NamePascal = h.changeCase.pascal(name)
%>
<%
  nameCamel = h.changeCase.camel(name)
%>
import React from 'react';

type <%= NamePascal %>Props = React.HTMLAttributes<HTMLDivElement> & {};

const Component = React.forwardRef<HTMLDivElement, <%= NamePascal %>Props>((props, ref) => {
  return <div {...props} ref={ref} />;
});

Component.displayName = '<%= NamePascal %>';