'use client';

import RenderComponent from '@/types/RenderComponent';
import {
  getSlots,
  Menu,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components';

import {
  LocaleSelectorSlots,
  LocaleSelectorStates,
} from './LocaleSelector.types';

export const renderLocaleSelector: RenderComponent<
  LocaleSelectorStates
> = states => {
  const { slots, slotProps } = getSlots<LocaleSelectorSlots>(states);

  return (
    <slots.root {...slotProps.root}>
      <Menu {...states.menuProps}>
        <MenuTrigger>
          {slots.button && (
            <Tooltip relationship='label' content={states.tooltipContent}>
              <slots.button {...slotProps.button}>
                {slotProps.root.children ?? slotProps.button.children}
              </slots.button>
            </Tooltip>
          )}
        </MenuTrigger>
        <MenuPopover>
          {slots.list && <slots.list {...slotProps.list} />}
        </MenuPopover>
      </Menu>
    </slots.root>
  );
};
