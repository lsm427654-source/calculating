/**
 * Evaluator - Evaluates postfix expressions using stack-based algorithm
 */
class Evaluator {
    /**
     * Evaluate a postfix expression
     * @param {Array} postfix - Array of tokens in postfix notation
     * @param {string} angleMode - 'DEG' or 'RAD'
     * @returns {number} - Result of evaluation
     */
    static evaluate(postfix, angleMode = 'DEG') {
        const stack = [];

        for (const token of postfix) {
            if (this.isNumber(token)) {
                stack.push(parseFloat(token));
            } else if (this.isOperator(token)) {
                const b = stack.pop();
                const a = stack.pop();
                stack.push(this.applyOperator(token, a, b));
            } else if (this.isFunction(token)) {
                const a = stack.pop();
                stack.push(this.applyFunction(token, a, angleMode));
            } else if (this.isConstant(token)) {
                stack.push(this.getConstant(token));
            }
        }

        return stack[0];
    }

    static isNumber(token) {
        return !isNaN(parseFloat(token)) && isFinite(token);
    }

    static isOperator(token) {
        return ['+', '-', '*', '/', '^', 'mod'].includes(token);
    }

    static isFunction(token) {
        const functions = [
            'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
            'sinh', 'cosh', 'tanh',
            'log', 'ln', 'sqrt', 'abs', 'exp', 'factorial',
            'pow10', 'square', 'reciprocal'
        ];
        return functions.includes(token);
    }

    static isConstant(token) {
        return ['π', 'pi', 'e'].includes(token);
    }

    static getConstant(token) {
        switch (token) {
            case 'π':
            case 'pi':
                return Math.PI;
            case 'e':
                return Math.E;
            default:
                throw new Error(`Unknown constant: ${token}`);
        }
    }

    static applyOperator(operator, a, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) throw new Error('Division by zero');
                return a / b;
            case '^':
                return Math.pow(a, b);
            case 'mod':
                return a % b;
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }

    static applyFunction(func, value, angleMode) {
        // Helper functions for angle conversion
        const toRadians = (deg) => deg * (Math.PI / 180);
        const toDegrees = (rad) => rad * (180 / Math.PI);

        switch (func) {
            // Trigonometric functions
            case 'sin':
                return Math.sin(angleMode === 'DEG' ? toRadians(value) : value);
            case 'cos':
                return Math.cos(angleMode === 'DEG' ? toRadians(value) : value);
            case 'tan':
                return Math.tan(angleMode === 'DEG' ? toRadians(value) : value);

            // Inverse trigonometric functions
            case 'asin':
                const asinResult = Math.asin(value);
                return angleMode === 'DEG' ? toDegrees(asinResult) : asinResult;
            case 'acos':
                const acosResult = Math.acos(value);
                return angleMode === 'DEG' ? toDegrees(acosResult) : acosResult;
            case 'atan':
                const atanResult = Math.atan(value);
                return angleMode === 'DEG' ? toDegrees(atanResult) : atanResult;

            // Hyperbolic functions
            case 'sinh':
                return Math.sinh(value);
            case 'cosh':
                return Math.cosh(value);
            case 'tanh':
                return Math.tanh(value);

            // Logarithmic and exponential
            case 'log':
                if (value <= 0) throw new Error('Logarithm of non-positive number');
                return Math.log10(value);
            case 'ln':
                if (value <= 0) throw new Error('Logarithm of non-positive number');
                return Math.log(value);
            case 'exp':
                return Math.exp(value);
            case 'pow10':
                return Math.pow(10, value);

            // Other functions
            case 'sqrt':
                if (value < 0) throw new Error('Square root of negative number');
                return Math.sqrt(value);
            case 'abs':
                return Math.abs(value);
            case 'square':
                return value * value;
            case 'reciprocal':
                if (value === 0) throw new Error('Division by zero');
                return 1 / value;
            case 'factorial':
                return this.factorial(value);

            default:
                throw new Error(`Unknown function: ${func}`);
        }
    }

    static factorial(n) {
        if (n < 0) throw new Error('Factorial of negative number');
        if (!Number.isInteger(n)) throw new Error('Factorial of non-integer');
        if (n > 170) throw new Error('Factorial overflow');

        if (n === 0 || n === 1) return 1;

        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}
