import {VersionParser} from "../parser/version_parser.js";
import {ParsingError} from "../error/parsing_error.js";

export class Version {

    constructor({major = 1, minor = 0, maintenance = 0} = {}) {
        this._major = major;
        this._minor = minor;
        this._maintenance = maintenance;
    }

    static parse(version) {
        let major, minor, maintenance;

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
