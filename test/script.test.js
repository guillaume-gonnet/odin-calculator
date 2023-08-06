//const Buffer = require('../Buffer');
import Buffer from '../Buffer.js';

describe("Buffer", () => {
    const buffer = new Buffer();

    test('enter single digit number', () => {
        buffer.update(5);
        expect(buffer).toStrictEqual([5]);
    });

    test('enter 3 digits number', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, 9);
        expect(buffer).toStrictEqual([529]);
    });

    test('add 2 numbers', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, 9);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 7);
        buffer = updateBuffer(buffer, 1);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([600]);
    });

    test('add 3 numbers', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, 9);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 7);
        buffer = updateBuffer(buffer, 1);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 3);
        buffer = updateBuffer(buffer, 1);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([631]);
    });

    test('double sign +', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, 9);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 7);
        buffer = updateBuffer(buffer, 1);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([600]);
    });

    test('Addition / Multiplication order', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "*");
        buffer = updateBuffer(buffer, 7);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([366]);
    });

    test('Addition / Multiplication order - Multiple', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "*");
        buffer = updateBuffer(buffer, 7);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "/");
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "*");
        buffer = updateBuffer(buffer, 7);
        buffer = updateBuffer(buffer, 7);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "/");
        buffer = updateBuffer(buffer, 3);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([441.6666666666667]);
    });

    test('= after only 1 element', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([52]);
    });

    test('Div by 0 should not error', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "/");
        buffer = updateBuffer(buffer, 0);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual(["NaN"]);
    });

    test('Start with negative sign', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, "-");
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([3]);
    });

    test('All operators usage', () => {

        document.body.innerHTML =
            '< container > ' +
            '<div id="screen"></div>' +
            '<div id="operators"></div>' +
            '<div id="numbers"></div>' +
            '</container>';

        const updateBuffer = require('../script');

        let buffer = [];
        buffer = updateBuffer(buffer, "-");
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "+");
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, "*");
        buffer = updateBuffer(buffer, 3);
        buffer = updateBuffer(buffer, "-");
        buffer = updateBuffer(buffer, 5);
        buffer = updateBuffer(buffer, "/");
        buffer = updateBuffer(buffer, 2);
        buffer = updateBuffer(buffer, "=");
        expect(buffer).toStrictEqual([10.5]);
    });
});