import {EventResponder} from "./event_responder.js";
import {Version} from "./data/version.js";
import {Stack} from "./data/stack.js";

export class Application extends EventResponder {

    constructor(responder, {name, version}) {
        super(responder);

        this._name = name;
        this._setVersion(version);
    }

    get name() {
        return this._name;
    }

    get version() {
        return this._version;
    }

    _setVersion(version) {
        try {
            this._version = Version.parse(version);
        } catch(e) {
            this._version = new Version();
            this.propagateError(e);
        }
    }
}
