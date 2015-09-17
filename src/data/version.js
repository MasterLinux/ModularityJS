import * as TypeUtilities from "../utility/type_utility.js";
import {VersionParser} from "../parser/version_parser.js";
import {ParsingError} from "../error/parsing_error.js";

export class Version {

    constructor({
        major = Version.defaultMajorVersion,
        minor = Version.defaultMinorVersion,
        maintenance = Version.defaultMaintenanceVersion
        } = {}) {
        this._major = major;
        this._minor = minor;
        this._maintenance = maintenance;
    }

    static parse(version) {
        let major;
        let minor;
        let maintenance;

        try {
            let result = VersionParser.parse(version);

            major = result.major;
            minor = result.minor;
            maintenance = result.maintenance;
        } catch (e) {
            throw new ParsingError("Version", version, e);
        }

        return new Version({
            major: major,
            minor: minor,
            maintenance: maintenance
        });
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
