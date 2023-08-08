import Buffer from './Buffer.js';

const buffer = new Buffer();

createButtons();
addEventListenerKeyboard();

function createButtons() {
    const operatorsUI = document.getElementById("operators");
    for (let i = 0; i < 5; i++) {
        let button = document.createElement("button");
        button.innerText = buffer.operators[i];
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer.update(buffer.operators[i]);
            updateScreen(buffer);
            buttonDel.disabled = false;
        });
        operatorsUI.appendChild(button);
    }

    let buttonAC = document.createElement("button");
    buttonAC.innerText = "AC";
    buttonAC.addEventListener('click', (e) => {
        e.stopPropagation();
        buffer.clear();
        updateScreen(buffer);
        buttonDel.disabled = true;
    });
    operatorsUI.appendChild(buttonAC);

    let buttonDel = document.createElement("button");
    buttonDel.innerText = "Del";
    buttonDel.disabled = true;
    buttonDel.addEventListener('click', (e) => {
        e.stopPropagation();
        buffer.deleteLastElement();
        buttonDel.disabled = true;
        updateScreen(buffer);
    });
    operatorsUI.appendChild(buttonDel);


    const numbersUI = document.getElementById("numbers");
    for (let i = 0; i < 10; i++) {
        let button = document.createElement("button");
        button.innerText = i;
        button.setAttribute("id", `btn${i}`);
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            buffer.update(i);
            updateScreen(buffer);
            buttonDel.disabled = false;
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
        updateScreen(buffer);
    });
}

function updateScreen(buffer) {
    const screen = document.getElementById("screen");
    let elToDisplay = buffer.lastNumber;
    screen.innerText = elToDisplay;

}