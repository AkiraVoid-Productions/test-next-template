import React from 'react';

/**
 * Represents a slot components specified React hook used to compute states of
 * the component by given component props.
 *
 * @template TProps The type of component props.
 * @template TStates The type of component states.
 */
interface UseComponent<TProps, TStates> {
  /**
   * Compute states of the component by given component props.
   *
   * @memberof UseComponent
   * @param {TProps} props The props used to compute component states.
   * @param {React.ForwardedRef<any>} [ref] The forwarded ref object of React
   *   refer to the root of this component.
   * @returns {TStates} Computed states of the component.
   */
  (props: TProps, ref?: React.ForwardedRef<any>): TStates;
}

export default UseComponent;
