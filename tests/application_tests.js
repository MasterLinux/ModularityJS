import {Application} from "../src/application.js";
import {Version} from "../src/data/version.js";
import {EventResponder} from "../src/event_responder.js";
import {expect, assert} from "chai";

export var ApplicationTests = (function () {
    describe("Application", () => {

        it("should initialize app with info", (done) => {
            let expectedVersion = "1.2.4";
            let expectedAppName = "test_app";
            let appUnderTest = new Application({
                name: expectedAppName,
                version: expectedVersion
            });

            expect(appUnderTest).to.be.an.instanceof(EventResponder);
            expect(appUnderTest.name).to.be.equal(expectedAppName);
            expect(appUnderTest.version).to.be.an.instanceof(Version);
            expect(appUnderTest.version.toString()).to.be.equal(expectedVersion);

            done();
        });

    });

})();
