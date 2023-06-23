/**
 * Represents a function used to render component with slots.
 *
 * @template T The type of the props of component.
 */
interface RenderComponent<T> {
  /**
   * Render the component.
   *
   * @memberof RenderComponent
   * @param {T} states An object includes the states of this component.
   * @returns {JSX.Element} The rendered component.
   */
  (states: T): JSX.Element;
}

export default RenderComponent;
