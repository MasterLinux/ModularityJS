"use strict";

import {expect, assert} from "chai";
import {Modularity} from "./modularity.js";
import {ExtensionExistsError} from "./error/extension_exists_error.js";
import {NamespaceCollisionError} from "./error/namespace_collision_error.js";

describe("Test core facade", () => {

    it("should add namespaces", (done) => {
        let expectedNamespace = "test";
        let anotherExpectedNamespace = "test.namespace";

        Modularity.extend(expectedNamespace, {});
        Modularity.extend(anotherExpectedNamespace, {});

        assert.isObject(Modularity.test, "extends Modularity");
        assert.isObject(Modularity.test.namespace, "extends namespace");
        done();
    });

    it("should throw error on namespaces collisions", (done) => {
        let expectedNamespace = "test.namespace";
        let anotherExpectedNamespace = "test.namespace.another";

        let fn = () => {
            Modularity.extend(expectedNamespace, {
                another: function() {}
            });

            Modularity.extend(anotherExpectedNamespace, {});
        };

        expect(fn).to.throw(NamespaceCollisionError);
        done();
    });

    it("should add a framework extension", (done) => {
        let expectedNamespace = "test_extension_namespace";
        let expectedFieldValue = 42;

        Modularity.extend(expectedNamespace, {
            fieldUnderTest: expectedFieldValue
        });

        let actualExtension = Modularity[expectedNamespace];

        expect(actualExtension).to.not.be.undefined;
        expect(actualExtension.fieldUnderTest).to.equal(expectedFieldValue);
        done();
    });

    it("should throw error if extension with same name already exists", (done) => {
        let expectedNamespace = "test_extension_namespace";

        let fn = () => {
            Modularity.extend(expectedNamespace, {});
            Modularity.extend(expectedNamespace, {});
        };

        expect(fn).to.throw(ExtensionExistsError);
        done();
    });

});

