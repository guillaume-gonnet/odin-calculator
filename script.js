let buffer = [];
const operators = ["+", "-", "*", "/", "="];

createButtons();

function createButtons() {
    const operatorsUI = document.getElementById("operators");
    for (let i = 0; i < 5; i++) {
        let button = document.createElement("button");
        button.innerText = operators[i];
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer = updateBuffer(buffer, operators[i]);
        });
        operatorsUI.appendChild(button);
    }

    let button = document.createElement("button");
    button.innerText = "AC";
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        buffer = [];
        updateScreen(0);
    });
    operatorsUI.appendChild(button);


    const numbersUI = document.getElementById("numbers");
    for (let i = 0; i < 10; i++) {
        let button = document.createElement("button");
        button.innerText = i;
        button.setAttribute("id", `btn${i}`);
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer = updateBuffer(buffer, i);
        });
        numbersUI.appendChild(button);
    }
}

function updateScreen(num) {
    const screen = document.getElementById("screen");
    screen.innerText = num;

}

function updateBuffer(buff, el) {

    if (buff.length === 0) {
        if (typeof el === "number") {
            buff.push(el);
            updateScreen(buff[0]);
        }
        return buff;
    }

    if (typeof el === "number") {
        if (typeof buff.at(-1) === "number") {
            buff.splice(-1, 1, buff.at(-1) * 10 + el);
            updateScreen(buff.at(-1));
            return buff;
        } else {
            buff.push(el);
            updateScreen(buff.at(-1));
            return buff;
        }
    } else if (el === "=") {
        while (buff.length !== 1) {
            buff.push(operate(buff.pop(), buff.pop(), buff.pop()));
        }
        updateScreen(buff.at(-1));
        return buff;
    } else { // is an operator
        if (operators.includes(buff.at(-1))) {
            buff.splice(-1, el);
        } else {
            buff.push(el);
        }
        return buff;
    }
}


// a is actually the second argument, and b the first
function operate(a, ope, b) {
    switch (ope) {
        case "+":
            return a + b;
        case "-":
            return b - a;
        case "*":
            return a * b;
        case "/":
            return b / a
    }
}

module.exports = updateBuffer;