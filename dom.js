const screen = document.querySelector(".display");
const numKey = document.querySelectorAll(".number");
const toggleBtn = document.querySelector(".toggle");
const operations = document.querySelectorAll(".operation");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".remove");

let currentInput = '';
let operator = '';
let inputs = []; // Array to store multiple inputs

screen.innerHTML = 0;

function numberKeys() {
   numKey.forEach(function (num) {
      num.addEventListener('click', function () {
         currentInput += num.value;
         screen.innerHTML = currentInput;
      });
   });
}

numberKeys();

operations.forEach(operatorBtn => {
   operatorBtn.addEventListener('click', function () {
      // Check if there's a current input before applying the operator
      if (currentInput !== '') {
         operator = operatorBtn.value;
         inputs.push(parseFloat(currentInput), operator);
         currentInput = ''; // Reset current input for the next number
         screen.innerHTML = inputs.join(' ');
      }
   });
});

toggleBtn.addEventListener('click', function () {
   currentInput = -parseFloat(currentInput);
   screen.innerHTML = inputs.join(' ') + ' ' + operator + ' ' + currentInput;
});

equalBtn.addEventListener('click', function () {
   // Check if there's a current input and an operator before performing the calculation
   if (currentInput !== '' && operator !== '') {
      inputs.push(parseFloat(currentInput));
      let result = inputs[0]; // Initialize with the first input
      let steps = inputs.join(' ');
      for (let i = 1; i < inputs.length; i += 2) {
         let nextOperator = inputs[i];
         let nextOperand = inputs[i + 1];
         switch (nextOperator) {
            case '+':
               result += nextOperand;
               break;
            case '-':
               result -= nextOperand;
               break;
            case '*':
               result *= nextOperand;
               break;
            case '/':
               if (nextOperand !== 0) {
                  result /= nextOperand;
               } else {
                  screen.innerHTML = "Error";
                  return;
               }
               break;
            case '%':
               result = (result * 1) / 100;
               break;
            default:
               break;
         }
         steps += ' ' + nextOperator + ' ' + nextOperand + ' = ' + result;
      }
      screen.innerHTML = result;
      // Reset inputs and operator for the next calculation
      inputs = [];
      operator = '';
   }
});

clearBtn.addEventListener('click', function () {
   // Reset the calculator
   currentInput = '';
   operator = '';
   inputs = [];
   screen.innerHTML = 0;
});

deleteBtn.addEventListener('click', function () {
   // Remove the last character from the current input
   currentInput = currentInput.slice(0, -1);
   screen.innerHTML = inputs.join(' ') + ' ' + operator + ' ' + currentInput;
   if (currentInput.length === 0) {
      currentInput = '';
      screen.innerHTML = 0;
   }
});