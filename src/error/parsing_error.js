/**
 * Error which is thrown when parsing fails
 * @author Christoph Grundmann
 * @class ParsingError
 * @param {string} type - The type of the parser which fails
 * @param {*} value - The value which is not parsable
 * @param {Error} [error] - The specific error thrown by the parser
 */
export function ParsingError(type, value, error) {
    let message = `Parsing of <${value}> failed. Parser: <${type}> - error: <${error ? error.message : "unknown"}>`;
    let base = Error.apply(this, [message]);
    base.name = this.name = "ParsingError";
    this.message = base.message;
}

// inherit from Error
ParsingError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: ParsingError,
        writable: true,
        configurable: true
    }
});
