/**
 * @jest-environment jsdom
 */

test('enter single digit number', () => {

    document.body.innerHTML =
        '< container > ' +
        '<div id="screen"></div>' +
        '<div id="operators"></div>' +
        '<div id="numbers"></div>' +
        '</container>';

    const updateBuffer = require('../script');

    let buffer = [];
    buffer = updateBuffer(buffer, 5);
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
    expect(buffer).toStrictEqual([604]);
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