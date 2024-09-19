function add (a, b) {
    return a + b;
}

function substract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

const log = console.log;

// log (add (4.6, 2));
// log (substract (4.5, 2));
// log (multiply (4.2, 2));
// log (divide (5, 2));

let firstNum;
let operator;
let secondNum;

function operate (a, b, operator) {
    switch (operator) {
        case "+":
            return add (a, b);
        
        case "-":
            return substract (a, b);

        case "*":
            return multiply (a, b);

        case "/":
            return divide (a, b);

        default:
            return "Invalid operator";
    }
}