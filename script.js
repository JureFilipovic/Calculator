function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (a, b, operator) {
    switch (operator) {
        case "+":
            return add (a, b);
        
        case "-":
            return subtract (a, b);

        case "x":
            return multiply (a, b);

        case "÷":
            if (b === 0)  {
                return "Can't do division with 0!"
            }
            return divide (a, b);

        default:
            return "Invalid operator";
    }
}

function formatResult (result) {
    if (Number.isInteger (result)) {
        return result.toString ();

    } else {
        return parseFloat (result.toFixed(10).toString());
    }
}

const digitButtons = document.querySelectorAll(".digits .digitButton");
const operationButtons = document.querySelectorAll (".operations .operationButton");
const controlButtons = document.querySelectorAll (".controls .controlButton");
const inputOutputField = document.querySelector (".inputOutputField");
const dotButton = document.querySelector (".digits .dot");

let firstNumber = "";
let secondNumber = "";
let operation = "";
let isOperation = false;
let result = null;

digitButtons.forEach (button => {
    button.addEventListener ("click", () => {
        if (isOperation) {
            inputOutputField.value = "";
            isOperation = false;
        }

        if (button.textContent === ".") {
            if (inputOutputField.value.includes (".")) return;
            inputOutputField.value += button.textContent;

            if (operation === "") {
                firstNumber += button.textContent;
    
            } else {
                secondNumber += button.textContent;
            }

            dotButton.disabled = true;

        } else {
            if (operation === "") {
                firstNumber += button.textContent;
                inputOutputField.value += button.textContent;
    
            } else {
                secondNumber += button.textContent;
                inputOutputField.value += button.textContent;
            }
        }
        
        
    });
});

operationButtons.forEach (button => {
    button.addEventListener ("click", () => {
        if (firstNumber != "" && secondNumber != "") {
            let tempResult = 
                operate (Number (firstNumber), Number (secondNumber), operation);
            
            if (tempResult === "Can't do division with 0!") {
                result = tempResult;
                inputOutputField.value = result;
                firstNumber = "";
                secondNumber = "";

            } else {
                result = formatResult (tempResult);
                inputOutputField.value = result;
                firstNumber = String (result);
                secondNumber = "";
            }
        }  

        operation = button.textContent;
        isOperation = true;
        dotButton.disabled = false;
    });
});

controlButtons.forEach (button => {
    button.addEventListener ("click", () => {
        if (button.textContent === "=") {
            if (firstNumber != "" && secondNumber != "" && operation != "") {
                let tempResult = 
                    operate (Number (firstNumber), Number (secondNumber), operation);
                
                if (tempResult === "Can't do division with 0!") {
                    result = tempResult;
                    inputOutputField.value = result;
                    firstNumber = "";
                    secondNumber = "";
                    operation = "";
                    isOperation = false;
                    dotButton.disabled = false;

                } else {
                    result = formatResult (tempResult);
                    inputOutputField.value = result;
                    firstNumber = String (result);
                    secondNumber = "";
                    operation = "";
                    isOperation = false;
                    dotButton.disabled = false;
                }
            }

        } else if (button.textContent === "CE") {
            inputOutputField.value = "";
            firstNumber = "";
            secondNumber = "";
            operation = "";
            isOperation = false;
            dotButton.disabled = false;

        } else if (button.textContent === "←") {
            if (operation === "") {
                firstNumber = firstNumber.slice (0, -1);
                inputOutputField.value = inputOutputField.value.slice (0, -1);

            } else {
                secondNumber = secondNumber.slice (0, -1);
                inputOutputField.value = inputOutputField.value.slice (0, -1);
            }

            if (!inputOutputField.value.includes (".")) {
                dotButton.disabled = false;
            }

        }
    });
});