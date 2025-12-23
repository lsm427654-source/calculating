/**
 * Main Application - UI Integration and Event Handling
 */

// Initialize calculator
const calculator = new Calculator();

// DOM Elements
let displayExpression;
let displayResult;
let modeIndicator;
let historyContainer;
let allButtons;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    attachEventListeners();
    loadSettings();
    updateDisplay();
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    displayExpression = document.querySelector('#display-expression');
    displayResult = document.querySelector('#display-result');
    modeIndicator = document.querySelector('#mode-indicator');
    historyContainer = document.querySelector('#history-container');
    allButtons = document.querySelectorAll('button');
}

/**
 * Attach event listeners to buttons
 */
function attachEventListeners() {
    // Number buttons (0-9)
    for (let i = 0; i <= 9; i++) {
        const buttons = document.querySelectorAll(`button:not([data-action])`);
        buttons.forEach(btn => {
            if (btn.textContent.trim() === i.toString()) {
                btn.addEventListener('click', () => handleNumber(i.toString()));
            }
        });
    }

    // Use event delegation for all buttons
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const text = button.textContent.trim();

        // Numbers
        if (/^[0-9]$/.test(text)) {
            handleNumber(text);
        }
        // Decimal point
        else if (text === '.') {
            handleNumber('.');
        }
        // Basic operators
        else if (text === '+') {
            handleOperator('+');
        }
        else if (text === '-') {
            handleOperator('-');
        }
        else if (text === '×' || text === '*') {
            handleOperator('*');
        }
        else if (text === '÷' || text === '/') {
            handleOperator('/');
        }
        // Parentheses
        else if (text === '(') {
            handleOperator('(');
        }
        else if (text === ')') {
            handleOperator(')');
        }
        // Functions
        else if (text === 'sin') {
            handleFunction('sin');
        }
        else if (text === 'cos') {
            handleFunction('cos');
        }
        else if (text === 'tan') {
            handleFunction('tan');
        }
        else if (text.includes('sin⁻¹')) {
            handleFunction('asin');
        }
        else if (text.includes('cos⁻¹')) {
            handleFunction('acos');
        }
        else if (text.includes('tan⁻¹')) {
            handleFunction('atan');
        }
        else if (text === 'sinh') {
            handleFunction('sinh');
        }
        else if (text === 'cosh') {
            handleFunction('cosh');
        }
        else if (text === 'tanh') {
            handleFunction('tanh');
        }
        else if (text === 'log') {
            handleFunction('log');
        }
        else if (text === 'ln') {
            handleFunction('ln');
        }
        else if (text === 'exp') {
            handleFunction('exp');
        }
        else if (text === '√x') {
            handleFunction('sqrt');
        }
        else if (text === '|x|') {
            handleFunction('abs');
        }
        else if (text === 'x²') {
            handleFunction('square');
        }
        else if (text === 'xʸ' || text === 'x^y') {
            handleOperator('^');
        }
        else if (text === '10ˣ') {
            handleFunction('pow10');
        }
        else if (text === '1/x') {
            handleFunction('reciprocal');
        }
        else if (text === 'n!') {
            handleFunction('factorial');
        }
        else if (text === 'mod') {
            handleOperator('mod');
        }
        // Constants
        else if (text === 'π') {
            handleConstant('π');
        }
        else if (text === 'e') {
            handleConstant('e');
        }
        // Special buttons
        else if (text === '=' || text === 'Enter') {
            handleEquals();
        }
        else if (text === 'C' || text === 'Clear') {
            handleClear();
        }
        else if (text.includes('backspace') || text === '⌫') {
            handleBackspace();
        }
        else if (text === '+/-') {
            handleNegate();
        }
        // Mode toggle
        else if (text === 'DEG' || text === 'RAD') {
            handleModeToggle();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);
}

/**
 * Handle number input
 */
function handleNumber(num) {
    calculator.addInput(num);
    updateDisplay();
}

/**
 * Handle operator input
 */
function handleOperator(op) {
    calculator.addInput(op);
    updateDisplay();
}

/**
 * Handle function input
 */
function handleFunction(func) {
    calculator.addInput(func + '(');
    updateDisplay();
}

/**
 * Handle constant input
 */
function handleConstant(constant) {
    calculator.addInput(constant);
    updateDisplay();
}

/**
 * Handle equals button
 */
function handleEquals() {
    try {
        const result = calculator.calculate();
        updateDisplay();
        updateHistory();

        // Clear expression and show result
        calculator.currentExpression = '';
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Handle clear button
 */
function handleClear() {
    calculator.clear();
    updateDisplay();
}

/**
 * Handle backspace
 */
function handleBackspace() {
    calculator.backspace();
    updateDisplay();
}

/**
 * Handle negate (+/-)
 */
function handleNegate() {
    if (calculator.currentExpression === '' && calculator.lastResult !== null) {
        calculator.currentExpression = '(-' + calculator.lastResult + ')';
    } else {
        calculator.addInput('(-');
    }
    updateDisplay();
}

/**
 * Handle mode toggle (DEG/RAD)
 */
function handleModeToggle() {
    const newMode = calculator.toggleAngleMode();
    updateModeIndicator();
    saveSettings();
}

/**
 * Handle keyboard input
 */
function handleKeyboard(e) {
    const key = e.key;

    // Numbers and decimal
    if (/^[0-9.]$/.test(key)) {
        handleNumber(key);
        e.preventDefault();
    }
    // Operators
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key);
        e.preventDefault();
    }
    // Parentheses
    else if (key === '(' || key === ')') {
        handleOperator(key);
        e.preventDefault();
    }
    // Enter = Calculate
    else if (key === 'Enter') {
        handleEquals();
        e.preventDefault();
    }
    // Escape = Clear
    else if (key === 'Escape') {
        handleClear();
        e.preventDefault();
    }
    // Backspace
    else if (key === 'Backspace') {
        handleBackspace();
        e.preventDefault();
    }
}

/**
 * Update display
 */
function updateDisplay() {
    if (displayExpression) {
        displayExpression.textContent = calculator.currentExpression || '0';
    }

    if (displayResult) {
        if (calculator.result !== null) {
            displayResult.innerHTML = Calculator.formatNumber(calculator.result) + '<span class="animate-pulse text-primary">|</span>';
        } else {
            displayResult.innerHTML = '0<span class="animate-pulse text-primary">|</span>';
        }
    }
}

/**
 * Update mode indicator
 */
function updateModeIndicator() {
    if (modeIndicator) {
        modeIndicator.textContent = calculator.angleMode;
    }

    // Update radio buttons
    const degRadio = document.querySelector('input[value="DEG"]');
    const radRadio = document.querySelector('input[value="RAD"]');

    if (calculator.angleMode === 'DEG') {
        if (degRadio) degRadio.checked = true;
    } else {
        if (radRadio) radRadio.checked = true;
    }
}

/**
 * Update history display
 */
function updateHistory() {
    if (!historyContainer) return;

    const history = calculator.getHistory();

    historyContainer.innerHTML = history.map(entry => `
    <div class="group flex flex-col gap-1 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-[#283039] cursor-pointer transition-colors" onclick="loadHistoryEntry('${entry.expression}')">
      <p class="text-sm text-slate-500 dark:text-slate-400 text-right font-normal">${entry.expression}</p>
      <p class="text-lg text-slate-900 dark:text-white text-right font-bold group-hover:text-primary transition-colors">${Calculator.formatNumber(entry.result)}</p>
    </div>
  `).join('');
}

/**
 * Load history entry
 */
function loadHistoryEntry(expression) {
    calculator.currentExpression = expression;
    updateDisplay();
}

/**
 * Show error message
 */
function showError(message) {
    if (displayResult) {
        displayResult.innerHTML = '<span class="text-red-500">Error</span>';
    }
    if (displayExpression) {
        displayExpression.textContent = message;
    }

    // Clear error after 2 seconds
    setTimeout(() => {
        calculator.clear();
        updateDisplay();
    }, 2000);
}

/**
 * Save settings to localStorage
 */
function saveSettings() {
    localStorage.setItem('calculator-angle-mode', calculator.angleMode);
}

/**
 * Load settings from localStorage
 */
function loadSettings() {
    const angleMode = localStorage.getItem('calculator-angle-mode');
    if (angleMode) {
        calculator.setAngleMode(angleMode);
        updateModeIndicator();
    }
}
