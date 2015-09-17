import {Version} from "../src/data/version.js";
import {ParsingError} from "../src/error/parsing_error.js";
import {expect, assert} from "chai";

(function () {

    describe("Version", () => {

        it("should parse version string <1.2.4>", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 2;
            let expectedMaintenanceVersion = 4;
            let expectedVersionNumber = `${expectedMajorVersion}.${expectedMinorVersion}.${expectedMaintenanceVersion}`;
            let versionUnderTest = Version.parse(expectedVersionNumber);

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
            let versionUnderTest = Version.parse(expectedVersionNumber);

            expect(versionUnderTest.major).to.be.equal(expectedMajorVersion);
            expect(versionUnderTest.minor).to.be.equal(expectedMinorVersion);
            expect(versionUnderTest.maintenance).to.be.equal(expectedMaintenanceVersion);

            done();
        });

        it("should throw error if not parsable", (done) => {

            expect(() => {
                Version.parse("-1.-2.-4");
            }).to.throw(ParsingError);

            expect(() => {
                Version.parse("");
            }).to.throw(ParsingError);

            expect(() => {
                Version.parse("a");
            }).to.throw(ParsingError);

            expect(() => {
                Version.parse("a.2");
            }).to.throw(ParsingError);

            expect(() => {
                Version.parse("a.b.2.3.5");
            }).to.throw(ParsingError);

            done();
        });

        it("should parse version string <1.2>", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 2;
            let expectedMaintenanceVersion = 0;
            let expectedVersionNumber = `${expectedMajorVersion}.${expectedMinorVersion}`;
            let versionUnderTest = Version.parse(expectedVersionNumber);

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
            let versionUnderTest = Version.parse(expectedVersionNumber);

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

        it("should generate readable version string", (done) => {
            let expectedMajorVersion = 1;
            let expectedMinorVersion = 2;
            let expectedMaintenanceVersion = 4;
            let expectedVersionNumber = `${expectedMajorVersion}.${expectedMinorVersion}.${expectedMaintenanceVersion}`;
            let versionUnderTest = Version.parse(expectedVersionNumber);

            expect(versionUnderTest.toString()).to.be.equal(expectedVersionNumber);

            done();
        });

    });
})();
