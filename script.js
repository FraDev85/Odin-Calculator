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
const maxLength = 13;
let expression = "";
let justCalculated = false;

// Numbers
btn.forEach((button) => {
  button.addEventListener("click", () => {
    if (justCalculated) {
      expression = "";
      previousDisplay.textContent = "";
      justCalculated = false;
      dotUsed = false;
      cleanZero = false;
    }
    if (cleanZero) {
      display.textContent = "";
      cleanZero = false;
    }
    if (display.textContent.length < maxLength) {
      display.textContent += button.textContent;
    }
  });
});

//---------------------Reset----------------------------------------

reset.addEventListener("click", () => {
  display.textContent = "0";
  previousDisplay.textContent = "";
  expression = "";
  clean();
  justCalculated = false;
});
//-------------------------------Delete-----------------------------------------
del.addEventListener("click", () => {
  if (justCalculated) return;
  display.textContent = display.textContent.slice(0, -1);
  if (!display.textContent.includes(".")) {
    dotUsed = false;
  }

  if (display.textContent === "") {
    display.textContent = "0";
    cleanZero = true;
  }
});

// --------------------Operators-----------------------------------------------------

operators.forEach((opBtn) => {
  opBtn.addEventListener("click", () => {
    if (display.textContent === "Error") return reset.click();
    if (opBtn.textContent === "=") return;
    if (justCalculated) {
      expression = display.textContent + opBtn.textContent;
      justCalculated = false;
    } else if (/[+\-*/]$/.test(expression)) {
      expression = expression.slice(0, -1) + opBtn.textContent;
    } else {
      expression += display.textContent + opBtn.textContent;
    }
    previousDisplay.textContent = expression;
    cleanZero = true;
    dotUsed = false;
  });
});

//_____________________________Equal_________________________________________________

equal.addEventListener("click", () => {
  try {
    if (display.textContent === "Error") return reset.click();
    let fullExpression;
    if (!expression) {
      previousDisplay.textContent = display.textContent + " =";
      justCalculated = true;
      return;
    }

    if (/[+\-*/]$/.test(expression)) {
      fullExpression = expression + display.textContent;
    } else {
      fullExpression = expression;
    }

    const result = safeEval(fullExpression);
    display.textContent = formatResult(result);
    previousDisplay.textContent = fullExpression + " =";
    expression = "";
    cleanZero = true;
    dotUsed = display.textContent.includes(".");
    justCalculated = true;
  } catch (error) {
    display.textContent = "Error";
    expression = "";
    justCalculated = false;
  }
});

dot.addEventListener("click", handleDotClick);

function handleDotClick() {
  if (!dotUsed) {
    if (cleanZero || display.textContent === "") {
      display.textContent = "0.";
      cleanZero = false;
    } else {
      display.textContent += ".";
    }

    dotUsed = true;
  }
}

//__________________Helpers_____________________________________

function safeEval(expression) {
  if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
    throw new Error("Invalid expression");
  }
  return Function('"use strict"; return (' + expression + ")")();
}

function formatResult(num) {
  if (isNaN(num) || !isFinite(num)) return "NaN";
  const str = Number(num.toFixed(10)).toString();
  return str.length > maxLength ? parseFloat(str).toExponential(6) : str;
}

function clean() {
  cleanZero = true;
  dotUsed = false;
}
