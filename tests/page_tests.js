import {Page} from "../src/page.js";
import {Dictionary} from "../src/data/dictionary.js";
import {EventResponderMock} from "./mocks/event_responder_mock.js";
import {MissingIdentifierError} from "../src/error/missing_identifier_error.js";
import {NavigationError} from "../src/error/navigation_error.js";
import {expect, assert} from "chai";

(function () {
    describe("Page", () => {

        it("should create page using config", (done) => {
            let expectedId = "test_id";
            let expectedTitle = "test_title";
            let pageUnderTest = Page.create(null, {
                id: expectedId,
                title: expectedTitle
            });

            expect(pageUnderTest.id).to.be.equal(expectedId);
            expect(pageUnderTest.title).to.be.equal(expectedTitle);

            done()
        });

        it("should throw error on missing ID", (done) => {
            // child ID is missing
            expect(() => {
                Page.create(null, {
                    id: "test_id",
                    title: "test_title",
                    children: [{
                        title: "test_title"
                    }]
                });
            }).to.throw(MissingIdentifierError);

            // page ID is missing
            expect(() => {
                Page.create(null, {});
            }).to.throw(MissingIdentifierError);

            // page ID is invalid
            expect(() => {
                Page.create(null, {
                    id: ""
                });
            }).to.throw(MissingIdentifierError);

            done()
        });

        it("should set parent", (done) => {
            let responderUnderTest = new EventResponderMock(null, (_) => {
            });

            // should set previousPage to null if parent is not a page
            let pageUnderTest = Page.create(responderUnderTest, {
                id: "test_id"
            });

            // should set page as previousPage
            let anotherPageUnderTest = Page.create(pageUnderTest, {
                id: "test_id"
            });

            // each other value should set null, too
            let yetAnotherPageUnderTest = Page.create(undefined, {
                id: "test_id"
            });

            expect(pageUnderTest.previousPage).to.be.null;
            expect(anotherPageUnderTest.previousPage).to.be.not.null;
            expect(anotherPageUnderTest.previousPage).to.be.instanceOf(Page);
            expect(yetAnotherPageUnderTest.previousPage).to.be.null;
            done();
        });

        it("should add page to navigation stack", (done) => {
            let expectedTitle = "test_title";
            let expectedId = "test_id";
            let anotherExpectedTitle = "test_title_2";
            let anotherExpectedId = "test_id_2";

            let expectedPage = {
                id: expectedId,
                title: expectedTitle
            };

            let pageUnderTest = Page.create(undefined, {
                id: anotherExpectedId,
                title: anotherExpectedTitle,
                children: [expectedPage]
            });

            expect(pageUnderTest.nextPage).to.be.null;
            expect(pageUnderTest.children).to.be.not.null;
            expect(pageUnderTest.children).to.be.instanceOf(Dictionary);
            expect(pageUnderTest.children.length).to.be.equal(1);

            pageUnderTest.navigateTo(expectedId);

            let nextPageUnderTest = pageUnderTest.nextPage;
            expect(nextPageUnderTest).to.be.instanceOf(Page);
            expect(nextPageUnderTest.id).to.be.equal(expectedId);
            expect(nextPageUnderTest.title).to.be.equal(expectedTitle);

            let prevPageUnderTest = nextPageUnderTest.previousPage;
            expect(prevPageUnderTest).to.be.instanceOf(Page);
            expect(prevPageUnderTest.id).to.be.equal(anotherExpectedId);
            expect(prevPageUnderTest.title).to.be.equal(anotherExpectedTitle);

            expect(prevPageUnderTest.previousPage).to.be.null;

            done()
        });

        it("should return whether navigation was successful or not", (done) => {
            let expectedId = "test_id";

            let expectedPage = {
                id: expectedId
            };

            let pageUnderTest = Page.create(undefined, {
                id: "test_id_2",
                children: [expectedPage]
            });

            expect(pageUnderTest.navigateTo(expectedId)).to.be.true;
            expect(pageUnderTest.navigateTo("unavailable_page_id")).to.be.false;

            done()
        });

        it("should be rendered", (done) => {
            let expectedId = "test_id";

            let expectedPage = {
                id: expectedId
            };

            let pageUnderTest = Page.create(undefined, {
                id: "test_id_2",
                children: [expectedPage]
            });

            // root page must be rendered by calling render()
            expect(pageUnderTest.isRendered).to.be.false;
            pageUnderTest.addToDOM();
            expect(pageUnderTest.isRendered).to.be.true;

            // just one page is rendered at a time
            pageUnderTest.navigateTo(expectedId);
            expect(pageUnderTest.isRendered).to.be.false;
            expect(pageUnderTest.nextPage.isRendered).to.be.true;

            pageUnderTest.nextPage.navigateBack();
            expect(pageUnderTest.isRendered).to.be.true;

            done()
        });

        it("should navigate back", (done) => {
            let expectedId = "test_id";

            let expectedPage = {
                id: expectedId
            };

            let pageUnderTest = Page.create(undefined, {
                id: "test_id_2",
                children: [expectedPage]
            });

            pageUnderTest.addToDOM();

            pageUnderTest.navigateTo(expectedId);
            expect(pageUnderTest.nextPage).to.be.not.null;
            expect(pageUnderTest.nextPage.previousPage).to.be.equal(pageUnderTest);

            pageUnderTest.nextPage.navigateBack();
            expect(pageUnderTest.nextPage).to.be.null;

            done()
        });

        it("should propagate error on missing page on navigation", (done) => {
            let responderUnderTest = new EventResponderMock(null, (actualError) => {
                expect(actualError).to.be.an.instanceof(NavigationError);
                done()
            });

            let pageUnderTest = Page.create(responderUnderTest, {
                id: "test_id"
            });

            pageUnderTest.navigateTo("unavailable_page_id");
        });

    });

})();
