/**
 * Error which is thrown to indicate that the requested operation is not supported
 * @author Christoph Grundmann
 * @class UnsupportedOperationError
 * @param {string} message - The specific error message
 */
export function UnsupportedOperationError(message) {
    let base = Error.apply(this, [message]);
    base.name = this.name = "UnsupportedOperationError";
    this.message = base.message;
}

// inherit from Error
UnsupportedOperationError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: UnsupportedOperationError,
        writable: true,
        configurable: true
    }
});
