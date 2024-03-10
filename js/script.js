const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".key-grid");
const display = calculator.querySelector(".screen");

keys.addEventListener("click", (e) => {
    const key = e.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;

    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;
    let clearScreen = key.getAttribute("class");
    // Number
    if (type === "number") {
        if (clearScreen === "clear") {
            display.textContent = 0;
        } else {
            if (displayValue === "0") {
                display.textContent = keyValue;
            } else if (previousKeyType === "operator") {
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
    }
    // Operator
    if (type === "operator") {
        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    // Equal
    if (type === "equal") {
        // Perform a calculation
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = parseFloat(displayValue);

        display.textContent = operate(firstNumber, operator, secondNumber);
    }

    calculator.dataset.previousKeyType = type;
    // console.log(calculator.dataset.previousKeyType);
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
