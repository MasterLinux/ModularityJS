export function NavigationError(parentId, childId) {
    let message = `Unable to navigate to page with id <${childId}> because it does not exists in page <${parentId}>`;
    let base = Error.apply(this, [message]);
    base.name = this.name = "NavigationError";
    this.message = base.message;
}

// inherit from Error
NavigationError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: NavigationError,
        writable: true,
        configurable: true
    }
});
