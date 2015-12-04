import {Application} from "../src/application.js";
import {Version} from "../src/data/version.js";
import {Author} from "../src/data/author.js";
import {EventResponder} from "../src/event_responder.js";
import {EventResponderMock} from "./mocks/event_responder_mock.js";
import {ParsingError} from "../src/error/parsing_error.js";
import {Page} from "../src/page.js";
import {expect, assert} from "chai";

describe("Application", () => {

    it("should initialize app with info", (done) => {
        let expectedVersion = "1.2.4";
        let expectedAppName = "test_app";
        let expectedAuthor = "test author<test@mail.de>";
        let expectedCompany = "test_company";
        let appUnderTest = new Application(null, {
            name: expectedAppName,
            version: expectedVersion,
            author: expectedAuthor,
            company: expectedCompany
        });

        expect(appUnderTest).to.be.an.instanceof(EventResponder);
        expect(appUnderTest.name).to.be.equal(expectedAppName);
        expect(appUnderTest.version).to.be.an.instanceof(Version);
        expect(appUnderTest.version.toString()).to.be.equal(expectedVersion);
        expect(appUnderTest.author).to.be.an.instanceof(Author);
        expect(appUnderTest.author.toString()).to.be.equal(expectedAuthor);
        expect(appUnderTest.company).to.be.equal(expectedCompany);

        done();
    });

    it("should propagate error on initializing app with invalid version number", (done) => {
        let expectedVersion = "1.0.0";

        let responderUnderTest = new EventResponderMock(null, (actualError) => {
            expect(actualError).to.be.an.instanceof(ParsingError);
        });

        let appUnderTest = new Application(responderUnderTest, {
            name: "test_app",
            version: "a.2.4"
        });

        expect(appUnderTest.version).to.be.an.instanceof(Version);
        expect(appUnderTest.version.toString()).to.be.equal(expectedVersion);

        done();
    });

    it("should propagate error on initializing app with invalid author string", (done) => {
        let expectedAuthor = "test author<te st@mail.de>";

        let responderUnderTest = new EventResponderMock(null, (actualError) => {
            expect(actualError).to.be.an.instanceof(ParsingError);
        });

        let appUnderTest = new Application(responderUnderTest, {
            name: "test_app",
            version: "1.2.4",
            author: expectedAuthor
        });

        expect(appUnderTest.author).to.be.null;

        done();
    });

    it("should register new page using a config", (done) => {
        let expectedId = "test_page_id";

        let appUnderTest = new Application(null, {
            name: "test_app",
            version: "1.0.0"
        });

        appUnderTest.registerPage({
            id: expectedId
        });

        let actualPage = appUnderTest.pages.getItem(expectedId);

        expect(actualPage).to.be.an.instanceof(Page);
        expect(actualPage.id).to.be.equal(expectedId);

        done();
    });

});
