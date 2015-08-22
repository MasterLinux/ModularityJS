import * as NamespaceUtility from "../src/utility/namespace_utility.js";
import {expect, assert} from "chai";

export var NamespaceUtilityTests = (function () {
    describe("Namespace utility", () => {

        it("should split namespace", (done) => {
            let namespace = "test.namespace.test_namespace.Extension",
                parts = NamespaceUtility.split(namespace).parts;

            assert.isArray(parts, 'Should return an array');
            expect(parts.length).to.equal(3);
            expect(parts[0]).to.equal("test");
            expect(parts[1]).to.equal("namespace");
            expect(parts[2]).to.equal("test_namespace");
            done();
        });

        it("should get extension name", (done) => {
            let namespace = "test.namespace.test_namespace.Extension",
                name = NamespaceUtility.split(namespace).name;

            expect(name).to.not.be.undefined;
            expect(name).to.equal("Extension");
            done();
        });

        it("should create namespace", (done) => {
            let parts = NamespaceUtility.split("test.namespace.test_namespace.Extension").parts,
                objectUnderTest = {};

            NamespaceUtility.create(objectUnderTest, parts);

            assert.isObject(objectUnderTest.test);
            assert.isObject(objectUnderTest.test.namespace);
            assert.isObject(objectUnderTest.test.namespace.test_namespace);
            done();
        });

        it("should return namespace after creating", (done) => {
            let parts = NamespaceUtility.split("test.namespace.test_namespace.Extension").parts,
                objectUnderTest = {},
                expectedFieldValue = 42,
                actualNamespace,
                namespaceUnderTest;

            // create namespace and add field
            actualNamespace = NamespaceUtility.create(objectUnderTest, parts);
            actualNamespace.fieldUnderTest = expectedFieldValue;

            // get created namespace
            namespaceUnderTest = objectUnderTest.test.namespace.test_namespace;

            assert.isObject(actualNamespace);
            assert.isObject(namespaceUnderTest);
            expect(namespaceUnderTest.fieldUnderTest).to.equal(expectedFieldValue);
            done();
        });

        it("should extend namespace", (done) => {
            let splitResult = NamespaceUtility.split("test.namespace.test_namespace.Extension"),
                parts = splitResult.parts,
                name = splitResult.name,
                objectUnderTest = {},
                expectedFieldValue = 42;

            NamespaceUtility.extend(objectUnderTest, parts, name, {
                fieldUnderTest: expectedFieldValue
            });

            let extensionUnderTest = objectUnderTest.test.namespace.test_namespace.Extension;

            assert.isObject(extensionUnderTest);
            expect(extensionUnderTest.fieldUnderTest).to.equal(expectedFieldValue);
            done();
        });
    });
})();
