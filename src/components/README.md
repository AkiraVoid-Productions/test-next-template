# src/components

This folder contains all components which will be used across every part of this app. If one component will only be used in certain page, layout, template, etc., you should create it under the sub components folder in the same folder of which file used it.

You could create a component from template by run:

```shell
yarn hygen component new:<subAction> <componentName>{ --to <destination>}
```

with one of these sub actions:

| Sub action name | Description                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `with-slots`    | Generates a component with slots feature enabled.                                                                     |
| `simple`        | Generates a component which only has one file related to it, and export the component itself by default in that file. |
