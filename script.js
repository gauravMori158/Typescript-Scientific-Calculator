"use strict";
class Calculator {
    constructor(dataPreviousText, dataCurrentText) {
        this.dataCurrentText = dataCurrentText;
        this.dataPreviousText = dataPreviousText;
        this.memory = [];
        this.currentOperand = "";
        this.previousOperand = "";
        this.par = "";
        this.clear();
        document.getElementById("mc").setAttribute("style", "color :   rgb(176, 176, 176)");
        document.getElementById("mr").setAttribute("style", "color :   rgb(176, 176, 176)");
    }
    clear() {
        this.currentOperand = " ";
        this.previousOperand = " ";
        this.par = "";
        this.operation = undefined;
    }
    delete() {
        if (this.currentOperand == "") {
            if (this.operation != "")
                this.operation = this.operation.toString().slice(0, -1);
            else {
                this.previousOperand = this.previousOperand.toString().slice(0, -1);
            }
        }
        else
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes("."))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    appendParenthesis(number) {
        this.par = this.par.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === "")
            return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        if (operation == "10x") {
            this.operation = "10^";
        }
        else if (operation == "xy") {
            this.operation = "^";
        }
        else if (operation == "2") {
            this.operation = "√";
        }
        else if (operation == "x2") {
            this.operation = "sqr";
        }
        else if (operation == "2x") {
            this.operation = "2^";
        }
        else if (operation == "ex") {
            this.operation = "e^";
        }
        else if (operation == "y") {
            this.operation = "yroot";
        }
        else if (operation == "3") {
            this.operation = "3√";
        }
        else if (operation == "x3") {
            this.operation = "cube";
        }
        else if (operation == "1/X") {
            this.operation = "1/";
        }
        else if (operation == "n!") {
            this.operation = "!";
        }
        else if (operation == "exp") {
            this.operation = ".e+";
        }
        else if (operation == "|x|") {
            this.operation = "abs";
        }
        else if (operation == "⌊x⌋") {
            this.operation = "floor";
        }
        else if (operation == "⌈x⌉") {
            this.operation = "ceil";
        }
        else if (operation == "+/-") {
            this.operation = "negate";
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        //if (isNaN(prev) && isNaN(current)) return;
        if (isNaN(prev)) {
            prev = 0;
        }
        console.log("prev" + prev);
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "e^":
                computation = Math.pow(2.71, current);
                break;
            case "÷":
                computation = prev / current;
                break;
            case "mod":
                computation = prev % current;
                break;
            case "log":
                computation = Math.log10(current);
                break;
            case "logyx":
                computation = Math.log10(prev) / Math.log10(current);
                break;
            case "ln":
                computation = Math.log10(current) * 2.303;
                break;
            case "10^":
                computation = Math.pow(10, current);
                break;
            case "^":
                computation = Math.pow(prev, current);
                break;
            case "yroot":
                computation = Math.pow(prev, 1 / current);
                if (Math.abs(prev - current) < 1 && prev > 0 === current > 0)
                    return computation;
                break;
            case "√":
                computation = Math.sqrt(current);
                break;
            case "3√":
                computation = Math.cbrt(current);
                break;
            case "sqr":
                computation = Math.pow(prev, 2);
                break;
            case "2^":
                computation = Math.pow(2, current);
                break;
            case "cube":
                computation = Math.pow(prev, 3);
                break;
            case "1/":
                computation = 1 / prev;
                break;
            case "!":
                if (prev < 0) {
                    computation = -1;
                }
                else if (prev === 0) {
                    computation = 1;
                }
                else {
                    let fact = 1;
                    for (let i = 1; i <= prev; i++) {
                        fact *= i;
                    }
                    computation = fact;
                }
                break;
            case ".e+":
                computation = prev * Math.pow(10, current);
                break;
            case "abs":
                computation = prev < 0 ? -1 * prev : prev;
                break;
            case "ceil":
                computation = Math.ceil(prev);
                break;
            case "floor":
                computation = Math.floor(prev);
                break;
            case "sin":
                computation = Math.sin(current);
                break;
            case "cos":
                computation = Math.tan(current);
                break;
            case "tan":
                computation = Math.sin(current);
                break;
            case "sec":
                computation = 1 / Math.cos(current);
                break;
            case "csc":
                computation = 1 / Math.sin(current);
                break;
            case "cot":
                computation = 1 / Math.tan(current);
                break;
            case "negate":
                computation = -1 * prev;
                break;
            case "rand":
                computation = Math.random();
                break;
            default:
                return;
        }
        this.currentOperand = computation.toFixed(2);
        this.previousOperand = "";
        this.operation = undefined;
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split(".")[0]);
        const decimalDigit = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigit)) {
            integerDisplay = "";
        }
        else {
            integerDisplay = integerDigit.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplayParenthesis() {
        this.dataPreviousText.innerText = this.par;
        this.dataCurrentText.innerText = "";
    }
    updateDisplay() {
        const func1 = [
            "sin",
            "cos",
            "tan",
            "sec",
            "cot",
            "csc",
            "log",
            "ln",
            "→dms",
            "←deg",
        ];
        const func2 = [
            "abs",
            "negate",
            "floor",
            "ceil",
            "sqr",
            "cube",
            "1/",
        ];
        this.dataCurrentText.innerText =
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            if (func1.includes(this.operation)) {
                this.dataPreviousText.innerText = `${this.operation} (${this.getDisplayNumber(this.currentOperand)})`;
                this.dataCurrentText.innerText = "";
                return;
            }
            else if (func2.includes(this.operation)) {
                this.dataPreviousText.innerText = `${this.operation} (${this.getDisplayNumber(this.previousOperand)})`;
                this.dataCurrentText.innerText = "";
                return;
            }
            else if (this.operation == "logyx") {
                this.dataPreviousText.innerText = ` ${this.getDisplayNumber(this.previousOperand)}log base (${this.currentOperand} )`;
                this.dataCurrentText.innerText = "";
                return;
            }
            this.dataPreviousText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.dataPreviousText.innerText = "";
        }
    }
    clearPrev() {
        this.previousOperand = "";
    }
    storeMemory() {
        if (this.currentOperand == " ")
            return;
        this.memory.push(parseFloat(this.currentOperand));
        console.log(this.memory);
        let ind = this.memory.length;
        if (ind > 0) {
            document.getElementById("mc").setAttribute("style", " color : black  ");
            document.getElementById("mr").setAttribute("style", " color : black  ");
        }
    }
    addmemory() {
        let ind = this.memory.length;
        if (this.currentOperand != " " && ind == 0) {
            this.memory.push(parseFloat(this.currentOperand));
        }
        ind = this.memory.length;
        if (ind > 0) {
            this.memory[ind - 1] += parseFloat(this.currentOperand);
            console.log(this.memory);
            document.getElementById("mc").setAttribute("style", " color : black  ");
            document.getElementById("mr").setAttribute("style", " color : black  ");
        }
    }
    minusMemory() {
        let ind = this.memory.length;
        if (ind > 0)
            this.memory[ind - 1] -= parseFloat(this.currentOperand);
        console.log(this.memory);
    }
    clearMemory() {
        this.memory = [];
        console.log(this.memory);
        this.currentOperand = "0";
        this.dataCurrentText.innerText = "0";
        document.getElementById("mc").setAttribute("style", "color :   rgb(176, 176, 176)");
        document.getElementById("mr").setAttribute("style", "color :   rgb(176, 176, 176)");
    }
    recallMemory() {
        let ind = this.memory.length;
        if (ind != 0) {
            this.currentOperand = this.memory[ind - 1].toString();
            this.dataCurrentText.innerText =
                this.memory[ind - 1].toString();
        }
    }
    fe() {
        let len = this.currentOperand.length;
        let num = Number(Number(this.currentOperand) / Math.pow(10, len - 2)).toFixed(len - 2);
        this.dataCurrentText.innerText = `${num}.e +${len - 2}`;
    }
    deg() {
        let num = Number((Number(this.currentOperand) / Math.PI) * 180).toFixed(2);
        this.dataCurrentText.innerText = `${num}`;
    }
    displayPrev() {
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
}
const numberButton = document.querySelectorAll("[data-number]");
const numberButtonPi = document.querySelectorAll("[data-number-pi]");
const operationButton = document.querySelectorAll("[ data-operation ]");
const numberButtonE = document.querySelectorAll("[data-number-e]");
const equalsButton = document.querySelector("[data-equals]");
const dataAllClearButton = document.querySelector("[data-all-clear]");
const clearButton = document.querySelector("[data-delete]");
const dataPreviousText = document.querySelector("[data-prvious]");
const dataCurrentText = document.querySelector("[data-current]");
const operationButtonMc = document.querySelector("[data-operation-Mc]");
const operationButtonMr = document.querySelector("[data-operation-Mr]");
const operationButtonMp = document.querySelector("[data-operation-Mp]");
const operationButtonMm = document.querySelector("[data-operation-Mm]");
const operationButtonMs = document.querySelector("[data-operation-Ms]");
const parenthesis = document.querySelectorAll("[data-operation-par]");
const operationButtonDeg = document.querySelector("[data-operation-deg]");
const operationButtonFe = document.querySelector("[data-operation-fe]");
const calculator = new Calculator(dataPreviousText, dataCurrentText);
numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
parenthesis.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendParenthesis(button.innerText);
        calculator.updateDisplayParenthesis();
    });
});
numberButtonPi.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber("3.14");
        calculator.updateDisplay();
    });
});
numberButtonE.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber("2.71");
        calculator.updateDisplay();
    });
});
operationButton.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
    calculator.clearPrev();
    calculator.displayPrev();
});
operationButtonMs.addEventListener("click", () => {
    calculator.storeMemory();
});
operationButtonMp.addEventListener("click", () => {
    calculator.addmemory();
});
operationButtonMr.addEventListener("click", () => {
    calculator.recallMemory();
});
operationButtonFe.addEventListener("click", () => {
    calculator.fe();
});
operationButtonDeg.addEventListener("click", () => {
    calculator.deg();
});
operationButtonMm.addEventListener("click", () => {
    calculator.minusMemory();
});
operationButtonMc.addEventListener("click", () => {
    calculator.clearMemory();
});
dataAllClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});
clearButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});
let flag = 1;
function changeContent() {
    if (flag == 1) {
        document.getElementById("twond").setAttribute("style", "background-color : rgb(87, 178, 203)");
        (document.getElementById("xsquare")).innerHTML = ` <button  data-operation>x<sup>3</sup></button> `;
        document.getElementById("sqrt").innerHTML = ` 
      <button  data-operation><sup>3</sup><i class='fas fa-square-root-alt'
        style="font-weight: 0px;"></i></button> `;
        document.getElementById("xry").innerHTML = ` 
      <button  data-operation><sup>y</sup><i class='fas fa-square-root-alt'
      style="font-weight: 0px;"></i></button> `;
        document.getElementById("10rx").innerHTML = ` 
      <button  data-operation>2<sup>x</sup></button>
      `;
        document.getElementById("log").innerHTML = ` 
      <button  data-operation>log<sub>y</sub>x</button>
      `;
        document.getElementById("ln").innerHTML = ` 
      <button  data-operation>e<sup>x</sup></button>
 `;
        flag = 0;
    }
    else {
        document.getElementById("twond").setAttribute("style", "background-color :   rgb(238, 238, 238)");
        document.getElementById("xsquare").innerHTML = ` 
        <button  data-operation>x<sup>2</sup></button>
    `;
        document.getElementById("sqrt").innerHTML = ` 
    <button id ="sqrt" data-operation><sup>2</sup><i class='fas fa-square-root-alt'
    style="font-weight: 0px;"></i></button> `;
        document.getElementById("xry").innerHTML = ` 
    <button id="xry" data-operation>x<sup>y</sup></button> `;
        document.getElementById("10rx").innerHTML = ` 
    <button id="10rx"  data-operation>10<sup>x</sup></button>
    `;
        document.getElementById("log").innerHTML = ` 
    <button  id="log" data-operation>log</button>
    `;
        document.getElementById("ln").innerHTML = ` 
    <button id="ln"  data-operation>ln</button>
    `;
        flag = 1;
    }
}
