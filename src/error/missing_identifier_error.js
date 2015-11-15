export function MissingIdentifierError(message) {
    message = message ? message : "Identifier is missing";
    let base = Error.apply(this, [message]);
    base.name = this.name = "MissingIdentifierError";
    this.message = base.message;
}

// inherit from Error
MissingIdentifierError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: MissingIdentifierError,
        writable: true,
        configurable: true
    }
});
