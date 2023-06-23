'use client';

import { useChangeLocale } from '@/i18n/client';
import LanguageCode from '@/types/LanguageCode';
import UseComponent from '@/types/UseComponent';
import { useLocale } from '@/utilities/commonClient';
import {
  getNativeElementProps,
  MenuButton,
  MenuItemRadio,
  MenuList,
  resolveShorthand,
} from '@fluentui/react-components';
import { EarthRegular } from '@fluentui/react-icons';

import { useSiteConfiguration } from '../SiteConfigurationProvider';
import {
  LocaleSelectorProps,
  LocaleSelectorStates,
} from './LocaleSelector.types';

const getLanguageName = (
  nameCombination: { local?: string; english?: string; translation?: string },
  isLanguageTranslatedNameHidden = false
) => {
  let name = '';
  if (nameCombination.translation && !isLanguageTranslatedNameHidden) {
    name += nameCombination.translation;
  }

  if (nameCombination.local) {
    name =
      name === '' ? nameCombination.local : `${name}(${nameCombination.local})`;
  }

  if (nameCombination.english) {
    name =
      name === ''
        ? nameCombination.english
        : `${name}(${nameCombination.english})`;
  }

  return name;
};

export const useLocaleSelector: UseComponent<
  LocaleSelectorProps,
  LocaleSelectorStates
> = (props, ref) => {
  const { button, list, strings, isLanguageTranslatedNameHidden, menuProps } =
    props;
  const currentLocale = useLocale();
  const changeLocale = useChangeLocale();
  const { locales } = useSiteConfiguration();

  const resolvedButton = resolveShorthand(button, {
    required: true,
    defaultProps: {
      appearance: 'subtle',
      icon: <EarthRegular />,
      children:
        strings && strings[currentLocale]
          ? getLanguageName(
              strings[currentLocale]!,
              isLanguageTranslatedNameHidden
            )
          : currentLocale,
    },
  });

  const resolvedList = resolveShorthand(list, {
    required: true,
    defaultProps: {
      children: locales.map(locale => (
        <MenuItemRadio key={locale} name='locale' value={locale}>
          {strings && strings[locale]
            ? getLanguageName(strings[locale]!, isLanguageTranslatedNameHidden)
            : locale}
        </MenuItemRadio>
      )),
    },
  });

  return {
    components: {
      root: 'div',
      button: MenuButton,
      list: MenuList,
    },
    root: getNativeElementProps('div', { ...props, ref }),
    button: resolvedButton,
    list: resolvedList,
    menuProps: {
      onCheckedValueChange: (_, data) =>
        data.checkedItems.length > 0 &&
        changeLocale(data.checkedItems[0] as LanguageCode),
      checkedValues: { locale: [currentLocale] },
      ...menuProps,
    },
    tooltipContent: strings?.selectLocale?.translation
      ? `${strings.selectLocale.translation}${
          strings?.selectLocale?.english
            ? `(${strings?.selectLocale?.english})`
            : ''
        }`
      : strings?.selectLocale?.english ?? '',
  };
};
