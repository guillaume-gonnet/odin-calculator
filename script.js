import Buffer from './Buffer.js';

const buffer = new Buffer();

createButtons();
addEventListenerKeyboard();

function createButtons() {
    const operatorsUI = document.getElementById("btn-operators");
    for (let i = 0; i < 4; i++) {
        let button = document.createElement("button");
        button.innerText = buffer.operators[i];
        button.setAttribute("id", `btn${i}`);
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer.update(buffer.operators[i]);
            updateScreen(buffer);
            buttonDel.disabled = false;
        });
        button.classList.add("button");
        button.classList.add("btn-operator");
        operatorsUI.appendChild(button);
    }

    const othersUI = document.getElementById("btn-others");
    let buttonAC = document.createElement("button");
    buttonAC.innerText = "AC";
    buttonAC.addEventListener('click', (e) => {
        e.stopPropagation();
        buffer.clear();
        updateScreen(buffer);
        buttonDel.disabled = true;
    });
    buttonAC.classList.add("button");
    buttonAC.classList.add("btn-other");
    othersUI.appendChild(buttonAC);

    let buttonDel = document.createElement("button");
    buttonDel.innerText = "Del";
    buttonDel.disabled = true;
    buttonDel.addEventListener('click', (e) => {
        e.stopPropagation();
        buffer.deleteLastElement();
        buttonDel.disabled = true;
        updateScreen(buffer);
    });
    buttonDel.classList.add("button");
    buttonDel.classList.add("btn-other");
    othersUI.appendChild(buttonDel);

    const numbersUI = document.getElementById("btn-numbers");
    for (let i = 9; i >= 0; i--) {
        let button = document.createElement("button");
        button.innerText = i;
        button.setAttribute("id", `btn${i}`);
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer.update(i);
            updateScreen(buffer);
            buttonDel.disabled = false;
        });
        button.classList.add("button");
        button.classList.add("btn-number");
        numbersUI.appendChild(button);
    }

    let buttonEqual = document.createElement("button");
    buttonEqual.innerText = "=";
    buttonEqual.addEventListener('click', (e) => {
        buffer.update("=");
        updateScreen(buffer);
        buttonDel.disabled = true;
    });
    buttonEqual.classList.add("button");
    buttonEqual.classList.add("btn-equal");
    numbersUI.appendChild(buttonEqual);
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
        updateScreen(buffer);
    });
}

function updateScreen(buffer) {
    const screen = document.getElementById("screen");
    let elToDisplay = buffer.lastNumber;
    screen.innerText = elToDisplay;

}