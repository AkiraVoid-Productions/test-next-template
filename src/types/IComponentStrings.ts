/** Represents a group of strings that will be used in component rendering. */
interface IComponentStrings<T extends string> {
  /** The strings that will be displayed by this component. */
  strings?: {
    [key in T]+?: string;
  };
}
