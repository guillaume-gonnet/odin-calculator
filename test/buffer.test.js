import Buffer from '../src/Buffer.js';

describe("Test update function", () => {
    const buffer = new Buffer();

    test('enter single digit number', () => {
        buffer.update(5);
        expect(buffer.buffer).toStrictEqual([5]);
        buffer.clear();
    });

    test('enter 3 digits number', () => {
        buffer.update(5);
        buffer.update(2);
        buffer.update(9);
        expect(buffer.buffer).toStrictEqual([529]);
        buffer.clear();
    });

    test('add 2 numbers', () => {

        buffer.update(5);
        buffer.update(2);
        buffer.update(9);
        buffer.update("+");
        buffer.update(7);
        buffer.update(1);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([600]);
        buffer.clear();
    });

    test('add 3 numbers', () => {

        buffer.update(5);
        buffer.update(2);
        buffer.update(9);
        buffer.update("+");
        buffer.update(7);
        buffer.update(1);
        buffer.update("+");
        buffer.update(3);
        buffer.update(1);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([631]);
        buffer.clear();
    });

    test('double sign +', () => {

        buffer.update(5);
        buffer.update(2);
        buffer.update(9);
        buffer.update("+");
        buffer.update("+");
        buffer.update(7);
        buffer.update(1);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([600]);
        buffer.clear();
    });

    test('Addition / Multiplication order', () => {

        buffer.update(5);
        buffer.update(2);
        buffer.update("*");
        buffer.update(7);
        buffer.update("+");
        buffer.update(2);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([366]);
        buffer.clear();
    });

    test('Addition / Multiplication order - Multiple', () => {

        buffer.update(5);
        buffer.update(2);
        buffer.update("*");
        buffer.update(7);
        buffer.update("+");
        buffer.update(2);
        buffer.update("/");
        buffer.update(2);
        buffer.update("*");
        buffer.update(7);
        buffer.update(7);
        buffer.update("+");
        buffer.update(2);
        buffer.update("/");
        buffer.update(3);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([441.6666666666667]);
        buffer.clear();
    });

    test('= after only 1 element', () => {

        buffer.update(5);
        buffer.update(2);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([52]);
        buffer.clear();
    });

    test('Div by 0 should not error', () => {

        buffer.update(5);
        buffer.update(2);
        buffer.update("/");
        buffer.update(0);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual(["NaN"]);
        buffer.clear();
    });

    test('Start with negative sign', () => {

        buffer.update("-");
        buffer.update(2);
        buffer.update("+");
        buffer.update(5);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([3]);
        buffer.clear();
    });

    test('All operators usage', () => {

        buffer.update("-");
        buffer.update(2);
        buffer.update("+");
        buffer.update(5);
        buffer.update("*");
        buffer.update(3);
        buffer.update("-");
        buffer.update(5);
        buffer.update("/");
        buffer.update(2);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([10.5]);
        buffer.clear();
    });

    test('Start with a -', () => {
        buffer.update("-");
        buffer.update(2);
        buffer.update(5);
        buffer.update("*");
        buffer.update(3);
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([-75]);
        buffer.clear();
    });

    test('Operator directly followed by =', () => {
        buffer.update(2);
        buffer.update("*");
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([4]);
        buffer.clear();
    });

    test('Operator directly followed by = with several args', () => {
        buffer.update("-");
        buffer.update(2);
        buffer.update(5);
        buffer.update("*");
        buffer.update(3);
        buffer.update("*");
        buffer.update("=");
        expect(buffer.buffer).toStrictEqual([5625]);
        buffer.clear();
    });
});

describe("Test lastNumber", () => {
    const buff = new Buffer();

    test('2 operators at last', () => {
        buff.buffer = [-5, 6, '+', '='];
        expect(buff.lastNumber).toStrictEqual(6);
    });

    test('1 number at last', () => {
        buff.buffer = [-5, 6, '+', '=', 4];
        expect(buff.lastNumber).toStrictEqual(4);
    });

    test('empty buffer', () => {
        buff.buffer = [];
        expect(buff.lastNumber).toStrictEqual(0);
    });

    test('only operators', () => {
        buff.buffer = ['*', '+', '='];
        expect(buff.lastNumber).toStrictEqual(0);
    });
});