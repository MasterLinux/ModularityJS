import {Dictionary} from "../src/data/dictionary.js";
import {MissingIdentifierError} from "../src/error/missing_identifier_error.js";
import {expect, assert} from "chai";

(function () {
    describe("Dictionary", () => {

        it("should create empty dictionary", (done) => {
            let dictionaryUnderTest = new Dictionary();

            expect(dictionaryUnderTest.length).to.be.equal(0);
            expect(dictionaryUnderTest.isEmpty).to.be.true;
            expect(dictionaryUnderTest.isNotEmpty).to.be.false;

            done()
        });

        it("should add array on initializing", (done) => {
            let expectedId = "test_id_1";
            let expectedValue = "test_value_1";
            let anotherExpectedId = "test_id_2";
            let anotherExpectedValue = "test_value_2";
            let expectedArray = [{
                id: expectedId,
                value: expectedValue
            }, {
                id: anotherExpectedId,
                value: anotherExpectedValue
            }];
            let dictionaryUnderTest = new Dictionary(expectedArray);

            expect(dictionaryUnderTest.length).to.be.equal(2);
            expect(dictionaryUnderTest.isEmpty).to.be.false;
            expect(dictionaryUnderTest.isNotEmpty).to.be.true;

            done()
        });

        it("should add item", (done) => {
            let expectedId = "test_id_1";
            let expectedValue = "test_value_1";
            let dictionaryUnderTest = new Dictionary();

            dictionaryUnderTest.insert({
                id: expectedId,
                value: expectedValue
            });

            expect(dictionaryUnderTest.length).to.be.equal(1);
            expect(dictionaryUnderTest.isEmpty).to.be.false;
            expect(dictionaryUnderTest.isNotEmpty).to.be.true;

            done()
        });

        it("should get item by its ID", (done) => {
            let expectedId = "test_id_1";
            let expectedValue = "test_value_1";
            let anotherExpectedId = "test_id_2";
            let anotherExpectedValue = "test_value_2";
            let expectedArray = [{
                id: expectedId,
                value: expectedValue
            }, {
                id: anotherExpectedId,
                value: anotherExpectedValue
            }];
            let dictionaryUnderTest = new Dictionary(expectedArray);
            let actualItem = dictionaryUnderTest.getItem(expectedId);
            let anotherActualItem = dictionaryUnderTest.getItem(anotherExpectedId);
            let unavailableItem = dictionaryUnderTest.getItem("not_available");

            expect(unavailableItem).to.be.undefined;

            expect(actualItem).not.to.be.undefined;
            expect(actualItem.id).to.be.equal(expectedId);
            expect(actualItem.value).to.be.equal(expectedValue);

            expect(anotherActualItem).not.to.be.undefined;
            expect(anotherActualItem.id).to.be.equal(anotherExpectedId);
            expect(anotherActualItem.value).to.be.equal(anotherExpectedValue);

            done()
        });

        it("should throw error on missing or invalid ID", (done) => {

            expect(() => {
                new Dictionary([{
                    id: "id"
                }]);
            }).to.not.throw(MissingIdentifierError);

            expect(() => {
                new Dictionary([{}]);
            }).to.throw(MissingIdentifierError);

            expect(() => {
                new Dictionary([{
                    id: ""
                }]);
            }).to.throw(MissingIdentifierError);

            expect(() => {
                new Dictionary([{
                    id: null
                }]);
            }).to.throw(MissingIdentifierError);

            expect(() => {
                new Dictionary([{
                    id: undefined
                }]);
            }).to.throw(MissingIdentifierError);

            expect(() => {
                new Dictionary([{
                    id: 1
                }]);
            }).to.throw(MissingIdentifierError);

            expect(() => {
                new Dictionary([{
                    id: 1.1
                }]);
            }).to.throw(MissingIdentifierError);

            done()
        });

    });

})();
