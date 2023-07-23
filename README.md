# Next.js Web Template for AkiraVoid

This is a template of Next.js 13 appDir built for AkiraVoid and AkiraVoid Productions, which enabled Fluent UI v9 and internationalization support.

> There's no component testing because this feature of Playwright is currently experimental.

## Coding styles

### Naming conventions

This is a series of conventions that applied while we are deciding the name for an identifier. If you saw an identifier which does not follow these conventions, then it can only be an identifier from vanilla JavaScript or third-party libraries.

#### General

- Prefer full name rather than abbreviation/acronym, unless that abbreviation or acronym is widely recognizable. In short, the priority of choosing a identifier name is `Widely recognizable abbreviation/acronym > Full name > abbreviation > acronym`. For example, use `language` rather than `lng`, but use `id` rather than `identity`.
- Although shorter name is preferred, there is no such restriction that only the name whose length is shorter than xxx can be applied.
- In camelCase or PascalCase, the acronyms should also follow the rule of casing, which means only the first character in an acronym may be uppercase, do not use full uppercase for a acronym. For example, use `http` or `Http` rather than `HTTP`.
- Always chose words that are easy to read and understand.
- Prefer readability rather than brevity. For example, `HorizontalAlignment` is better than `AlignmentOnXAxis`
- Limit the usage of number as less as possible.
- Do not use any non-alphanumeric character unless it is by convention.
- Avoid using keywords of JavaScript/TypeScript, built-in identifiers or identifiers that are exported by other libraries.

#### Variables

- Use camelCase.
- Use `is` or `has` prefix if it's a boolean value.
- Use noun (phrase) or adjective (phrase).
- Use singular form if it represents a single item/value, or plural form if it represents a collection.

#### Constants

- Use CONSTANT_CASE only if it is a global constant (which is rarely used), use camelCase otherwise.
- Use `is` or `has` prefix if it's a boolean value.
- Use noun (phrase) or adjective (phrase).
- Use singular form if it represents a single item/value, or plural form if it represents a collection.

#### Functions

- Use camelCase.
- Use verb or verb phrase. A function is generally used to "do something" on a specified object, which means it should always be a verb that describes what the caller will do to one object. For example, use `getItem` rather than `item`.
- If the function returns a boolean value, its name should be prefixed with helping verb like `is`, `has`, `can`, `should`, `does` and `will`. You could imagine that functions with these prefixes sound like actions of "asking". They ask the objects if the answers of those statements are yes or no. For example, a function that check if a file is accessible might be named as `canAccess(file)`, which sounds like the caller asked the file "can I access you?".
- Suffix with `Async` if it is an asynchronous function.

#### Classes, types, interfaces

- Use PascalCase.
- Use noun (phrase) or adjective (phrase).
- Use singular form.

#### Interfaces

- Use prefix `I`.

#### Generic type parameters

- Use PascalCase.
- Always name as `T` if there's only one type parameter.
- If there are multiple type parameters, use `T` as prefix, and give them names which describe what them are used for. These names should be noun (phrase) or adjective (phrase). For example, the type parameter which describe the type of options which belongs to the instance of the class should be `TOptions`.

#### Enums

- Use PascalCase in both enum name and member name.
- Use noun or noun phrase in enum name.
- Use noun (phrase) or adjective (phrase) in member name.
- Use singular form in both enum name and member name.

#### Member of classes

- Prefix all private members with `_`.

##### Properties

- Follow variable conventions.

##### Methods

- Follow function conventions.

##### Events

- Use camelCase.
- Prefix with `on`.
- Do not suffix with `Event`.
- Use verb or verb phrase to identify the action that will trigger this event. For example, a event that will only be triggered by the changing made to a property could be named as `onPropertyChange`.
- Use tense to identify lifecycle. For example, `onChange` triggers **before** the property changes, while `onChanged` triggers **after** the property changed.
- Limit the usage of -ing tense because it is usually hard to decide which line we should trigger this event. For example, where we should trigger `onTranslating` event? Going to read translations? After translations read? Or the last line before the line which changes the value? But it will be useful if we are doing an asynchronous job, we can trigger it immediately after we started this job.

#### Parameters

- Follow variable convention.
- If a parameter is a function, then it should follow function conventions.

#### Folder and file name

- Use kebab-case, unless it's a file that exports something, then use the name of main/default exported module.
- These rules do not apply to folders and files in `/src/app`, `/public` directories as these directories follow conventions defined by Next.js to achieve some functions, also to those special folders/files in `/src` like `middleware.ts`.

### Indentation & Spacing

- Indent with 2 spaces.
- Each code block (code surrounded by `{}` or finishes a part of job is considered a block) needs to be separated with follow code by 1 line.

### Comments

- Use `/** */` instead of `//`, `///`, `/* */` in any comment.
