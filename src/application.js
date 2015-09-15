import {EventResponder} from "./event_responder.js";

export class Application extends EventResponder {


    constructor({name, version}) {
        super();

        this._name = name;
        this._version = new Version(version);
    }

    get name() {
        return this._name;
    }

    get version() {
        return this._version;
    }
}

export class Version {

}
