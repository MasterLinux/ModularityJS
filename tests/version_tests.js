import {Version} from "../src/data/version.js";
import {expect, assert} from "chai";

export var VersionTests = (function () {

    describe("Version", () => {

        it("should parse version string <1.2.4>", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 2;
            let expectedMaintenanceVersion = 4;
            let expectedVersionNumber = `${expectedMajorVersion}.${expectedMinorVersion}.${expectedMaintenanceVersion}`;
            let versionUnderTest = new Version(expectedVersionNumber);

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should parse version string <0.0.0>", (done) => {
            let expectedMajorVersion = 0;
            let expectedMinorVersion = 0;
            let expectedMaintenanceVersion = 0;
            let expectedVersionNumber = `${expectedMajorVersion}.${expectedMinorVersion}.${expectedMaintenanceVersion}`;
            let versionUnderTest = new Version(expectedVersionNumber);

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should parse version string <-1.-2.-4>", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 0;
            let expectedMaintenanceVersion = 0;
            let expectedVersionNumber = `-1.-2.-4`;
            let versionUnderTest = new Version(expectedVersionNumber);

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should parse version string <1.2>", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 2;
            let expectedMaintenanceVersion = 0;
            let expectedVersionNumber = `${expectedMajorVersion}.${expectedMinorVersion}`;
            let versionUnderTest = new Version(expectedVersionNumber);

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should parse version string <1>", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 0;
            let expectedMaintenanceVersion = 0;
            let expectedVersionNumber = `${expectedMajorVersion}`;
            let versionUnderTest = new Version(expectedVersionNumber);

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should use defaults on instantiating without version string", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 0;
            let expectedMaintenanceVersion = 0;
            let versionUnderTest = new Version();

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should use defaults if not parsable", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 0;
            let expectedMaintenanceVersion = 0;
            let versionUnderTest = new Version("");
            let anotherVersionUnderTest = new Version("a");
            let yetAnotherVersionUnderTest = new Version("a.2");
            let yetAnotherVersionUnderTest2 = new Version("a.b.2.3.5");

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            expect(anotherVersionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(anotherVersionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(anotherVersionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            expect(yetAnotherVersionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(yetAnotherVersionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(yetAnotherVersionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            expect(yetAnotherVersionUnderTest2.major).to.be.equal(expectedMajorVersion);
            expect(yetAnotherVersionUnderTest2.minor).to.be.equal(expectedMinorVersion);
            expect(yetAnotherVersionUnderTest2.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should generate readable version string", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 2;
            let expectedMaintenanceVersion = 4;
            let expectedVersionNumber = `${expectedMajorVersion}.${expectedMinorVersion}.${expectedMaintenanceVersion}`;
            let versionUnderTest = new Version(expectedVersionNumber);

            expect(versionUnderTest.toString()).to.be.equal(expectedVersionNumber);

            done();
        });

    });
})();
