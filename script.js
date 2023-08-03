const screen = document.getElementById("screen");
const operatorsUI = document.getElementById("operators");
const numbersUI = document.getElementById("numbers");

let buffer = [];
const operators = ["+", "-", "*", "/"];

//create numbers button
for (let i = 0; i < 10; i++) {
    let button = document.createElement("button");
    button.innerText = i;
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        updateBuffer(i);
    });
    numbersUI.appendChild(button);
}

function updateScreen(num) {
    screen.innerText = num;

}

function updateBuffer(el) {
    let lastEl = buffer.at(-1) || 0;

    if (buffer.length === 0) {
        buffer.push(el);
        updateScreen(buffer[0]);
        return;
    }
    if (buffer.length === 1 && typeof buffer[0] === "number") {
        buffer.splice(-1, 1, lastEl * 10 + el);
        updateScreen(buffer[0]);
        return;
    }


    if (operators.findIndex((e) => e === lastEl) !== -1) {
        executeOperation();
    } else {
        const newEl = lastEl * 10 + el;
        buffer.splice(-2, 2, newEl);
        updateBuffer(newEl);
    }
}

function executeOperation() {
    //TODO
}