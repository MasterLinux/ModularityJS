import {Author} from "../src/data/author.js";
import {ParsingError} from "../src/error/parsing_error.js";
import {expect, assert} from "chai";

(function () {

    describe("Author", () => {

        it("should parse author string -> 'Test author<test@test.de>'", (done) => {
            let expectedEmail = "test@test.de";
            let expectedName = "Test author";
            let expectedAuthor = `${expectedName}<${expectedEmail}>`;
            let authorUnderTest = Author.parse(expectedAuthor);

            expect(authorUnderTest.name).to.be.equal(expectedName);
            expect(authorUnderTest.email).to.be.equal(expectedEmail);
            expect(authorUnderTest.toString()).to.be.equal(expectedAuthor);

            done();
        });

        it("should parse author string -> 'Test author'", (done) => {
            let expectedName = "Test author";
            let expectedAuthor = expectedName;
            let authorUnderTest = Author.parse(expectedAuthor);

            expect(authorUnderTest.name).to.be.equal(expectedName);
            expect(authorUnderTest.email).to.be.null
            expect(authorUnderTest.toString()).to.be.equal(expectedAuthor);

            done();
        });

        it("should ignore whitespaces", (done) => {
            let expectedEmail = "test<$._-*#>234@test.de";
            let expectedName = "Test author #*._%623";
            let expectedAuthor = `${expectedName}<${expectedEmail}>`;
            let authorStrUnderTest = `  ${expectedName}  <${expectedEmail}>  `;
            let authorUnderTest = Author.parse(authorStrUnderTest);

            expect(authorUnderTest.name).to.be.equal(expectedName);
            expect(authorUnderTest.email).to.be.equal(expectedEmail);
            expect(authorUnderTest.toString()).to.be.equal(expectedAuthor);

            done();
        });

        it("should throw error if not parsable", (done) => {

            expect(() => {
                Author.parse("test author<mail @mail.de>");
            }).to.throw(ParsingError);

            done();
        });

    });
})();
