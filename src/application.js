import {EventResponder} from "./event_responder.js";
import {Version} from "./data/version.js";
import {Author} from "./data/author.js";
import {Stack} from "./data/stack.js";

export class Application extends EventResponder {

    constructor(responder, {name, version, author, company}) {
        super(responder);

        this._name = name;
        this._company = company;
        this._setVersion(version);
        this._setAuthor(author);
    }

    get name() {
        return this._name;
    }

    get version() {
        return this._version;
    }

    get author() {
        return this._author;
    }

    get company() {
        return this._company;
    }

    /**
     * @private
     */
    _setVersion(version) {
        try {
            this._version = Version.parse(version);
        } catch(e) {
            this._version = new Version();
            this.propagateError(e);
        }
    }

    /**
     * @private
     */
    _setAuthor(author) {
        try {
            this._author = Author.parse(author);
        } catch(e) {
            this._author = null;
            this.propagateError(e);
        }
    }
}
