// 1. create the app calculator
class Calculator {
  constructor() {
    // Initialize the calculator's properties
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
    this.equalResult = false;
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
    } else this.currentOperand += number;

    // concatenate the new number to the currentOperand as a string
  }

  handleOperator(op) {
    // Method to handle the operators
    // if the currentOperand is empty, there's nothing to operate on
    if (this.currentOperand === "") return;

    // if there's already a previousOperand, compute the result first
    if (this.previousOperand) {
      this.compute();
    }

    // store the operator
    this.operator = op;

    // move the currentOperand to the previousOperand
    this.previousOperand = this.currentOperand;

    // clear the currentOperand
    this.currentOperand = "";
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
    this.currentOperand = computation.toString().includes(".")
      ? computation.toFixed(2)
      : computation;

    this.previousOperand = "";
    this.equalResult = true;
    this.operator = undefined;
  }

  clear() {
    // Method to reset the calculator
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
  }

  backspace() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
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
console.log(btns);

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
    } else {
      // if its a operator
      calculator.handleOperator(btn.id);
    }
    inputDisplay.value = calculator.updateScreen();
  });
});
