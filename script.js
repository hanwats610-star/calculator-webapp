'use strict'; // 1. Strict mode: Taaki code mein choti mistakes na ho

// 2. DOM Elements ko constants mein select karna (Industry Standard)
const display = document.querySelector('#inputBox');
const buttons = document.querySelectorAll('button');

let currentExpression = "";

// 3. Calculator ke logic ko handle karne wala main function
const handleInteraction = (button) => {
    // Dataset se value nikalna (Industry style)
    const number = button.dataset.number;
    const operation = button.dataset.operation;
    const action = button.dataset.action;

    // Use Switch Case for cleaner logic
    if (number) {
        currentExpression += number;
    } 
    else if (operation) {
        // Basic check: do operators ek saath na aayein
        const lastChar = currentExpression.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + operation;
        } else {
            currentExpression += operation;
        }
    } 
    else if (action) {
        switch (action) {
            case 'clear':
                currentExpression = "";
                break;
            case 'delete':
                currentExpression = currentExpression.slice(0, -1);
                break;
            case 'calculate':
                calculateResult();
                return; // Logic complete, display update function niche handle hoga
        }
    }

    updateScreen();
};

// 4. Calculation Logic with Error Handling (Try...Catch)
const calculateResult = () => {
    try {
        if (currentExpression === "") return;
        
        // Industry note: eval safe hai simple calculator ke liye, 
        // par complex apps mein custom parser use hota hai.
        const result = eval(currentExpression);
        
        currentExpression = result.toString();
        updateScreen();
    } catch (error) {
        display.value = "Error";
        currentExpression = "";
    }
};

// 5. Screen Update function (Dry Principle: Don't Repeat Yourself)
const updateScreen = () => {
    display.value = currentExpression || "0";
};

// 6. Event Listeners (Event Delegation is better, but this is fine for starters)
buttons.forEach(btn => {
    btn.addEventListener('click', () => handleInteraction(btn));
});
