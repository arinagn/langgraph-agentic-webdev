// script.js - Simple Calculator implementation
// This script defines a Calculator class and wires up UI interactions.

(() => {
  // ----- Calculator Class -----
  class Calculator {
    constructor() {
      this.currentValue = '';
      this.previousValue = '';
      this.operation = null; // e.g., 'add', 'subtract', 'multiply', 'divide'
    }

    // Append a digit or decimal point to the current value
    appendNumber(num) {
      if (num === '.' && this.currentValue.includes('.')) return this; // prevent multiple decimals
      this.currentValue = `${this.currentValue}${num}`;
      return this;
    }

    // Choose an operation (+, -, *, /)
    chooseOperation(op) {
      if (!this.currentValue && !this.previousValue) return this; // nothing to operate on
      if (this.previousValue && this.currentValue) {
        // If both values exist, compute intermediate result first
        this.compute();
      }
      this.operation = op;
      if (this.currentValue) {
        this.previousValue = this.currentValue;
        this.currentValue = '';
      }
      return this;
    }

    // Perform the calculation based on stored values and operation
    compute() {
      const prev = parseFloat(this.previousValue);
      const current = parseFloat(this.currentValue);
      if (isNaN(prev) || isNaN(current) || !this.operation) return this;

      let computation = 0;
      switch (this.operation) {
        case 'add':
          computation = prev + current;
          break;
        case 'subtract':
          computation = prev - current;
          break;
        case 'multiply':
          computation = prev * current;
          break;
        case 'divide':
          computation = current === 0 ? 'Error' : prev / current;
          break;
        default:
          return this;
      }

      this.currentValue = `${computation}`;
      this.previousValue = '';
      this.operation = null;
      return this;
    }

    // Reset calculator state
    clear() {
      this.currentValue = '';
      this.previousValue = '';
      this.operation = null;
      return this;
    }

    // Delete the last character of the current value
    delete() {
      this.currentValue = this.currentValue.toString().slice(0, -1);
      return this;
    }

    // Update the calculator display element
    updateDisplay() {
      const display = document.getElementById('display');
      if (!display) return;
      display.textContent = this.currentValue || '0';
    }
  }

  // Expose Calculator globally for testing if needed
  window.Calculator = Calculator;

  // ----- Instantiate Singleton -----
  const calculator = new Calculator();

  // ----- UI Wiring -----
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.buttons button');

  // Helper to process actions from button clicks
  const handleButtonAction = (action, button) => {
    switch (action) {
      case 'digit':
        calculator.appendNumber(button.dataset.value);
        break;
      case 'decimal':
        calculator.appendNumber('.');
        break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        calculator.chooseOperation(action);
        break;
      case 'equals':
        calculator.compute();
        break;
      case 'clear':
        calculator.clear();
        break;
      case 'backspace':
        calculator.delete();
        break;
      default:
        // No action
        break;
    }
    calculator.updateDisplay();
  };

  // Attach click listeners to each button
  buttons.forEach((button) => {
    const action = button.dataset.action;
    if (!action) return;
    button.addEventListener('click', () => handleButtonAction(action, button));
  });

  // ----- Keyboard Support -----
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
      calculator.appendNumber(key);
    } else if (key === '.') {
      calculator.appendNumber('.');
    } else if (key === '+' || key === '=') {
      calculator.chooseOperation('add');
    } else if (key === '-') {
      calculator.chooseOperation('subtract');
    } else if (key === '*') {
      calculator.chooseOperation('multiply');
    } else if (key === '/') {
      calculator.chooseOperation('divide');
    } else if (key === 'Enter') {
      calculator.compute();
    } else if (key === 'Backspace') {
      calculator.delete();
    } else if (key === 'Escape') {
      calculator.clear();
    } else {
      return; // ignore other keys
    }
    calculator.updateDisplay();
    e.preventDefault();
  });

  // Ensure initial display is correct
  calculator.updateDisplay();
})();
