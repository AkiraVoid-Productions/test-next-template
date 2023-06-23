'use client';

import { forwardRef } from 'react';

import { ForwardRefComponent } from '@fluentui/react-components';

import { useLocaleSelector } from './LocaleSelector.props';
import { renderLocaleSelector } from './LocaleSelector.render';
import { useLocaleSelectorStyles } from './LocaleSelector.styles';
import { LocaleSelectorProps } from './LocaleSelector.types';

/**
 * Let user chose the locale.
 *
 * You should wrap this component in a Suspense boundary if you want other parts
 * of page to be server-side rendering.
 *
 * @example
 *   export default function Page() {
 *     return (
 *       <Suspense>
 *         <LocaleSelector />
 *       </Suspense>
 *     );
 *   }
 */
export const Component: ForwardRefComponent<LocaleSelectorProps> = forwardRef(
  (props, ref) => {
    const states = useLocaleSelector(props, ref);
    useLocaleSelectorStyles(states);

    return renderLocaleSelector(states);
  }
);

Component.displayName = 'LocaleSelector';
