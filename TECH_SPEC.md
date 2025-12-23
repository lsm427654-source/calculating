# 공학용 계산기 웹앱 기술 명세서 (Tech Spec)

## 📋 문서 정보
- **프로젝트명**: Scientific Calculator Web App
- **버전**: 1.0
- **작성일**: 2025-12-23
- **최종 수정일**: 2025-12-23
- **관련 문서**: [PRD.md](./PRD.md), [README.md](./README.md)

---

## 1. 기술 스택 개요

### 1.1 프론트엔드 기술

#### 1.1.1 핵심 기술
```
├── HTML5
│   ├── Semantic Elements
│   ├── Custom Data Attributes
│   └── Accessibility (ARIA)
│
├── CSS3
│   ├── Flexbox
│   ├── Grid Layout
│   ├── Custom Properties (Variables)
│   ├── Animations & Transitions
│   └── Media Queries
│
└── JavaScript (ES6+)
    ├── Modules (ES6 Modules)
    ├── Classes
    ├── Arrow Functions
    ├── Template Literals
    ├── Destructuring
    ├── Spread/Rest Operators
    └── Async/Await (향후)
```

#### 1.1.2 CSS 프레임워크
**TailwindCSS v3.x** (CDN)
- **선택 이유**:
  - 빠른 프로토타이핑
  - 유틸리티 우선 접근 방식
  - 다크 모드 내장 지원
  - 커스터마이징 용이
  - 번들 크기 최적화 (JIT 모드)

- **설정**:
```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#137fec",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "surface-dark": "#1c2630",
        "surface-darker": "#283039",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      }
    }
  }
}
```

#### 1.1.3 외부 라이브러리 및 리소스
**Google Fonts**
- Space Grotesk (300, 400, 500, 700)
- CDN: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap`

**Material Symbols**
- Outlined 스타일
- CDN: `https://fonts.google.com/icons`

### 1.2 개발 도구

#### 1.2.1 버전 관리
- **Git**: 소스 코드 버전 관리
- **GitHub**: 원격 저장소 및 협업

#### 1.2.2 코드 에디터 (권장)
- **VS Code**: 주요 개발 환경
  - 확장: Live Server, Prettier, ESLint
  - 설정: Auto Save, Format on Save

#### 1.2.3 브라우저 개발자 도구
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

---

## 2. 아키텍처 설계

### 2.1 전체 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                   Presentation Layer                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   UI Layer   │  │  Components  │  │   Styles  │ │
│  │  (HTML/CSS)  │  │   (Buttons,  │  │(Tailwind) │ │
│  │              │  │   Display)   │  │           │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                   Business Logic Layer               │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Calculator  │  │    Parser    │  │ Evaluator │ │
│  │   Engine     │  │  (Infix →    │  │ (Postfix  │ │
│  │              │  │   Postfix)   │  │  Calc)    │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                      Data Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │    State     │  │   History    │  │  Settings │ │
│  │  Management  │  │   Storage    │  │  Storage  │ │
│  │              │  │ (LocalStore) │  │(LocalStore│ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
```

### 2.2 모듈 구조

```
src/
├── index.html              # 메인 HTML 파일
├── css/
│   ├── styles.css          # 커스텀 CSS (향후)
│   └── tailwind.config.js  # Tailwind 설정 (인라인)
├── js/
│   ├── main.js             # 앱 초기화 및 이벤트 바인딩
│   ├── calculator.js       # 계산기 엔진
│   ├── parser.js           # 수식 파싱
│   ├── evaluator.js        # 수식 계산
│   ├── display.js          # 디스플레이 관리
│   ├── history.js          # 히스토리 관리
│   ├── settings.js         # 설정 관리
│   └── utils.js            # 유틸리티 함수
└── assets/
    └── icons/              # 아이콘 (필요시)
```

### 2.3 컴포넌트 구조

```
App
├── Header
│   ├── Logo
│   ├── Title
│   └── ActionButtons
│       ├── SettingsButton
│       └── HistoryButton
│
├── Main
│   ├── Display
│   │   ├── ModeIndicators
│   │   ├── ExpressionDisplay
│   │   ├── ResultDisplay
│   │   └── CopyButton
│   │
│   └── ButtonPanel
│       ├── LeftPanel (Scientific Functions)
│       │   ├── ModeToggle (DEG/RAD)
│       │   └── FunctionButtons (5x7 Grid)
│       │
│       └── RightPanel (Trigonometry)
│           ├── BasicTrig (sin, cos, tan)
│           ├── InverseTrig (sin⁻¹, cos⁻¹, tan⁻¹)
│           └── HyperbolicTrig (sinh, cosh, tanh)
│
└── Sidebar (Large screens only)
    ├── HistoryHeader
    │   ├── Title
    │   └── ClearButton
    │
    └── HistoryList
        └── HistoryItem[]
            ├── Expression
            └── Result
```

---

## 3. 핵심 모듈 상세 설계

### 3.1 Calculator Engine (`calculator.js`)

#### 3.1.1 클래스 구조
```javascript
class Calculator {
  constructor() {
    this.currentExpression = '';
    this.result = null;
    this.angleMode = 'DEG'; // 'DEG' or 'RAD'
    this.history = [];
    this.secondFunction = false;
  }

  // 메서드
  inputNumber(num) { }
  inputOperator(op) { }
  inputFunction(func) { }
  calculate() { }
  clear() { }
  backspace() { }
  toggleAngleMode() { }
  toggleSecondFunction() { }
}
```

#### 3.1.2 주요 기능
- **입력 관리**: 숫자, 연산자, 함수 입력 처리
- **수식 검증**: 유효한 수식인지 확인
- **계산 실행**: Parser와 Evaluator 호출
- **상태 관리**: 현재 수식, 결과, 모드 관리

### 3.2 Parser (`parser.js`)

#### 3.2.1 Shunting Yard Algorithm
**목적**: 중위 표기법(Infix) → 후위 표기법(Postfix) 변환

**알고리즘 단계**:
1. 토큰화: 수식을 토큰으로 분리
2. 연산자 우선순위 처리
3. 괄호 처리
4. 후위 표기법 생성

**예시**:
```
입력: "3 + 4 * 2"
토큰: ['3', '+', '4', '*', '2']
출력: ['3', '4', '2', '*', '+']
```

#### 3.2.2 연산자 우선순위
```javascript
const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  'mod': 2,
  '^': 3,  // 거듭제곱
  'sin': 4,
  'cos': 4,
  'tan': 4,
  'log': 4,
  'ln': 4,
  // ... 기타 함수
};
```

#### 3.2.3 구현 코드 스켈레톤
```javascript
class Parser {
  static infixToPostfix(expression) {
    const tokens = this.tokenize(expression);
    const output = [];
    const operators = [];
    
    for (const token of tokens) {
      if (this.isNumber(token)) {
        output.push(token);
      } else if (this.isFunction(token)) {
        operators.push(token);
      } else if (this.isOperator(token)) {
        while (
          operators.length > 0 &&
          this.precedence(operators[operators.length - 1]) >= this.precedence(token)
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators[operators.length - 1] !== '(') {
          output.push(operators.pop());
        }
        operators.pop(); // Remove '('
      }
    }
    
    while (operators.length > 0) {
      output.push(operators.pop());
    }
    
    return output;
  }
  
  static tokenize(expression) {
    // 수식을 토큰으로 분리
  }
  
  static isNumber(token) { }
  static isOperator(token) { }
  static isFunction(token) { }
  static precedence(operator) { }
}
```

### 3.3 Evaluator (`evaluator.js`)

#### 3.3.1 후위 표기법 계산
**알고리즘**: Stack 기반 계산

**단계**:
1. 후위 표기법 토큰을 순회
2. 숫자는 스택에 푸시
3. 연산자/함수는 스택에서 피연산자 팝
4. 계산 후 결과를 스택에 푸시
5. 최종 결과 반환

#### 3.3.2 구현 코드 스켈레톤
```javascript
class Evaluator {
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
      }
    }
    
    return stack[0];
  }
  
  static applyOperator(operator, a, b) {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case '^': return Math.pow(a, b);
      case 'mod': return a % b;
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  }
  
  static applyFunction(func, value, angleMode) {
    // 각도 변환
    const toRadians = (deg) => deg * (Math.PI / 180);
    const toDegrees = (rad) => rad * (180 / Math.PI);
    
    switch (func) {
      case 'sin':
        return Math.sin(angleMode === 'DEG' ? toRadians(value) : value);
      case 'cos':
        return Math.cos(angleMode === 'DEG' ? toRadians(value) : value);
      case 'tan':
        return Math.tan(angleMode === 'DEG' ? toRadians(value) : value);
      case 'asin':
        const asinResult = Math.asin(value);
        return angleMode === 'DEG' ? toDegrees(asinResult) : asinResult;
      case 'acos':
        const acosResult = Math.acos(value);
        return angleMode === 'DEG' ? toDegrees(acosResult) : acosResult;
      case 'atan':
        const atanResult = Math.atan(value);
        return angleMode === 'DEG' ? toDegrees(atanResult) : atanResult;
      case 'sinh':
        return Math.sinh(value);
      case 'cosh':
        return Math.cosh(value);
      case 'tanh':
        return Math.tanh(value);
      case 'log':
        return Math.log10(value);
      case 'ln':
        return Math.log(value);
      case 'sqrt':
        return Math.sqrt(value);
      case 'abs':
        return Math.abs(value);
      case 'factorial':
        return this.factorial(value);
      case 'exp':
        return Math.exp(value);
      default:
        throw new Error(`Unknown function: ${func}`);
    }
  }
  
  static factorial(n) {
    if (n < 0) throw new Error('Factorial of negative number');
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}
```

### 3.4 Display Manager (`display.js`)

#### 3.4.1 책임
- 수식 표시 업데이트
- 결과 표시 업데이트
- 커서 애니메이션
- 모드 인디케이터 업데이트

#### 3.4.2 구현 코드 스켈레톤
```javascript
class DisplayManager {
  constructor() {
    this.expressionElement = document.querySelector('#expression');
    this.resultElement = document.querySelector('#result');
    this.modeElement = document.querySelector('#mode-indicator');
  }
  
  updateExpression(expression) {
    this.expressionElement.textContent = expression || '0';
  }
  
  updateResult(result) {
    this.resultElement.textContent = this.formatNumber(result);
  }
  
  updateMode(mode) {
    this.modeElement.textContent = mode;
  }
  
  formatNumber(num) {
    // 숫자 포맷팅 (소수점 자릿수, 과학적 표기법 등)
    if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-15 && num !== 0)) {
      return num.toExponential(10);
    }
    return num.toString();
  }
  
  showError(message) {
    this.resultElement.textContent = 'Error';
    this.expressionElement.textContent = message;
  }
}
```

### 3.5 History Manager (`history.js`)

#### 3.5.1 기능
- 계산 기록 저장
- 히스토리 표시
- 히스토리 삭제
- LocalStorage 연동

#### 3.5.2 구현 코드 스켈레톤
```javascript
class HistoryManager {
  constructor() {
    this.history = this.loadFromStorage();
    this.historyElement = document.querySelector('#history-list');
  }
  
  addEntry(expression, result) {
    const entry = {
      id: Date.now(),
      expression,
      result,
      timestamp: new Date().toISOString()
    };
    
    this.history.unshift(entry);
    this.saveToStorage();
    this.render();
  }
  
  clear() {
    this.history = [];
    this.saveToStorage();
    this.render();
  }
  
  loadFromStorage() {
    const stored = localStorage.getItem('calculator-history');
    return stored ? JSON.parse(stored) : [];
  }
  
  saveToStorage() {
    localStorage.setItem('calculator-history', JSON.stringify(this.history));
  }
  
  render() {
    this.historyElement.innerHTML = this.history
      .map(entry => this.createHistoryItemHTML(entry))
      .join('');
  }
  
  createHistoryItemHTML(entry) {
    return `
      <div class="history-item" data-id="${entry.id}">
        <p class="expression">${entry.expression}</p>
        <p class="result">${entry.result}</p>
      </div>
    `;
  }
}
```

### 3.6 Settings Manager (`settings.js`)

#### 3.6.1 설정 항목
- 각도 모드 (DEG/RAD)
- 테마 (다크/라이트)
- 소수점 자릿수
- 과학적 표기법 임계값

#### 3.6.2 구현 코드 스켈레톤
```javascript
class SettingsManager {
  constructor() {
    this.settings = this.loadSettings();
  }
  
  loadSettings() {
    const defaults = {
      angleMode: 'DEG',
      theme: 'dark',
      decimalPlaces: 10,
      scientificNotationThreshold: 1e15
    };
    
    const stored = localStorage.getItem('calculator-settings');
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
  }
  
  saveSettings() {
    localStorage.setItem('calculator-settings', JSON.stringify(this.settings));
  }
  
  get(key) {
    return this.settings[key];
  }
  
  set(key, value) {
    this.settings[key] = value;
    this.saveSettings();
  }
}
```

---

## 4. 이벤트 처리

### 4.1 이벤트 바인딩 전략

#### 4.1.1 Event Delegation
**이유**: 성능 최적화, 동적 요소 처리

```javascript
// 모든 버튼 클릭을 하나의 핸들러로 처리
document.querySelector('.button-panel').addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  
  const action = button.dataset.action;
  const value = button.dataset.value;
  
  handleButtonClick(action, value);
});
```

#### 4.1.2 키보드 이벤트
```javascript
document.addEventListener('keydown', (e) => {
  const key = e.key;
  
  // 숫자 키
  if (/^[0-9.]$/.test(key)) {
    calculator.inputNumber(key);
  }
  
  // 연산자 키
  if (['+', '-', '*', '/'].includes(key)) {
    calculator.inputOperator(key);
  }
  
  // Enter: 계산
  if (key === 'Enter') {
    calculator.calculate();
  }
  
  // Backspace: 삭제
  if (key === 'Backspace') {
    calculator.backspace();
  }
  
  // Escape: 초기화
  if (key === 'Escape') {
    calculator.clear();
  }
});
```

### 4.2 이벤트 흐름

```
User Input (Click/Keyboard)
         ↓
   Event Handler
         ↓
  Calculator Engine
         ↓
   Parser (if needed)
         ↓
   Evaluator (if needed)
         ↓
  Display Manager
         ↓
   Update UI
```

---

## 5. 상태 관리

### 5.1 상태 구조

```javascript
const state = {
  // 현재 입력
  currentExpression: '',
  
  // 계산 결과
  result: null,
  
  // 설정
  settings: {
    angleMode: 'DEG',
    theme: 'dark',
    decimalPlaces: 10
  },
  
  // 히스토리
  history: [],
  
  // UI 상태
  ui: {
    secondFunction: false,
    historyVisible: false
  }
};
```

### 5.2 상태 업데이트 패턴

```javascript
// Immutable 업데이트
function updateState(updates) {
  Object.assign(state, updates);
  render();
}

// 예시
updateState({
  currentExpression: '3 + 4',
  result: null
});
```

---

## 6. 데이터 저장

### 6.1 LocalStorage 사용

#### 6.1.1 저장 항목
- **calculator-history**: 계산 기록
- **calculator-settings**: 사용자 설정

#### 6.1.2 데이터 구조
```javascript
// calculator-history
[
  {
    id: 1703318400000,
    expression: "sin(30)",
    result: "0.5",
    timestamp: "2025-12-23T07:00:00.000Z"
  },
  // ...
]

// calculator-settings
{
  angleMode: "DEG",
  theme: "dark",
  decimalPlaces: 10,
  scientificNotationThreshold: 1e15
}
```

---

## 7. 오류 처리

### 7.1 오류 유형

#### 7.1.1 구문 오류
- 잘못된 수식 (예: "3 + + 4")
- 괄호 불일치
- 연산자 연속 사용

#### 7.1.2 수학적 오류
- 0으로 나누기
- 음수의 제곱근
- 범위 초과 (Infinity, NaN)
- 팩토리얼 음수 입력

#### 7.1.3 입력 오류
- 유효하지 않은 문자
- 너무 긴 수식

### 7.2 오류 처리 전략

```javascript
class Calculator {
  calculate() {
    try {
      // 수식 검증
      if (!this.isValidExpression(this.currentExpression)) {
        throw new Error('Invalid expression');
      }
      
      // 파싱
      const postfix = Parser.infixToPostfix(this.currentExpression);
      
      // 계산
      const result = Evaluator.evaluate(postfix, this.angleMode);
      
      // 결과 검증
      if (!isFinite(result)) {
        throw new Error('Math error: Result is not finite');
      }
      
      this.result = result;
      displayManager.updateResult(result);
      
    } catch (error) {
      console.error('Calculation error:', error);
      displayManager.showError(error.message);
    }
  }
}
```

---

## 8. 성능 최적화

### 8.1 최적화 전략

#### 8.1.1 DOM 조작 최소화
- **Virtual DOM 패턴** (간단한 구현)
- **Batch Updates**: 여러 업데이트를 한 번에 처리
- **Event Delegation**: 이벤트 리스너 수 최소화

#### 8.1.2 계산 최적화
- **Memoization**: 반복 계산 결과 캐싱
- **Lazy Evaluation**: 필요할 때만 계산

```javascript
// Memoization 예시
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const factorial = memoize((n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});
```

#### 8.1.3 리소스 로딩 최적화
- **CDN 사용**: TailwindCSS, Google Fonts
- **Lazy Loading**: 필요한 모듈만 로드
- **Code Splitting**: 기능별 파일 분리

### 8.2 성능 측정

```javascript
// 계산 성능 측정
console.time('calculation');
const result = calculator.calculate();
console.timeEnd('calculation');

// 목표: < 100ms
```

---

## 9. 테스트 전략

### 9.1 테스트 유형

#### 9.1.1 단위 테스트 (Unit Tests)
**대상**: 개별 함수 및 메서드

```javascript
// 예시: Parser 테스트
describe('Parser', () => {
  test('should convert infix to postfix', () => {
    const infix = '3 + 4 * 2';
    const postfix = Parser.infixToPostfix(infix);
    expect(postfix).toEqual(['3', '4', '2', '*', '+']);
  });
  
  test('should handle parentheses', () => {
    const infix = '(3 + 4) * 2';
    const postfix = Parser.infixToPostfix(infix);
    expect(postfix).toEqual(['3', '4', '+', '2', '*']);
  });
});

// 예시: Evaluator 테스트
describe('Evaluator', () => {
  test('should evaluate basic arithmetic', () => {
    const postfix = ['3', '4', '+'];
    const result = Evaluator.evaluate(postfix);
    expect(result).toBe(7);
  });
  
  test('should evaluate trigonometric functions', () => {
    const postfix = ['30', 'sin'];
    const result = Evaluator.evaluate(postfix, 'DEG');
    expect(result).toBeCloseTo(0.5, 5);
  });
});
```

#### 9.1.2 통합 테스트 (Integration Tests)
**대상**: 모듈 간 상호작용

```javascript
describe('Calculator Integration', () => {
  test('should calculate complex expression', () => {
    calculator.clear();
    calculator.inputNumber('3');
    calculator.inputOperator('+');
    calculator.inputNumber('4');
    calculator.inputOperator('*');
    calculator.inputNumber('2');
    calculator.calculate();
    
    expect(calculator.result).toBe(11);
  });
});
```

#### 9.1.3 E2E 테스트 (End-to-End Tests)
**대상**: 전체 사용자 플로우

```javascript
// Playwright 또는 Cypress 사용
test('user can perform calculation', async ({ page }) => {
  await page.goto('http://localhost:8000');
  
  // 3 + 4 입력
  await page.click('[data-value="3"]');
  await page.click('[data-value="+"]');
  await page.click('[data-value="4"]');
  await page.click('[data-action="calculate"]');
  
  // 결과 확인
  const result = await page.textContent('#result');
  expect(result).toBe('7');
});
```

### 9.2 테스트 도구 (향후)
- **Jest**: JavaScript 테스트 프레임워크
- **Playwright/Cypress**: E2E 테스트
- **Testing Library**: DOM 테스트 유틸리티

---

## 10. 보안 고려사항

### 10.1 입력 검증

```javascript
class InputValidator {
  static sanitizeInput(input) {
    // 허용된 문자만 통과
    const allowedChars = /^[0-9+\-*/().πe\s]+$/;
    if (!allowedChars.test(input)) {
      throw new Error('Invalid characters in input');
    }
    return input;
  }
  
  static validateExpression(expression) {
    // 최대 길이 제한
    if (expression.length > 1000) {
      throw new Error('Expression too long');
    }
    
    // 괄호 균형 확인
    let balance = 0;
    for (const char of expression) {
      if (char === '(') balance++;
      if (char === ')') balance--;
      if (balance < 0) return false;
    }
    return balance === 0;
  }
}
```

### 10.2 XSS 방지
- **textContent 사용**: innerHTML 대신 textContent 사용
- **입력 이스케이프**: 사용자 입력 이스케이프 처리

### 10.3 데이터 보호
- **LocalStorage 암호화** (선택사항)
- **민감 정보 저장 금지**

---

## 11. 접근성 (Accessibility)

### 11.1 ARIA 속성

```html
<!-- 버튼 예시 -->
<button 
  aria-label="Number 7"
  role="button"
  tabindex="0"
  data-value="7">
  7
</button>

<!-- 디스플레이 예시 -->
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  id="result">
  0
</div>
```

### 11.2 키보드 네비게이션
- **Tab**: 버튼 간 이동
- **Enter/Space**: 버튼 활성화
- **Arrow Keys**: 그리드 네비게이션 (선택사항)

### 11.3 스크린 리더 지원
- 명확한 레이블
- 상태 변경 알림
- 오류 메시지 읽기

---

## 12. 브라우저 호환성

### 12.1 지원 브라우저

| 브라우저 | 최소 버전 | 비고 |
|---------|----------|------|
| Chrome | 90+ | 완전 지원 |
| Firefox | 88+ | 완전 지원 |
| Safari | 14+ | 완전 지원 |
| Edge | 90+ | 완전 지원 |

### 12.2 Polyfills (필요시)
- **Math 함수**: 대부분 브라우저에서 지원
- **ES6 기능**: Babel 트랜스파일 (필요시)

---

## 13. 배포 전략

### 13.1 정적 호스팅
**GitHub Pages** (권장)
- 무료 호스팅
- HTTPS 자동 지원
- 간단한 배포

**설정**:
```bash
# gh-pages 브랜치 생성 및 배포
git checkout -b gh-pages
git push origin gh-pages

# GitHub Settings에서 Pages 활성화
# Source: gh-pages branch
```

**URL**: `https://lsm427654-source.github.io/calculating/`

### 13.2 대체 호스팅 옵션
- **Netlify**: 자동 배포, CDN
- **Vercel**: 빠른 배포, 프리뷰
- **Cloudflare Pages**: 글로벌 CDN

### 13.3 빌드 프로세스 (향후)
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물
dist/
├── index.html
├── css/
│   └── styles.min.css
└── js/
    └── app.min.js
```

---

## 14. 개발 워크플로우

### 14.1 Git 브랜치 전략

```
main (프로덕션)
  ↑
develop (개발)
  ↑
feature/* (기능 개발)
  ├── feature/calculator-engine
  ├── feature/history
  └── feature/keyboard-support
```

### 14.2 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 작업, 패키지 관리
```

**예시**:
```bash
git commit -m "feat: Add calculator engine with basic operations"
git commit -m "fix: Fix division by zero error handling"
git commit -m "docs: Update Tech Spec with parser implementation"
```

### 14.3 코드 리뷰 체크리스트
- [ ] 코드가 요구사항을 충족하는가?
- [ ] 테스트가 작성되었는가?
- [ ] 오류 처리가 적절한가?
- [ ] 성능 이슈가 없는가?
- [ ] 접근성이 고려되었는가?
- [ ] 문서가 업데이트되었는가?

---

## 15. 모니터링 및 로깅

### 15.1 에러 로깅

```javascript
class Logger {
  static error(message, error) {
    console.error(`[ERROR] ${message}`, error);
    
    // 프로덕션: 에러 추적 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket 등
    }
  }
  
  static info(message, data) {
    console.log(`[INFO] ${message}`, data);
  }
  
  static warn(message, data) {
    console.warn(`[WARN] ${message}`, data);
  }
}
```

### 15.2 사용자 분석 (선택사항)
- **Google Analytics**: 사용자 행동 분석
- **Hotjar**: 히트맵, 세션 녹화

---

## 16. 향후 기술 개선

### 16.1 프레임워크 마이그레이션 (선택사항)
**React/Vue/Svelte**로 전환 고려
- 더 나은 상태 관리
- 컴포넌트 재사용성
- 개발자 도구

### 16.2 PWA (Progressive Web App)
- **Service Worker**: 오프라인 지원
- **App Manifest**: 홈 화면 추가
- **Push Notifications**: 알림 (선택사항)

### 16.3 WebAssembly
- 복잡한 계산 성능 향상
- 대용량 데이터 처리

---

## 17. 참고 자료

### 17.1 알고리즘
- [Shunting Yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
- [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)

### 17.2 JavaScript
- [MDN Web Docs - Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [JavaScript.info](https://javascript.info/)

### 17.3 CSS/TailwindCSS
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [CSS Tricks](https://css-tricks.com/)

### 17.4 테스트
- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

---

## 부록 A: 코드 예시

### A.1 완전한 Calculator 클래스

```javascript
class Calculator {
  constructor() {
    this.currentExpression = '';
    this.result = null;
    this.angleMode = 'DEG';
    this.history = [];
    this.secondFunction = false;
    
    this.displayManager = new DisplayManager();
    this.historyManager = new HistoryManager();
    this.settingsManager = new SettingsManager();
  }
  
  inputNumber(num) {
    this.currentExpression += num;
    this.displayManager.updateExpression(this.currentExpression);
  }
  
  inputOperator(op) {
    // 연산자 연속 입력 방지
    if (this.isLastCharOperator()) {
      this.currentExpression = this.currentExpression.slice(0, -1);
    }
    this.currentExpression += ` ${op} `;
    this.displayManager.updateExpression(this.currentExpression);
  }
  
  inputFunction(func) {
    this.currentExpression += `${func}(`;
    this.displayManager.updateExpression(this.currentExpression);
  }
  
  calculate() {
    try {
      const postfix = Parser.infixToPostfix(this.currentExpression);
      const result = Evaluator.evaluate(postfix, this.angleMode);
      
      if (!isFinite(result)) {
        throw new Error('Math error');
      }
      
      this.result = result;
      this.displayManager.updateResult(result);
      this.historyManager.addEntry(this.currentExpression, result);
      
    } catch (error) {
      this.displayManager.showError(error.message);
    }
  }
  
  clear() {
    this.currentExpression = '';
    this.result = null;
    this.displayManager.updateExpression('');
    this.displayManager.updateResult(0);
  }
  
  backspace() {
    this.currentExpression = this.currentExpression.slice(0, -1);
    this.displayManager.updateExpression(this.currentExpression);
  }
  
  toggleAngleMode() {
    this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
    this.displayManager.updateMode(this.angleMode);
    this.settingsManager.set('angleMode', this.angleMode);
  }
  
  isLastCharOperator() {
    const operators = ['+', '-', '*', '/', '^'];
    const lastChar = this.currentExpression.trim().slice(-1);
    return operators.includes(lastChar);
  }
}
```

---

**문서 버전**: 1.0  
**작성일**: 2025-12-23  
**최종 수정일**: 2025-12-23

---

*이 기술 명세서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
