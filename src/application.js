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
    constructor(version) {
        var [major, minor, maintenance] = version.split(".");

        this._maintenance = parseInt(maintenance);
        this._major = parseInt(major);
        this._minor = parseInt(minor);
    }

    get maintenance() {
        return this._maintenance;
    }

    get major() {
        return this._major;
    }

    get minor() {
        return this._minor;
    }
}
