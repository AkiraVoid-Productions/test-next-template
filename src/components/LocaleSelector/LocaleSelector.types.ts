import LanguageCode from '@/types/LanguageCode';
import {
  ComponentProps,
  ComponentState,
  MenuButton,
  MenuList,
  MenuProps,
  Slot,
} from '@fluentui/react-components';

/** Represents slots of `LocaleSelector` component. */
export type LocaleSelectorSlots = {
  /** The root of `LocaleSelector`. */
  root: NonNullable<Slot<'div'>>;
  /**
   * The button of `LocaleSelector` which is used to open a locale list to
   * select locale, is an instance of `MenuButton`.
   */
  button?: NonNullable<Slot<typeof MenuButton>>;
  /** The list contains supported locales, is an instance of `MenuList`. */
  list?: Slot<typeof MenuList>;
};

/** Represents the props of `LocaleSelector`. */
export type LocaleSelectorProps = ComponentProps<LocaleSelectorSlots> & {
  /**
   * `LocaleSelector` contains a menu used to chose locale, this property is the
   * props which applied to that menu.
   *
   * You cannot leverage this property to control what is going to displayed in
   * this menu, use slot properties of this component instead.
   */
  menuProps?: Omit<MenuProps, 'children'>;
  /**
   * The strings that will be displayed by this component.
   *
   * There're some differences between this component with normal components.
   * This component shows a list of supported languages, but there's a common
   * situation that a user use this component because the site displayed in a
   * language that the user don't understand. For better supporting global wide
   * users, each string displayed by this component needs two variations: the
   * translated one which use current chosen language and the one in English,
   * which is the most widely used language. Also, for language names in
   * language list, we need the third variation which is the local name (name of
   * a language in that language) of those languages, in the case that some
   * users don't neither understand auto-chosen language nor English but
   * recognize the icon of this component.
   */
  strings?: {
    [TKey in LanguageCode]+?: {
      /** The local name of this language. */
      local?: string;
      /** The name of this language in English. */
      english?: string;
      /** The name of this language in current chosen language. */
      translation?: string;
    };
  } & {
    /** The string displayed as label of this component. */
    selectLocale?: {
      /** The string in English. */
      english?: string;
      /** The string in current chosen language. */
      translation?: string;
    };
  };
  /**
   * A value indicating whether we should hide the translated name of languages
   * in language list or not.
   *
   * We provide this property because some developers may think a long menu item
   * is ugly and translated name would be so rarely useful that hide it would be
   * OK.
   *
   * @default false
   */
  isLanguageTranslatedNameHidden?: boolean;
};

/** Represents the component states of `LocaleSelector`. */
export type LocaleSelectorStates = ComponentState<LocaleSelectorSlots> &
  Required<Pick<LocaleSelectorProps, 'menuProps'>> & {
    tooltipContent: string;
  };
