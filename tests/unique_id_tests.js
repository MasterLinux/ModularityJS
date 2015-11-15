import {UniqueId} from "../src/data/unique_id.js";
import {expect, assert} from "chai";

(function () {
    describe("Unique ID", () => {
        
        
        it("should generate ID", (done) => {
            let idUnderTest = new UniqueId().generate();
            
            expect(idUnderTest).not.to.be.undefined;
            expect(idUnderTest).not.to.be.null;
            assert.isString(idUnderTest);
            expect(idUnderTest.length).to.be.gte(0);

            done();
        });
        
        it("should generate different IDs", (done) => {
            let generator = new UniqueId();
            let idUnderTest = generator.generate();
            let anotherIdUnderTest = generator.generate();
            
            expect(idUnderTest).not.to.be.equal(anotherIdUnderTest);

            done();
        });
        
        it("should generate different IDs with prefix", (done) => {
            let expectedPrefix = "test";
            let generator = new UniqueId(expectedPrefix);
            let idUnderTest = generator.generate();
            let anotherIdUnderTest = generator.generate();
            
            expect(idUnderTest).not.to.be.equal(anotherIdUnderTest);
            expect(idUnderTest).to.contain(`${expectedPrefix}_`);
            expect(anotherIdUnderTest).to.contain(`${expectedPrefix}_`);

            done();
        });
        
        it("should add default prefix if not set", (done) => {
            let expectedPrefix = UniqueId.getDefaultPrefix();
            let idUnderTest = new UniqueId().generate();
            
            expect(idUnderTest).to.contain(`${expectedPrefix}_`);

            done();
        });
    });
})();
