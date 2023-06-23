import {
  ComponentProps,
  ComponentState,
  MenuButton,
  MenuList,
  MenuProps,
  Slot,
} from '@fluentui/react-components';

/** Represents slots of `ThemeSelector` component. */
export type ThemeSelectorSlots = {
  /** The root of `ThemeSelector`. */
  root: NonNullable<Slot<'div'>>;
  /**
   * The button of `ThemeSelector` which is used to open a theme list to select
   * theme, is an instance of `MenuButton`.
   */
  button?: NonNullable<Slot<typeof MenuButton>>;
  /** The list contains supported themes, is an instance of `MenuList`. */
  list?: Slot<typeof MenuList>;
};

/** Represents the props of `ThemeSelector`. */
export type ThemeSelectorProps = ComponentProps<ThemeSelectorSlots> &
  IComponentStrings<
    'light' | 'dark' | 'highContrast' | 'browser' | 'selectTheme'
  > & {
    /**
     * `ThemeSelector` contains a menu used to chose theme, this property is the
     * props which applied to that menu.
     *
     * You cannot leverage this property to control what is going to displayed
     * in this menu, use slot properties of this component instead.
     */
    menuProps?: Omit<MenuProps, 'children'>;
  };

/** Represents the component states of `ThemeSelector`. */
export type ThemeSelectorStates = ComponentState<ThemeSelectorSlots> &
  Required<Pick<ThemeSelectorProps, 'menuProps'>> & {
    tooltipContent: string;
  };
