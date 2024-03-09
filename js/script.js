/* Main script */
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".key-grid");
const screen = calculator.querySelector(".screen");

const operatorArr = [];
let operatorPressed = false;
keys.addEventListener("click", (e) => {
    // target pressed keys
    const pressed = e.target;
    const pressedKey = pressed.getAttribute("class");

    const { type } = pressed.dataset;
    const { key } = pressed.dataset;

    if (type === "number" && operatorPressed === false) {
        if (screen.textContent === "0") {
            screen.textContent = pressed.textContent;
        } else if (pressedKey === "clear") {
            screen.textContent = 0;
        } else {
            screen.textContent += pressed.textContent;
        }
    } else if (type === "operator") {
        operatorPressed = true;
        const previous = screen.textContent;
        operatorArr.push(previous);
        console.log(operatorArr);
        operatorArr.push(key);
    } else if (type === "number" && operatorPressed === true) {
        screen.textContent = pressed.textContent;
        operatorPressed = false;
    } /* else if (type === "equal") {
        let sum = 0;

    } */
});

/* for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    const elementNum = Object.keys(element);
    const value = Object.values(element);
    if (elementNum[0] === pressedKey) {
        screen.textContent = value;
        operatorArr.push(value);
    }
} */
/* const nums = [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
    { seven: 7 },
    { eight: 8 },
    { nine: 9 },
    { zero: 0 },
]; */
