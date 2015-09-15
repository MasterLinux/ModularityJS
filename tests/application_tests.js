import {Application} from "../src/application.js";
import {EventResponder} from "../src/event_responder.js";
import {expect, assert} from "chai";

export var ApplicationTests = (function () {
    describe("Application", () => {

        it("should initialize app with info", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 2;
            let expectedMaintenanceVersion = 4;
            let expectedAppName = "test_app";
            let appUnderTest = new Application({
                name: expectedAppName,
                version: `${expectedMajorVersion}.${expectedMinorVersion}.${expectedMaintenanceVersion}`
            });

            expect(appUnderTest).to.be.an.instanceof(EventResponder);
            expect(appUnderTest.name).to.be.equal(expectedAppName);
            expect(appUnderTest.version.major).to.be.equal(expectedMajorVersion);
            expect(appUnderTest.version.minor).to.be.equal(expectedMinorVersion);
            expect(appUnderTest.version.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

    });
})();
