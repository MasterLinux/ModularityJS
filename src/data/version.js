import * as TypeUtilities from "../utility/type_utility.js";

export class Version {

    constructor(version = `${Version.defaultMajorVersion}`) {
        var [major, minor, maintenance] = version.split(".");

        maintenance = parseInt(maintenance);
        major = parseInt(major);
        minor = parseInt(minor);

        if (!TypeUtilities.isNaN(major) && major >= 0) {
            this._major = major;

            if (!TypeUtilities.isNaN(minor) && minor >= 0) {
                this._minor = minor;

                if (!TypeUtilities.isNaN(maintenance) && maintenance >= 0) {
                    this._maintenance = maintenance;
                }
            }
        }

        this._major = TypeUtilities.isNumber(this.major) ? this.major : Version.defaultMajorVersion;
        this._minor = TypeUtilities.isNumber(this.minor) ? this.minor : Version.defaultMinorVersion;
        this._maintenance = TypeUtilities.isNumber(this.maintenance) ? this.maintenance : Version.defaultMaintenanceVersion;
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
