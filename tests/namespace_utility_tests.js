import * as NamespaceUtility from "../src/utility/namespace_utility.js";
import {NamespaceCollisionError} from "../src/error/namespace_collision_error.js";
import {ExtensionExistsError} from "../src/error/extension_exists_error.js";
import {expect, assert} from "chai";

describe("Namespace utility", () => {

    it("should resolve namespace", (done) => {
        let expectedNamespace = "test.namespace.test_namespace",
            objectUnderTest = {};

        NamespaceUtility.resolve(objectUnderTest, expectedNamespace);

        assert.isObject(objectUnderTest.test);
        assert.isObject(objectUnderTest.test.namespace);
        assert.isObject(objectUnderTest.test.namespace.test_namespace);
        done();
    });

    it("should return namespace after resolving", (done) => {
        let expectedNamespace = "test.namespace.test_namespace",
            objectUnderTest = {},
            expectedFieldValue = 42,
            actualNamespace,
            namespaceUnderTest;

        // create namespace and add field
        actualNamespace = NamespaceUtility.resolve(objectUnderTest, expectedNamespace);
        actualNamespace.fieldUnderTest = expectedFieldValue;

        // get created namespace
        namespaceUnderTest = objectUnderTest.test.namespace.test_namespace;

        assert.isObject(actualNamespace);
        assert.isObject(namespaceUnderTest);
        expect(namespaceUnderTest.fieldUnderTest).to.equal(expectedFieldValue);
        done();
    });

    it("should throw NamespaceCollisionError if current namespace is not an object to extend (resolve)", (done) => {
        let expectedNamespace = "test.namespace.test",
            anotherExpectedNamespace = "test.namespace.test.another",
            objectUnderTest = {
                test: {
                    namespace: {
                        test: 42
                    }
                }
            },
            anotherObjectUnderTest = {
                test: {
                    namespace: "test"
                }
            };

        expect(() => {
            NamespaceUtility.resolve(objectUnderTest, expectedNamespace);
        }).to.throw(NamespaceCollisionError);

        expect(() => {
            NamespaceUtility.resolve(anotherObjectUnderTest, anotherExpectedNamespace);
        }).to.throw(NamespaceCollisionError);

        done();
    });

    it("should extend namespace", (done) => {
        let expectedNamespace = "test.namespace.test_namespace",
            expectedName = "Extension",
            objectUnderTest = {},
            expectedFieldValue = 42;

        NamespaceUtility.extend(objectUnderTest, expectedNamespace, expectedName, {
            fieldUnderTest: expectedFieldValue
        });

        let extensionUnderTest = objectUnderTest.test.namespace.test_namespace.Extension;

        assert.isObject(extensionUnderTest);
        expect(extensionUnderTest.fieldUnderTest).to.equal(expectedFieldValue);
        done();
    });

    it("should throw ExtensionExistsError if an extension in the given namespace with the same name already exists", (done) => {
        let expectedNamespace = "test.namespace.test",
            expectedName = "Extension",
            objectUnderTest = {};

        expect(() => {
            NamespaceUtility.extend(objectUnderTest, expectedNamespace, expectedName, {});
            NamespaceUtility.extend(objectUnderTest, expectedNamespace, expectedName, {});
        }).to.throw(ExtensionExistsError);

        done();
    });

    it("should throw NamespaceCollisionError if current namespace is not an object to extend (extend)", (done) => {
        let expectedNamespace = "test.namespace.test",
            anotherExpectedNamespace = "test.namespace.test.another",
            expectedName = "Extension",
            objectUnderTest = {
                test: {
                    namespace: {
                        test: 42
                    }
                }
            },
            anotherObjectUnderTest = {
                test: {
                    namespace: "test"
                }
            };

        expect(() => {
            NamespaceUtility.extend(objectUnderTest, expectedNamespace, expectedName, {});
        }).to.throw(NamespaceCollisionError);

        expect(() => {
            NamespaceUtility.extend(anotherObjectUnderTest, anotherExpectedNamespace, expectedName, {});
        }).to.throw(NamespaceCollisionError);

        done();
    });
});
