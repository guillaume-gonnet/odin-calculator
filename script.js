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
        if (typeof el === "number" || el === "-") {
            buff.push(el);
            updateScreen(buff[0]);
        }
        return buff;
    }

    if (typeof el === "number") {
        if (typeof buff.at(-1) === "number") {
            buff.splice(-1, 1, buff.at(-1) * 10 + el);
        } else if (buff.at(-1) === "-") {
            buff.splice(0, 1, -el);
        } else {
            buff.push(el);
        }
        updateScreen(buff.at(-1));
        return buff;
    } else if (el === "=") {
        while (buff.includes("*") || buff.includes("/")) {
            const index = Math.max(buff.indexOf("*"), buff.indexOf("/"));
            const newEl = operate(buff[index - 1], buff[index], buff[index + 1]);
            buff.splice(index - 1, 3, newEl);
        }
        while (buff.length !== 1) {
            buff.splice(-3, 3, operate(buff.at(-3), buff.at(-2), buff.at(-1)));
        }
        updateScreen(buff.at(-1));
        return buff;
    } else { // el is an operator
        if (operators.includes(buff.at(-1))) { //2operators in a row, keep last
            buff.splice(-1, el);
        } else {
            buff.push(el);
        }
        return buff;
    }
}

function operate(a, ope, b) {
    switch (ope) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                return "NaN";
            }
            return a / b;
    }
}

module.exports = updateBuffer;