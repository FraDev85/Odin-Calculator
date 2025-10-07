const previousDisplay = document.querySelector("#previousDisplay");
const display = document.querySelector("#display");
const reset = document.querySelector(".resetScreen");
const del = document.querySelector(".del");
const btn = document.querySelectorAll(".btn");
const dot = document.querySelector("#btnDot");
const operators = document.querySelectorAll(".btnOperator");
const equal = document.querySelector(".equal");
let cleanZero = true;
let dotUsed = false;
let firstOperand = null;
let currentOperator = null;
let secondOperand = null;
const maxLength = 13;
let result = null;

//
//
btn.forEach((button) => {
  button.addEventListener("click", () => {
    if (cleanZero) {
      display.textContent = "";
      cleanZero = false;
    }
    if (display.textContent.length < maxLength) {
      display.textContent += button.textContent;
    }
    if (firstOperand !== null && currentOperator) {
      secondOperand = parseFloat(display.textContent) || 0;
    }
  });
});

reset.addEventListener("click", () => {
  display.textContent = "0";
  previousDisplay.textContent = "";
  clean();
});

del.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
  if (!display.textContent.includes(".")) {
    dot.disabled = false;
  }

  if (display.textContent === "") {
    display.textContent = "0";
    cleanZero = true;
  }
  if (firstOperand !== null && currentOperator) {
    secondOperand = parseFloat(display.textContent) || 0;
  }
});

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function sub(a, b) {
  return a - b;
}

function div(a, b) {
  return a / b;
}

operators.forEach((opBtn) => {
  opBtn.addEventListener("click", () => {
    handleOperatorClick(opBtn.textContent);
  });
});

equal.addEventListener("click", () => {
  secondOperand = parseFloat(display.textContent);
  if (firstOperand !== null && currentOperator) {
    switch (currentOperator) {
      case "+":
        result = add(firstOperand, secondOperand);
        break;
      case "-":
        result = sub(firstOperand, secondOperand);
        break;
      case "*":
        result = multiply(firstOperand, secondOperand);
        break;
      case "/":
        if (secondOperand === 0) {
          previousDisplay.textContent = `${firstOperand} /  0`;
          display.textContent = "NaN";

          clean();
          return;
        }
        result = div(firstOperand, secondOperand);
        break;
    }

    previousDisplay.textContent = `${firstOperand} `;
    display.textContent = Number(result.toFixed(10)).toString();
    firstOperand = result;
    currentOperator = null;
    secondOperand = null;
    cleanZero = true;
    dotUsed = false;
  }
});

dot.addEventListener("click", handleDotClick);

function handleDotClick() {
  if (!dotUsed && !display.textContent.includes(".")) {
    if (cleanZero) {
      display.textContent = "0.";
      cleanZero = false;
    } else {
      display.textContent += ".";
    }

    dotUsed = true;
  }
}

function handleOperatorClick(op) {
  const currentValue = parseFloat(display.textContent);

  if (firstOperand === null) {
    firstOperand = currentValue;
    currentOperator = op;
    previousDisplay.textContent = `${firstOperand} ${currentOperator}`;
    display.textContent = "0";
    cleanZero = true;
    dotUsed = false;
  } else {
    secondOperand = currentValue;
    switch (currentOperator) {
      case "+":
        result = add(firstOperand, secondOperand);
        break;
      case "-":
        result = sub(firstOperand, secondOperand);
        break;
      case "*":
        result = multiply(firstOperand, secondOperand);
        break;
      case "/":
        if (secondOperand === 0) {
          previousDisplay.textContent = `${firstOperand} /  0`;
          display.textContent = "NaN";

          clean();
          return;
        }
        result = div(firstOperand, secondOperand);
        break;
    }
    previousDisplay.textContent = `${Number(result.toFixed(10))} ${op} `;
    display.textContent = "";
    firstOperand = result;
    currentOperator = op;
    cleanZero = true;
    dotUsed = false;
  }
}

function clean() {
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  cleanZero = true;
  dotUsed = false;
}
