import {Point, Line, number} from "../src/data/point.js";
import {expect, assert} from "chai";

describe("Number Extension", () => {

    it("should check whether number is between two others", (done) => {

        expect(number(5).between(0, 10)).to.be.true;
        expect(number(1).between(0, 10)).to.be.true;
        expect(number(9).between(0, 10)).to.be.true;
        expect(number(-5).between(-10, 0)).to.be.true;
        expect(number(0).between(-10, 10)).to.be.true;

        expect(number(0).between(0, 10)).to.be.false;
        expect(number(10).between(0, 10)).to.be.false;

        expect(number(10).between(0, 10, 1)).to.be.true;
        expect(number(-10).between(-10, 0, 1)).to.be.true;

        done();
    });

});

describe("Point", () => {

    it("should be initialized", (done) => {
        let point = new Point(10, 20);

        expect(point.x).to.be.equal(10);
        expect(point.y).to.be.equal(20);

        done();
    });

    it("should be converted to svg polyline point representation", (done) => {
        let p1 = new Point(10, 20);
        let p2 = new Point(20, 10);

        expect(p1.toPolylinePoint()).to.be.equal("10,20");
        expect(p2.toPolylinePoint()).to.be.equal("20,10");

        done();
    });

});

describe("Line", () => {

    it("should be converted to svg polyline representation", (done) => {
        let p1 = new Point(10, 20);
        let p2 = new Point(50, 60);
        let line = new Line(p1, p2);

        expect(line.toPolyline()).to.be.equal("10,20 50,60");

        done();
    });

    it("should check whether point is on line", (done) => {
        let p1 = new Point(10, 20);
        let p2 = new Point(10, 40);
        let line = new Line(p1, p2);

        let p3 = new Point(10, 30);

        expect(line.contains(p3)).to.be.true;

        done();
    });

});
