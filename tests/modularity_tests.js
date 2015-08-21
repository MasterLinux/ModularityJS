import {expect, assert} from "chai";
import {Modularity} from "../src/modularity.js";
import {ExtensionExistsError} from "../src/error/extension_exists_error.js";
import {NamespaceCollisionError} from "../src/error/namespace_collision_error.js";

export var ModularityTests = (function () {
    describe("Modularity", () => {

        beforeEach(function () {
            // remove each extension before each test
            Modularity.test = undefined;
        });

        it("should add namespaces", (done) => {
            let expectedNamespace = "test";
            let anotherExpectedNamespace = "test.namespace";

            Modularity.extend(expectedNamespace, {});
            Modularity.extend(anotherExpectedNamespace, {});

            assert.isObject(Modularity.test, "extends Modularity");
            assert.isObject(Modularity.test.namespace, "extends namespace");
            done();
        });

        it("should add a framework extension", (done) => {
            let expectedNamespace = "test.test_extension_namespace";
            let expectedFieldValue = 42;

            Modularity.extend(expectedNamespace, {
                fieldUnderTest: expectedFieldValue
            });

            let actualExtension = Modularity.test.test_extension_namespace;

            expect(actualExtension).to.not.be.undefined;
            expect(actualExtension.fieldUnderTest).to.equal(expectedFieldValue);
            done();
        });

        it("should throw error on namespaces collisions", (done) => {
            let expectedNamespace = "test.namespace";
            let anotherExpectedNamespace = "test.namespace.another";
            let yetExpectedNamespace = "test.ns";
            let yetAnotherExpectedNamespace = "test.ns.another.test";

            let fn = () => {
                Modularity.extend(expectedNamespace, {
                    another: 42
                });

                Modularity.extend(anotherExpectedNamespace, {});
            };

            let fn2 = () => {
                Modularity.extend(yetExpectedNamespace, {
                    another: 42
                });

                Modularity.extend(yetAnotherExpectedNamespace, {});
            };

            expect(fn).to.throw(NamespaceCollisionError);
            expect(fn2).to.throw(NamespaceCollisionError);
            done();
        });

        it("should throw error if extension with same name already exists", (done) => {
            let expectedNamespace = "test.test_extension_namespace";

            let fn = () => {
                Modularity.extend(expectedNamespace, {});
                Modularity.extend(expectedNamespace, {});
            };

            expect(fn).to.throw(ExtensionExistsError);
            done();
        });

    });
})();

