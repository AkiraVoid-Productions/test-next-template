/** Represents the props of custom `error` page and `global-error` page. */
type ErrorProps = {
  /**
   * An instance of an
   * [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
   * object. This error can happen on the server or the client.
   */
  error: Error;
  /** A function to reset the error boundary, which does not return a response. */
  reset: () => void;
};

export default ErrorProps;
