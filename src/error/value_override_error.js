import {UnsupportedOperationError} from "unsupported_operation_error.js";

/**
 * Error which is thrown whenever a value can not be overwritten
 * @author Christoph Grundmann
 * @class ValueOverrideError
 * @param {string} key - The key of the value which can not be overridden
 */
export function ValueOverrideError(key) {
    let message = "Value for key <" + key + "> can not be overwritten";
    let base = Error.apply(this, [message]);
    base.name = this.name = "ValueOverrideError";
    this.message = base.message;
}

// inherit from Error
ValueOverrideError.prototype = Object.create(UnsupportedOperationError.prototype, {
    constructor: {
        value: ValueOverrideError,
        writable: true,
        configurable: true
    }
});
