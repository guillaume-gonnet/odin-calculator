export default class Buffer {
    //module.exports = class Buffer {
    constructor() {
        this.buffer = [];
        this.operators = ["+", "-", "*", "/", "="];
    }
    get lastElement() {
        if (this.buffer.length === 0) {
            throw new Error('Empty buffer, no last element')
        }
        return this.buffer.at(-1);
    }
    get length() {
        return this.buffer.length;
    }
    get lastNumber() {
        for (let i = this.buffer.length - 1; i >= 0; i--) {
            if (typeof this.buffer[i] === "number")
                return this.buffer[i];
        }
        return 0;
    }
    clear() {
        this.buffer = [];
    }
    addElement = (el) => {
        this.buffer.push(el);
    }
    replaceLastElement(el) {
        this.buffer.splice(-1, 1, el);
    }
    update(el) {
        if (this.buffer.length === 0) {
            if (typeof el === "number" || el === "-") {
                this.addElement(el);
            }
            return;
        }

        if (typeof el === "number") {
            if (typeof this.lastElement === "number") {
                this.replaceLastElement(this.lastElement * 10 + el);
            } else if (this.lastElement === "-" && this.length === 1) {
                this.replaceLastElement(-el);
            } else {
                this.addElement(el);
            }
            return;
        } else if (el === "=") {
            while (this.buffer.includes("*") || this.buffer.includes("/")) {
                const index = Math.max(this.buffer.indexOf("*"), this.buffer.indexOf("/"));
                const newEl = operate(this.buffer[index - 1], this.buffer[index], this.buffer[index + 1]);
                this.buffer.splice(index - 1, 3, newEl);
            }
            while (this.length !== 1) {
                this.buffer.splice(-3, 3, operate(this.buffer.at(-3), this.buffer.at(-2), this.buffer.at(-1)));
            }
            return;
        } else { // el is an operator
            if (this.operators.includes(this.lastElement)) { //2operators in a row, keep last
                this.replaceLastElement(el);
            } else {
                this.addElement(el);
            }
        }
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

//module.exports = { Buffer };