/**
 * Calculator - Main calculator engine with state management
 */
class Calculator {
    constructor() {
        this.currentExpression = '';
        this.result = null;
        this.angleMode = 'DEG'; // 'DEG' or 'RAD'
        this.history = [];
        this.lastResult = null;
    }

    /**
     * Add input to current expression
     * @param {string} input
     */
    addInput(input) {
        this.currentExpression += input;
    }

    /**
     * Clear current expression
     */
    clear() {
        this.currentExpression = '';
        this.result = null;
    }

    /**
     * Delete last character
     */
    backspace() {
        this.currentExpression = this.currentExpression.slice(0, -1);
    }

    /**
     * Toggle angle mode between DEG and RAD
     */
    toggleAngleMode() {
        this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
        return this.angleMode;
    }

    /**
     * Set angle mode
     * @param {string} mode - 'DEG' or 'RAD'
     */
    setAngleMode(mode) {
        if (mode === 'DEG' || mode === 'RAD') {
            this.angleMode = mode;
        }
    }

    /**
     * Calculate current expression
     * @returns {number} - Result of calculation
     */
    calculate() {
        try {
            if (!this.currentExpression || this.currentExpression.trim() === '') {
                throw new Error('Empty expression');
            }

            // Parse expression to postfix
            const postfix = Parser.infixToPostfix(this.currentExpression);

            // Evaluate postfix expression
            const result = Evaluator.evaluate(postfix, this.angleMode);

            // Check for invalid results
            if (!isFinite(result)) {
                throw new Error('Result is not finite');
            }

            this.result = result;
            this.lastResult = result;

            // Add to history
            this.addToHistory(this.currentExpression, result);

            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add calculation to history
     * @param {string} expression
     * @param {number} result
     */
    addToHistory(expression, result) {
        const entry = {
            expression,
            result,
            timestamp: new Date().toISOString()
        };

        this.history.unshift(entry);

        // Keep only last 50 entries
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
    }

    /**
     * Get history
     * @returns {Array}
     */
    getHistory() {
        return this.history;
    }

    /**
     * Clear history
     */
    clearHistory() {
        this.history = [];
    }

    /**
     * Format number for display
     * @param {number} num
     * @returns {string}
     */
    static formatNumber(num) {
        if (num === null || num === undefined) return '0';

        // Handle very large or very small numbers
        if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
            return num.toExponential(10);
        }

        // Round to avoid floating point errors
        const rounded = Math.round(num * 1e10) / 1e10;

        return rounded.toString();
    }
}
