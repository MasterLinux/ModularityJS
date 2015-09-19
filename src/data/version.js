import {VersionParser} from "../parser/version_parser.js";
import {ParsingError} from "../error/parsing_error.js";

export class Version {

    /**
     * Representation of a version number
     * @author Christoph Grundmann
     * @class Version
     * @param {object} [version]
     * @param {number} [version.major = 1] - The major part of the version number
     * @param {number} [version.minor = 0] - The minor part of the version number
     * @param {number} [version.maintenance = 0] - The maintenance part of the version number
     */
    constructor({major = 1, minor = 0, maintenance = 0} = {}) {
        this._major = major;
        this._minor = minor;
        this._maintenance = maintenance;
    }

    /**
     * Parses a version string to a {@link Version}
     * @memberOf Version
     * @function parse
     * @param {string} version - The string to parse
     * @throws Throws an error if the given string cannot be parsed
     * @static
     * @return {Version} The {@link Version} representing the given version string
     * @example
     * let version = Version.parse("1.2.4");
     *
     * console.log(version.major);
     * console.log(version.minor);
     * console.log(version.maintenance);
     */
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

    /**
     * Gets the maintenance part of the version number
     * @name maintenance
     * @memberOf Version
     * @type {number}
     * @readonly
     * @instance
     */
    get maintenance() {
        return this._maintenance;
    }

    /**
     * Gets the major part of the version number
     * @name major
     * @memberOf Version
     * @type {number}
     * @readonly
     * @instance
     */
    get major() {
        return this._major;
    }

    /**
     * Gets the minor part of the version number
     * @name minor
     * @memberOf Version
     * @type {number}
     * @readonly
     * @instance
     */
    get minor() {
        return this._minor;
    }

    /**
     * Gets the string representation of the version
     * @memberOf Version
     * @function toString
     * @instance
     * @return {string} The version number as string
     */
    toString() {
        return `${this.major}.${this.minor}.${this.maintenance}`;
    }
}
