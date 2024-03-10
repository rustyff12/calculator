const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".key-grid");
const display = calculator.querySelector(".screen");
const decimalButton = calculator.querySelector(".decimal");
let operatorPressed = false;
let sum = 0;

keys.addEventListener("click", (e) => {
    const key = e.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;

    const { type } = key.dataset;

    const { previousKeyType } = calculator.dataset;

    let clearScreen = key.getAttribute("class");

    if (type === "number" && key.textContent === ".") {
        if (!displayValue.includes(".")) {
            display.textContent = displayValue + ".";
            key.classList.add("disabled");
            key.disabled = true;
        }
    }

    // Number
    if (type === "number") {
        if (clearScreen === "clear") {
            display.textContent = 0;
            operatorPressed = false;
            decimalButton.classList.remove("disabled");
            decimalButton.disabled = false;
        } else {
            if (previousKeyType === "operator" || displayValue === "0") {
                display.textContent = keyValue;
            } else {
                display.textContent = displayValue + keyValue;
            }
        }
    }

    // Squared
    if (type === "square") {
        const numSquare = display.textContent;
        display.textContent = numSquared(numSquare);

        // Resets
        decimalButton.classList.remove("disabled");
        decimalButton.disabled = false;
    }
    // Operator
    if (type === "operator") {
        if (operatorPressed === false) {
            calculator.dataset.firstNumber = displayValue;
            calculator.dataset.operator = key.dataset.key;
            sum = parseFloat(displayValue);
            operatorPressed = true;
        } else if (operatorPressed === true) {
            const operator = calculator.dataset.operator;

            // Operation based on operator
            if (operator === "plus") {
                sum = sum + parseFloat(displayValue);
            } else if (operator === "minus") {
                sum = sum - parseFloat(displayValue);
            } else if (operator === "multiply") {
                sum = sum * parseFloat(displayValue);
            } else if (operator === "divide") {
                // Check if dividing by zero
                if (parseFloat(displayValue) === 0) {
                    display.textContent = "Cannot divide by zero";
                    return; // Exit the function to stop execution
                }
                sum = sum / parseFloat(displayValue);
            }
            display.textContent = sum;

            // Update screen after sum changed
            calculator.dataset.operator = key.dataset.key;
        }
        // Resets
        decimalButton.classList.remove("disabled");
        decimalButton.disabled = false;
    }

    // Equal
    if (type === "equal") {
        // Perform a calculation
        const firstNumber = sum;
        const operator = calculator.dataset.operator;
        const secondNumber = parseFloat(displayValue);

        display.textContent = operate(firstNumber, operator, secondNumber);

        // Resets
        operatorPressed = false;
        sum = 0;
        decimalButton.classList.remove("disabled");
        decimalButton.disabled = false;
    }

    calculator.dataset.previousKeyType = type;
    // console.log(calculator.dataset.previousOperationKey);
});

// Square
function numSquared(num) {
    const toSquare = parseFloat(num);
    const result = toSquare * toSquare;

    const roundedResult = precisionOperation(result);

    return roundedResult;
}

// Operate
function operate(firstNumber, operator, secondNumber) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    let result = "";

    if (operator === "plus") {
        result = precisionOperation(firstNumber + secondNumber);
    } else if (operator === "minus") {
        result = precisionOperation(firstNumber - secondNumber);
    } else if (operator === "times") {
        result = precisionOperation(firstNumber * secondNumber);
    } else if (operator === "divide") {
        if (secondNumber === 0) {
            return "Cannot divide by zero";
        }
        result = precisionOperation(firstNumber / secondNumber);
    }

    return result;
}

// Decimal precision operation
function precisionOperation(result) {
    // Default is 5
    let precision = 5;

    // Determine precision dynamically
    const resultString = result.toFixed(precision);
    // Trim trailing zeros
    const trimmedResultString = resultString.replace(/0*$/, "");
    const decimalPos = trimmedResultString.indexOf(".");
    precision = Math.min(
        precision,
        trimmedResultString.length - (decimalPos + 1)
    );

    // Round result to the determined precision
    if (Number.isInteger(result)) {
        return result;
    } else {
        return parseFloat(result.toFixed(precision));
    }
}
