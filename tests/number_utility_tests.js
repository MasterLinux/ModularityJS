/**
 * Created by Christoph on 07/06/2016.
 */
import {number} from "../src/utility/number_utility";
import {expect, assert} from "chai";

describe("Number Utility", () => {

    it("should check whether number is in range", (done) => {

        expect(number(5).isInRange(0, 10)).to.be.true;
        expect(number(0).isInRange(0, 10)).to.be.true;
        expect(number(10).isInRange(0, 10)).to.be.true;
        expect(number(-5).isInRange(-10, 0)).to.be.true;
        expect(number(0).isInRange(-10, 10)).to.be.true;

        expect(number(-1).isInRange(0, 10)).to.be.false;
        expect(number(11).isInRange(0, 10)).to.be.false;

        expect(number(11).isInRange(0, 10, 1)).to.be.true;
        expect(number(-11).isInRange(-10, 0, 1)).to.be.true;

        done();
    });

});
