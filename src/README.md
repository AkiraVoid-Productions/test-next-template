# Source code

This directory is where to store the application source code.

## Structure

- `app` is the directory for [Next.js 13 appDir](https://nextjs.org/docs/app/building-your-application/routing).
- `components` stores all components that may be used at anywhere of this application.
- `helpers` stores helpers. A helper is a class which can be instantiated and do a series of certain jobs.
- `i18n` stores files related to internationalization.
  - `locales` stores the folders of supported locales which store translation files.
    - `[locale]` stores the translation files which are named as [i18next namespace](https://www.i18next.com/principles/namespaces).
- `middleware` stores all middleware used by this application.
- `types` stores types/interfaces about this application. In general, each type is separated into one file, unless there's several types/interfaces are strongly related.
- `utilities` stores utilities used in this application. An utility is a function that do one certain job.
- `middleware.ts` is from Next.js 13, it defines what middleware will be used in this application, while `middleware` folder hosting the real implementations about those middleware.
