let n1, operator, n2, equation, resultOnDisplay;

numButtons = document.querySelectorAll("[num]");
opButtons = document.querySelectorAll("[op]");
decimalButton = document.getElementById("decimal");
computeButton = document.getElementById("compute");
clearEntryButton = document.getElementById("clear-entry");
clearButton = document.getElementById("clear");

numButtons.forEach(e => e.addEventListener("click", () => handleNumber(e.getAttribute("num"))));
opButtons.forEach(e => e.addEventListener("click", () => handleOperator(e.getAttribute("op"))));
decimalButton.addEventListener("click", handleDecimal);
computeButton.addEventListener("click", compute);
clearEntryButton.addEventListener("click", handleClearEntry);
clearButton.addEventListener("click", resetCalcuator);

function handleDecimal() {
    if (operator == "") {
        n1 += ".";
    } else {
        n2 += ".";
    }
}

function handleNumber(val) {
    if (resultOnDisplay) resetCalcuator();

    if (operator == "") {
        n1 = (n1 * 10 + +val).toString();
    } else {
        n2 = (n2 * 10 + +val).toString();
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