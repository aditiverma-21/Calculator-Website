
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currInput = '';
let prevInput = '';
let operator = null;
let displayOp = false; 


buttons.forEach(button => {
  button.addEventListener('click', function() {
    const value = this.innerText;
    const action = this.getAttribute('data-action');

    if (!action) {
      appendNumber(value);
    } else if (action === 'add') {
      chooseOperation('+');
    } else if (action === 'subtract') {
      chooseOperation('-');
    } else if (action === 'multiply') {
      chooseOperation('*');
    } else if (action === 'divide') {
      chooseOperation('/');
    } else if (action === 'equals') {
      compute();
    } else if (action === 'clear') {
      clear();
    } else if (action === 'clear-entry') {
      clearEntry(); 
    } else if (action === 'delete') {
      deleteNumber();
    }
  });
});

function appendNumber(number) {
  if (currInput.includes('.') && number === '.') return;
  currInput = currInput.toString() + number.toString();
  displayOp = false;  
  updateDisplay();
}

function chooseOperation(op) {
  if (currInput === '') return;
  if (prevInput !== '') {
    compute();
  }
  operator = op;
  prevInput = currInput;
  currInput = '';
  displayOp = true;  
  updateDisplay();
}

function compute() {
  let result;
  const prev = parseFloat(prevInput);
  const curr = parseFloat(currInput);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = prev / curr;
      break;
    default:
      return;
  }

  currInput = result;
  operator = undefined;
  prevInput = '';
  displayOp = true; 
  updateDisplay();
}

function updateDisplay() {
  if (displayOp && operator) {
    display.innerText = prevInput + ' ' + operator; 
  } else {
    display.innerText = currInput || '0';  
  }
}

function clear() {
  currInput = '';
  prevInput = '';
  operator = undefined;
  displayOp = false;  
  updateDisplay();
}

function clearEntry() {
  currInput = '';
  updateDisplay();
}

function deleteNumber() {
  currInput = currInput.toString().slice(0, -1);
  updateDisplay();
}
