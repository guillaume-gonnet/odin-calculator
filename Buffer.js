export default class Buffer {
    constructor() {
        this.buffer = [];
        this.operators = ["+", "-", "*", "/", "="];
    }

    static lastOp = null;

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
        if (this.buffer.length === 0) {
            return 0;
        }
        for (let i = this.buffer.length - 1; i >= 0; i--) {
            if (typeof this.buffer[i] === "number")
                return this.buffer[i];
        }
    }

    clear() {
        this.buffer = [];
        Buffer.lastOp = null;
    }

    addElement = (el) => {
        this.buffer.push(el);
    }

    replaceLastElement(el) {
        this.buffer.splice(-1, 1, el);
    }

    deleteLastElement() {
        this.buffer.pop();
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
                this.replaceLastElement(this.lastElement < 0 ? this.lastElement * 10 - el : this.lastElement * 10 + el);
            } else if (this.lastElement === "-" && this.length === 1) {
                this.replaceLastElement(-el);
            } else {
                this.addElement(el);
            }
            return;
        } else if (el === "=") {
            if (this.operators.includes(this.lastElement)) {
                this.addElement(this.buffer.at(-2));
            }
            //start with priority 1 operators
            while (this.buffer.includes("*") || this.buffer.includes("/")) {
                const index = Math.max(this.buffer.indexOf("*"), this.buffer.indexOf("/"));
                const newEl = operate(this.buffer[index - 1], this.buffer[index], this.buffer[index + 1]);
                this.buffer.splice(index - 1, 3, newEl);
            }
            //then with priorty 2 operators
            while (this.length !== 1) {
                this.buffer.splice(-3, 3, operate(this.buffer.at(-3), this.buffer.at(-2), this.buffer.at(-1)));
            }
            Buffer.lastOp = null;
            return;
        } else { // el is an operator
            if (this.operators.includes(this.lastElement)) { //2operators in a row, keep last
                this.replaceLastElement(el);
                return;
            }
            if (Buffer.lastOp === null) {
                Buffer.lastOp = el;
                this.addElement(el);
                return;
            }
            if (getPriority(el) === getPriority(Buffer.lastOp)) { // execute only 1 ope
                this.buffer.splice(-3, 3, operate(this.buffer.at(-3), this.buffer.at(-2), this.buffer.at(-1)));
                this.addElement(el);
                return;
            } else if (getPriority(el) > getPriority(Buffer.lastOp)) { //execute all before (because only 2 priorities)
                while (this.buffer.includes("*") || this.buffer.includes("/")) {
                    const index = Math.max(this.buffer.indexOf("*"), this.buffer.indexOf("/"));
                    const newEl = operate(this.buffer[index - 1], this.buffer[index], this.buffer[index + 1]);
                    this.buffer.splice(index - 1, 3, newEl);
                }
                //then with priorty 2 operators
                while (this.length !== 1) {
                    this.buffer.splice(-3, 3, operate(this.buffer.at(-3), this.buffer.at(-2), this.buffer.at(-1)));
                }
                this.addElement(el);
                Buffer.lastOp = el;
                return;
            } else {
                this.addElement(el);
                Buffer.lastOp = el;
                return;
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

function getPriority(ope) {
    switch (ope) {
        case "+":
        case "-":
            return 2;
        case "*":
        case "/":
            return 1;
        default:
            console.log(`${ope} is not an operator`);
    }
}
