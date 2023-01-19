let n1, operator, n2, equation, resultOnDisplay;

const numButtons = document.querySelectorAll("[num]");
const opButtons = document.querySelectorAll("[op]");
const decimalButton = document.getElementById("decimal");
const computeButton = document.getElementById("compute");
const clearEntryButton = document.getElementById("clear-entry");
const clearButton = document.getElementById("clear");

document.addEventListener("keydown", handleKeyPress);
numButtons.forEach(e => e.addEventListener("click", () => handleNumber(e.getAttribute("num"))));
opButtons.forEach(e => e.addEventListener("click", () => handleOperator(e.getAttribute("op"))));
decimalButton.addEventListener("click", handleDecimal);
computeButton.addEventListener("click", compute);
clearEntryButton.addEventListener("click", handleClearEntry);
clearButton.addEventListener("click", resetCalcuator);

function handleKeyPress(e) {
    if (e.key >= 0 && e.key <= 9) {
        e.preventDefault();
        handleNumber(e.key);
    } else if (e.key == "+") {
        e.preventDefault();
        handleOperator("+");
    } else if (e.key == "-") {
        e.preventDefault();
        handleOperator("-");
    } else if (e.key == "/") {
        e.preventDefault();
        handleOperator("÷");
    } else if (e.key == "*") {
        e.preventDefault();
        handleOperator("\u00d7");
    } else if (e.key == ".") {
        e.preventDefault();
        handleDecimal();
    } else if (e.key == "=" || e.key == "Enter") {
        e.preventDefault();
        compute();
    } else if (e.key == "Delete") {
        e.preventDefault();
        resetCalcuator();
    } else if (e.key == "Backspace") {
        e.preventDefault();
        handleClearEntry();
    }
}

function handleDecimal() {
    if (operator == "" && !n1.includes(".")) {
        n1 += ".";
    } else if (!n2.includes(".")) {
        n2 += ".";
    }
    syncDisplay();
}

function handleNumber(val) {
    if (resultOnDisplay) resetCalcuator();

    if (operator == "") {
        n1 = (+(n1 + val)).toString();
    } else {
        n2 = (+(n2 + val)).toString();
    }
    syncDisplay();
}

function handleOperator(op) {
    if (n2 != "") {
        compute();
    }

    operator = op;
    resultOnDisplay = false;
    prevEquation = [n1, op].join(" ")
    syncDisplay();
}

function handleClearEntry(op) {
    if (operator == "") {
        n1 = "0";
    } else {
        n2 = "0";
    }
    syncDisplay();
}

function syncDisplay() {
    document.getElementById("equation").innerText = prevEquation;
    document.getElementById("result").innerText = operator == "" ? n1 : n2;
}

function resetCalcuator() {
    n1 = "0";
    operator = "";
    n2 = "0";
    prevEquation = "";
    resultOnDisplay = false;
    syncDisplay();
}

function compute() {
    if (operator == "") return;

    prevEquation = [n1, operator, n2, "="].join(" ");

    let r;
    switch (operator) {
        case "+":
            r = +n1 + +n2;
            break;
        case "-":
            r = +n1 - +n2;
            break;
        case "÷":
            r = +n1 / +n2;
            break;
        case "×":
            r = +n1 * +n2;
            break;
    }

    n1 = r.toString();

    n2 = "0";
    operator = "";
    resultOnDisplay = true;
    syncDisplay();
}

resetCalcuator();