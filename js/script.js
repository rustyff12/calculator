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

// Operate
function operate(firstNumber, operator, secondNumber) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    let result = "";
    if (operator === "plus") {
        console.log(firstNumber);
        console.log(secondNumber);
        const addition = firstNumber + secondNumber;
        console.log(addition);
        const fixedLimit = floatLimit(addition);
        console.log(fixedLimit);
        if (Number.isInteger(addition)) {
            return addition;
        } else if (fixedLimit >= 5) {
            return Number.parseFloat(addition).toFixed(5);
        } else {
            return Number.parseFloat(addition).toFixed(fixedLimit);
        }
    }
    if (operator === "minus") {
        const subtraction = firstNumber - secondNumber;
        if (Number.isInteger(subtraction)) {
            return subtraction;
        } else {
            return Number.parseFloat(subtraction).toFixed(5);
        }
    }

    if (operator === "times") {
        const multiplication = firstNumber * secondNumber;
        if (Number.isInteger(multiplication)) {
            return multiplication;
        } else {
            return Number.parseFloat(multiplication).toFixed(5);
        }
    }

    if (operator === "divide") {
        if (secondNumber === 0) {
            return "Cannot divide by zero";
        }
        const division = firstNumber / secondNumber;
        if (Number.isInteger(division)) {
            return division;
        } else {
            return Number.parseFloat(division).toFixed(5);
        }
    }
    return result;
}

function numSquared(num) {
    const toSquare = parseFloat(num);
    const result = toSquare * toSquare;

    // Determine num of decimal places neede without trailing zeros
    let precision = 5;
    const resultString = result.toFixed(precision);
    // Trim trailing zeros
    const trimmedResultString = resultString.replace(/0*$/, "");
    const decimalPos = trimmedResultString.indexOf(".");
    precision = Math.min(
        precision,
        trimmedResultString.length - (decimalPos + 1)
    );

    // Round the result to the determined precision
    const roundedResult = parseFloat(result.toFixed(precision));

    return roundedResult;
}

/* function getPrecision(num) {
    const str = num.toString();
    const indexOfDecimal = str.indexOf(".");
    if (indexOfDecimal >= 0) {
        return str.length - indexOfDecimal - 1;
    }
    return 0;
}
 */
