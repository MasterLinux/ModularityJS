import * as TypeUtilities from "../utility/type_utility.js";
import {VersionParser} from "../parser/version_parser.js";

export class Version {

    constructor(version = `${Version.defaultMajorVersion}`) {
        try {
            let result = VersionParser.parse(version);

            this._major = result.major;
            this._minor = result.minor;
            this._maintenance = result.maintenance;
        } catch (e) {
            this._major = Version.defaultMajorVersion;
            this._minor = Version.defaultMinorVersion;
            this._maintenance = Version.defaultMaintenanceVersion;
        }
    }

    static get defaultMajorVersion() {
        return 1;
    }

    static get defaultMinorVersion() {
        return 0;
    }

    static get defaultMaintenanceVersion() {
        return 0;
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

    toString() {
        return `${this.major}.${this.minor}.${this.maintenance}`;
    }
}
