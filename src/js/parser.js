/**
 * Parser - Converts infix notation to postfix using Shunting Yard Algorithm
 */
class Parser {
    /**
     * Convert infix expression to postfix notation
     * @param {string} expression - Mathematical expression in infix notation
     * @returns {Array} - Tokens in postfix notation
     */
    static infixToPostfix(expression) {
        const tokens = this.tokenize(expression);
        const output = [];
        const operators = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (this.isNumber(token) || this.isConstant(token)) {
                output.push(token);
            } else if (this.isFunction(token)) {
                operators.push(token);
            } else if (this.isOperator(token)) {
                while (
                    operators.length > 0 &&
                    operators[operators.length - 1] !== '(' &&
                    this.precedence(operators[operators.length - 1]) >= this.precedence(token) &&
                    !(token === '^' && operators[operators.length - 1] === '^') // Right associative
                ) {
                    output.push(operators.pop());
                }
                operators.push(token);
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                if (operators.length === 0) {
                    throw new Error('Mismatched parentheses');
                }
                operators.pop(); // Remove '('

                // If there's a function on top of the stack, pop it to output
                if (operators.length > 0 && this.isFunction(operators[operators.length - 1])) {
                    output.push(operators.pop());
                }
            }
        }

        while (operators.length > 0) {
            const op = operators.pop();
            if (op === '(' || op === ')') {
                throw new Error('Mismatched parentheses');
            }
            output.push(op);
        }

        return output;
    }

    /**
     * Tokenize expression into array of tokens
     * @param {string} expression
     * @returns {Array}
     */
    static tokenize(expression) {
        // Remove spaces
        expression = expression.replace(/\s+/g, '');

        // Replace special characters
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/π/g, 'pi');

        const tokens = [];
        let i = 0;

        while (i < expression.length) {
            const char = expression[i];

            // Numbers (including decimals and negative numbers)
            if (this.isDigit(char) || (char === '.' && i + 1 < expression.length && this.isDigit(expression[i + 1]))) {
                let num = '';
                while (i < expression.length && (this.isDigit(expression[i]) || expression[i] === '.')) {
                    num += expression[i];
                    i++;
                }
                tokens.push(num);
                continue;
            }

            // Operators
            if ('+-*/^()'.includes(char)) {
                // Handle unary minus
                if (char === '-' && (i === 0 || '(+-*/^'.includes(expression[i - 1]))) {
                    let num = '-';
                    i++;
                    while (i < expression.length && (this.isDigit(expression[i]) || expression[i] === '.')) {
                        num += expression[i];
                        i++;
                    }
                    tokens.push(num);
                    continue;
                }
                tokens.push(char);
                i++;
                continue;
            }

            // Functions and constants
            if (this.isLetter(char)) {
                let name = '';
                while (i < expression.length && this.isLetter(expression[i])) {
                    name += expression[i];
                    i++;
                }

                // Check for special function names
                if (name === 'mod') {
                    tokens.push('mod');
                } else {
                    tokens.push(name);
                }
                continue;
            }

            // Unknown character
            throw new Error(`Unknown character: ${char}`);
        }

        return tokens;
    }

    static isDigit(char) {
        return /[0-9]/.test(char);
    }

    static isLetter(char) {
        return /[a-zA-Z]/.test(char);
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
            'log', 'ln', 'sqrt', 'abs', 'exp',
            'pow10', 'square', 'reciprocal', 'factorial'
        ];
        return functions.includes(token);
    }

    static isConstant(token) {
        return ['pi', 'e'].includes(token);
    }

    static precedence(operator) {
        const precedenceMap = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            'mod': 2,
            '^': 3,
            'sin': 4,
            'cos': 4,
            'tan': 4,
            'asin': 4,
            'acos': 4,
            'atan': 4,
            'sinh': 4,
            'cosh': 4,
            'tanh': 4,
            'log': 4,
            'ln': 4,
            'sqrt': 4,
            'abs': 4,
            'exp': 4,
            'pow10': 4,
            'square': 4,
            'reciprocal': 4,
            'factorial': 4
        };
        return precedenceMap[operator] || 0;
    }
}
