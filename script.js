function roundToNine(num) {
    return +(Math.round(num + "e+9")  + "e-9");
}

function add(a, b) {
    return roundToNine(a + b);
}

function subtract(a, b) {
    return roundToNine(a - b);
}

function multiply(a, b) {
    return roundToNine(a * b);
}

function divide(a, b) {
    return roundToNine(a / b);
}

const backspace = function() {
    currentExp = currentExp.slice(0, -1);
    display.textContent = currentExp;
}

const allClear = function() {
    currentExp = "";
    display.textContent = currentExp;
}

const evaluateExpression = function(expression) {
    let currExpArray = expression.split("");
    if (currExpArray[0] == "*" || currExpArray[0] == "/") {
        display.textContent = NaN;
        return 1;
    }

    if (isNaN(+currExpArray[currExpArray.length - 1])) {
        currExpArray.pop();
    }

    let plusPosition = currExpArray.join("").lastIndexOf("+");
    let minusPosition = currExpArray.join("").lastIndexOf("-");
    let multiplyPosition = currExpArray.join("").lastIndexOf("*");
    let dividePosition = currExpArray.join("").lastIndexOf("/");

    if (plusPosition > 0) {
        let str = currExpArray.join("");
        let left = str.slice(0, plusPosition);
        let right = str.slice(plusPosition + 1);

        if (isNaN(add(+left , +right))) {
            display.textContent = NaN;
            return 1;
        } else {
            currentExp = `${add(+left , +right)}`;
            display.textContent = currentExp;
        }
        return 0;
    }

    if (minusPosition > 0) {
        let str = currExpArray.join("");
        let left = str.slice(0, minusPosition);
        let right = str.slice(minusPosition + 1);
        
        if (isNaN(subtract(left , right))) {
            display.textContent = NaN;
            return 1;
        } else {
            currentExp = `${subtract(left , right)}`;
            display.textContent = currentExp;
        }
        return 0;
    }

    if (multiplyPosition > 0) {
        let str = currExpArray.join("");
        let left = str.slice(0, multiplyPosition);
        let right = str.slice(multiplyPosition + 1);
        
        if (isNaN(multiply(left , right))) {
            display.textContent = NaN;
            return 1;
        } else {
            currentExp = `${multiply(left , right)}`;
            display.textContent = currentExp;
        }
        return 0;
    }

    if (dividePosition > 0) {
        let str = currExpArray.join("");
        let left = str.slice(0, dividePosition);
        let right = str.slice(dividePosition + 1);
        
        if (isNaN(divide(left , right))) {
            display.textContent = NaN;
            return 1;
        } else {
            currentExp = `${divide(left , right)}`;
            display.textContent = currentExp;
        }
        return 0;
    }

    return 1;
}

let currentExp = "";
const keys = Array.from(document.querySelectorAll(".key"));
let display = document.getElementById("result");
display.textContent = currentExp;

keys.forEach(key => {
    key.addEventListener("click", () => {
        currentExp += key.textContent;
        currentExp = currentExp.slice(0, 18);
        display.textContent = currentExp;
    });
});

const c = document.getElementById("c");
c.addEventListener("click", backspace);

const ac = document.getElementById("ac");
ac.addEventListener("click", allClear);

const signs = Array.from(document.querySelectorAll(".sign"));

signs.forEach(sign => {
    sign.addEventListener("click", () => {
        let ret = evaluateExpression(currentExp);

        if (ret == 0) {
            currentExp += sign.textContent;
            display.textContent = currentExp;
        }
    });
});

const equals = document.getElementById("=");
equals.addEventListener("click", () => {evaluateExpression(currentExp);});


//listen for keydown
window.onkeydown =  function(event) {

    //enter
    if (event.key == "Enter" || event.code == "Equal") {
        evaluateExpression(currentExp);
    }

    //keys
    if ((+event.key >= 0 && +event.key <= 9) 
    || (["+", "-", "*", "/", "."].includes(event.key))) {

        currentExp += event.key;
        currentExp = currentExp.slice(0, 18);
        display.textContent = currentExp;
    }

    //signs
    if (["+", "-", "*", "/"].includes(event.key)) {
        let ret = evaluateExpression(currentExp);

        if (ret == 0) {
            currentExp += event.key;
            display.textContent = currentExp;
        }
    }

    //backspace
    if (event.key == "Backspace") {
        backspace();
    }
};