import {expect, assert} from "chai";
import {Modularity} from "../src/modularity.js";
import ExtensionExistsError from "../src/error/extension_exists_error.js";
import NamespaceCollisionError from "../src/error/namespace_collision_error.js";

export var ModularityTests = (function () {
    describe("Modularity", () => {

        beforeEach(function () {
            // remove each extension before each test
            Modularity.test = undefined;
        });

        it("should add namespaces", (done) => {
            let expectedNamespace = "test";
            let expectedName = "Extension";
            let anotherExpectedNamespace = "test.namespace";

            Modularity.extend(expectedNamespace, expectedName, {});
            Modularity.extend(anotherExpectedNamespace, expectedName, {});

            assert.isObject(Modularity.test[expectedName], "extends Modularity");
            assert.isObject(Modularity.test.namespace[expectedName], "extends namespace");
            done();
        });

        it("should add a framework extension", (done) => {
            let expectedNamespace = "test.test_extension_namespace";
            let expectedName = "Extension";
            let expectedFieldValue = 42;

            Modularity.extend(expectedNamespace, expectedName, {
                fieldUnderTest: expectedFieldValue
            });

            let actualExtension = Modularity.test.test_extension_namespace[expectedName];

            expect(actualExtension).to.not.be.undefined;
            expect(actualExtension.fieldUnderTest).to.equal(expectedFieldValue);
            done();
        });

        it("should throw error if extension with same name already exists", (done) => {
            let expectedNamespace = "test.test_extension_namespace";
            let expectedName = "Extension";

            let fn = () => {
                Modularity.extend(expectedNamespace, expectedName, {});
                Modularity.extend(expectedNamespace, expectedName, {});
            };

            expect(fn).to.throw(ExtensionExistsError);
            done();
        });

    });
})();

