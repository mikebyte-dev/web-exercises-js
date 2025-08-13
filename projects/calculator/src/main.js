// 1. create the app calculator
class Calculator {
  constructor() {
    // Initialize the calculator's properties
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
    this.equalResult = false;
    this.percentageOperation = false;
  }

  handleNumber(number) {
    // Method to handle all the numbers and decimal point
    // if the user try to add a second decimal point, stop the function
    if (number === "." && this.currentOperand.includes(".")) return;

    if (number === "." && this.currentOperand === "") {
      this.currentOperand = "0.";
      return;
    }

    if (this.equalResult) {
      this.currentOperand = number;
      this.equalResult = false;
    } else if (this.percentageOperation) {
      this.previousOperand = this.currentOperand;
      this.operator = "*";
      this.currentOperand = number;
      this.percentageOperation = false;
    } else this.currentOperand += number;

    // concatenate the new number to the currentOperand as a string
  }

  handleOperator(op) {
    // Method to handle the operators
    // if the currentOperand is empty, there's nothing to operate on

    // if there's already a previousOperand, compute the result first
    if (this.previousOperand) {
      this.compute();
    } else if (!this.currentOperand) return;

    // if there is other operator change for the new wintry
    if (this.operator) {
      this.operator = op;
    } else {
      // store the operator
      this.operator = op;
      // move the currentOperand to the previousOperand
      this.previousOperand = this.currentOperand;
      // clear the currentOperand
      this.currentOperand = "";
    }
  }

  compute() {
    // method to perform the calculation based on the operator selected
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // check if prev and current are numbers
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        // if no valid operation do nothing
        break;
    }

    // Change the global values
    this.currentOperand = computation;

    this.previousOperand = "";
    this.equalResult = true;
    this.operator = undefined;
  }

  clear() {
    // Method to reset the calculator
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
    this.equalResult = false;
    this.percentageOperation = false;
  }

  backspace() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    } else if (this.operator) {
      // Handle if tries to delete an operator
      this.operator = undefined;
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
    }
  }

  negative() {
    // make negative the currentOperand
    if (!this.currentOperand) this.currentOperand = "-";
    else this.currentOperand = -this.currentOperand;
  }

  handlePercentage() {
    // Method to handle the percentage button.
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);

    if (this.operator) {
      if (this.operator === "+" || this.operator === "-") {
        this.currentOperand = prev * (current / 100);
      } else if (this.operator === "*" || this.operator === "/") {
        this.currentOperand = current / 100;
      }
    } else {
      this.currentOperand = this.currentOperand / 100;
      this.operator = "*";
    }

    this.percentageOperation = true;
  }

  updateScreen() {
    // method to update the screen
    if (this.currentOperand) return this.currentOperand;
    else if (this.operator) return `${this.previousOperand}${this.operator}`;
    else return "0";
  }
}

// 2. Get elements of the DOM
const inputDisplay = document.getElementById("input-display");
const btns = document.querySelectorAll(".btn");

// 3. Calculator
const calculator = new Calculator();

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (parseFloat(btn.id) || btn.id === ".") {
      // if it's a number
      calculator.handleNumber(btn.id);
    } else if (btn.id === "c") {
      calculator.clear();
    } else if (btn.id === "=") {
      calculator.compute();
    } else if (btn.id === "backspace") {
      calculator.backspace();
    } else if (btn.id === "+/-") {
      calculator.negative();
    } else if (btn.id === "0") {
      // HACK: handle the number zero, cause the parseFloat() don't take it like a number
      calculator.handleNumber(btn.id);
    } else if (btn.id === "%") {
      calculator.handlePercentage();
    } else {
      // if its a operator
      calculator.handleOperator(btn.id);
    }
    inputDisplay.value = calculator.updateScreen();
  });
});

// Add listener of the keys
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    calculator.handleNumber(e.key);
    console.log(e.key);
  } else if (e.key === "Escape") {
    calculator.clear();
  } else if (e.key === "=" || e.key === "Enter") {
    calculator.compute();
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    calculator.handleOperator(e.key);
  } else if (e.key === "Backspace") {
    calculator.backspace();
  } else if (e.key === "%") {
    calculator.handlePercentage();
  }

  inputDisplay.value = calculator.updateScreen();
});
