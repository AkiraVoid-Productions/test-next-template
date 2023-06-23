---
to: "<%= locals.to ? `${locals.to}/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.types.ts` : `src/components/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.types.ts` %>"
---
<%
  NamePascal = h.changeCase.pascal(name)
%>
import {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-components';

/** Represents slots of `<%= NamePascal %>` component. */
export type <%= NamePascal %>Slots = {
  /** The root of `<%= NamePascal %>`. */
  root: NonNullable<Slot<'div'>>;
};

/** Represents the props of `<%= NamePascal %>`. */
export type <%= NamePascal %>Props = ComponentProps<<%= NamePascal %>Slots>;

/** Represents the component states of `<%= NamePascal %>`. */
export type <%= NamePascal %>States = ComponentState<<%= NamePascal %>Slots>;