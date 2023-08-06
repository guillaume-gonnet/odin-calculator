import Buffer from './Buffer.js';
//const Buffer = require('../Buffer');

const buffer = new Buffer();
const operators = ["+", "-", "*", "/", "="];

createButtons();
addEventListenerKeyboard();

function createButtons() {
    const operatorsUI = document.getElementById("operators");
    for (let i = 0; i < 5; i++) {
        let button = document.createElement("button");
        button.innerText = operators[i];
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer.update(operators[i]);
            updateScreen(buffer);
        });
        operatorsUI.appendChild(button);
    }

    let button = document.createElement("button");
    button.innerText = "AC";
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        buffer.clear();
        updateScreen(buffer);
    });
    operatorsUI.appendChild(button);


    const numbersUI = document.getElementById("numbers");
    for (let i = 0; i < 10; i++) {
        let button = document.createElement("button");
        button.innerText = i;
        button.setAttribute("id", `btn${i}`);
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer.update(i);
            updateScreen(buffer);
        });
        numbersUI.appendChild(button);
    }
}

function addEventListenerKeyboard() {
    window.addEventListener("keydown", (e) => {
        e.preventDefault();
        let keyPressed = null;
        if (e.key >= 0 && e.key <= 9) {
            keyPressed = parseInt(e.key);
        } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "=") {
            keyPressed = e.key;
        } else if (e.key == "Delete") {
            buffer = emptyBuffer(buffer);
            return;
        } else if (e.key === "Enter") {
            keyPressed = "=";
        } else {
            console.log(`key ${e.key} transformed in ${keyPressed} with code ${e.code} is not a digit or operator`)
            return;
        }
        buffer.update(keyPressed);
    });
}

function updateScreen(buffer) {
    const screen = document.getElementById("screen");
    let elToDisplay = buffer.lastNumber;
    screen.innerText = elToDisplay;

}