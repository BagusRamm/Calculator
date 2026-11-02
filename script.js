const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const keys = document.querySelector(".keys");

let firstNumber = null;
let operator = null;
let startNewNumber = false;

function calculate(first, second, selectedOperator) {
  if (selectedOperator === "+") return first + second;
  if (selectedOperator === "-") return first - second;
  if (selectedOperator === "×") return first * second;
  if (selectedOperator === "÷") {
    return second === 0 ? "Error" : first / second;
  }
}

keys.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    const number = button.dataset.number;
    const currentNumber = currentDisplay.textContent;

    if (currentNumber === "0" || startNewNumber || currentNumber === "Error") {
      currentDisplay.textContent = number;
      startNewNumber = false;
    } else {
      currentDisplay.textContent += number;
    }
    return;
  }

  if (button.dataset.action === "decimal") {
    if (startNewNumber || currentDisplay.textContent === "Error") {
      currentDisplay.textContent = "0.";
      startNewNumber = false;
    } else if (!currentDisplay.textContent.includes(".")) {
      currentDisplay.textContent += ".";
    }
    return;
  }

  if (button.dataset.action === "percent") {
    currentDisplay.textContent = String(
      Number(currentDisplay.textContent) / 100,
    );
    return;
  }

  if (button.dataset.action === "delete") {
    const currentNumber = currentDisplay.textContent;
    currentDisplay.textContent =
      currentNumber.length > 1 ? currentNumber.slice(0, -1) : "0";
    return;
  }

  if (button.dataset.action === "clear") {
    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";
    firstNumber = null;
    operator = null;
    startNewNumber = false;
    return;
  }

  if (button.dataset.operator) {
    firstNumber = Number(currentDisplay.textContent);
    operator = button.dataset.operator;
    previousDisplay.textContent = `${firstNumber} ${operator}`;
    startNewNumber = true;
    return;
  }

  if (button.dataset.action === "equals" && operator !== null) {
    const secondNumber = Number(currentDisplay.textContent);
    const result = calculate(firstNumber, secondNumber, operator);
    previousDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    currentDisplay.textContent = String(result);
    firstNumber = null;
    operator = null;
    startNewNumber = true;
  }
});
