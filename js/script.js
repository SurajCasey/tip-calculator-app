// Selecting the inputs
const billAmount = document.getElementById('bill-amount');
const noOfPeople = document.getElementById('number-of-people');
const buttons = document.querySelectorAll('.calculator__button, .results__reset');

// Selecting the buttons
const fivePercent = document.getElementById('five');
const tenPercent = document.getElementById('ten');
const fifteenPercent = document.getElementById('fifteen');
const twentyfivePercent = document.getElementById('twentyfive');
const fiftyPercent = document.getElementById('fifty');
const customInput = document.getElementById('custom');

// Selecting total amount and reset button
const tipAmount = document.getElementById('tip-amount-value');
const totalAmount = document.getElementById('total-amount-value');
const resetButton = document.getElementById('reset');
const errorMessage = document.getElementById('error-message');

// Changing the color of button when we click
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttons.forEach((btn) => {
            btn.style.backgroundColor = '';
        });
        button.style.backgroundColor = 'hsl(172, 67%, 45%)';
    });
});

// Change the border of textfield on focus
billAmount.addEventListener('focus', () => {
    billAmount.style.border = 'solid 2px hsl(172, 67%, 45%)';
});
noOfPeople.addEventListener('focus', () => {
    noOfPeople.style.border = 'solid 2px hsl(172, 67%, 45%)';
});

// Error message if 0 is entered in number of people
noOfPeople.addEventListener('input', () => {
    if (noOfPeople.value === '' || parseInt(noOfPeople.value) === 0) {
        errorMessage.style.display = 'inline-block';
    } else {
        errorMessage.style.display = 'none';
        noOfPeople.style.border = '';
    }
});

// Tip calculation function
function calculateTip(tipPercentage) {
    const billValue = parseFloat(billAmount.value);
    const peopleValue = parseInt(noOfPeople.value);

    if (billValue > 0 && peopleValue > 0) {
        const tip = (billValue * tipPercentage) / 100;
        const total = (billValue + tip) / peopleValue;

        tipAmount.textContent = `$${(tip / peopleValue).toFixed(2)}`;
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
}

// Adding event listeners for percentage buttons
fivePercent.addEventListener('click', () => calculateTip(5));
tenPercent.addEventListener('click', () => calculateTip(10));
fifteenPercent.addEventListener('click', () => calculateTip(15));
twentyfivePercent.addEventListener('click', () => calculateTip(25));
fiftyPercent.addEventListener('click', () => calculateTip(50));

// Custom input event listener
customInput.addEventListener('input', () => {
    const customTip = parseFloat(customInput.value);
    if (!isNaN(customTip) && customTip > 0) {
        calculateTip(customTip);
    }
});

// Reset function
function resetCalculator() {
    // Clear input fields
    billAmount.value = '';
    noOfPeople.value = '';
    customInput.value = '';

    // Reset displayed amounts
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';

    // Hide error message
    errorMessage.style.display = 'none';

    // Remove borders and button highlights
    noOfPeople.style.border = '';
    billAmount.style.border = '';
    buttons.forEach((btn) => {
        btn.style.backgroundColor = '';
    });
}

// Attach reset functionality to Reset button
resetButton.addEventListener('click', resetCalculator);
