import {Page} from "../src/page.js";
import {Dictionary} from "../src/data/dictionary.js";
import {expect, assert} from "chai";

(function () {
    describe("Page", () => {

        it("should create page using config", (done) => {
            let expectedId = "test_id";
            let expectedTitle = "test_title";
            let pageUnderTest = new Page(null, {
                id: expectedId,
                title: expectedTitle
            });

            expect(pageUnderTest.id).to.be.equal(expectedId);
            expect(pageUnderTest.title).to.be.equal(expectedTitle);

            done()
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

            let pageUnderTest = new Page(undefined, {
                id: anotherExpectedId,
                title: anotherExpectedTitle,
                pages: [expectedPage]
            });

            expect(pageUnderTest.nextPage).to.be.null;
            expect(pageUnderTest.navigationStack).to.be.not.null;
            expect(pageUnderTest.navigationStack).to.be.instanceOf(Dictionary);
            expect(pageUnderTest.navigationStack.length).to.be.equal(1);

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
            expect(prevPageUnderTest.previousPage).to.be.null;

            done()
        });

    });

})();
