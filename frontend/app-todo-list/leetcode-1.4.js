// Алгоритмические задачи с LeetCode
// 
// 1. Two Sum
function twoSum(nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
};

console.log('\nTwo Sum');
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]


// 2. Palindrome Number
function isPalindrome(x) {
    let arr1 = [];
    let num = x;

    if (num < 0) {
        return false;
    }

    while (num > 0) {
        arr1.push(num % 10);
        num = Math.floor(num / 10);
    }

    let arr2 = [...arr1].reverse();
    for (i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }

    return true;
};

console.log('\nPalindrome Number');
console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false


// 3. Roman to Integer
function romanToInt(s) {
    const romanSym = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    let number = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'I' && s[i + 1] === 'V') {
            number += 4;
            i += 1;
        } else if (s[i] === 'I' && s[i + 1] === 'X') {
            number += 9;
            i += 1;
        } else if (s[i] === 'X' && s[i + 1] === 'L') {
            number += 40;
            i += 1;
        } else if (s[i] === 'X' && s[i + 1] === 'C') {
            number += 90;
            i += 1;
        } else if (s[i] === 'C' && s[i + 1] === 'D') {
            number += 400;
            i += 1;
        } else if (s[i] === 'C' && s[i + 1] === 'M') {
            number += 900;
            i += 1;
        } else {
            number += romanSym[s[i]];
        }
    }

    return number;
};

console.log('\nRoman to Integer');
console.log(romanToInt('III')); // 3
console.log(romanToInt('LVIII')); // 58
console.log(romanToInt('MCMXCIV')); // 1994


// 4. Valid Parentheses
function isValid(s) {
    class Stack {
        constructor() {
            this.items = [];
        }

        push(element) {
            this.items.push(element);
        }

        pop() {
            if (this.isEmpty()) {
                return null;
            }
            return this.items.pop();
        }

        peek() {
            if (this.isEmpty()) {
                return null;
            }
            return this.items[this.items.length - 1];
        }

        isEmpty() {
            return this.items.length === 0;
        }

        size() {
            return this.items.length;
        }
    }

    const stack = new Stack();

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
            stack.push(s[i]);
        } else if (s[i] === ')' && stack.peek() === '(') {
            stack.pop();
        } else if (s[i] === '}' && stack.peek() === '{') {
            stack.pop();
        } else if (s[i] === ']' && stack.peek() === '[') {
            stack.pop();
        } else {
            return false;
        }
    }

    if (stack.size() === 0) {
        return true;
    } else {
        return false;
    }
};

console.log('\nValid Parentheses');
console.log(isValid('()')); // true
console.log(isValid('()[]{}')); // true
console.log(isValid('(]')); // false
console.log(isValid('([])')); // true
console.log(isValid('([)]')); // false


// 5. Plus One
function plusOne(digits) {
    let lastZero = [];
    let lastNum = digits.pop();
    while (lastNum === 9 && digits.length !== 0) {
        lastNum = digits.pop();
        lastZero.push(0);
    }

    if (lastNum !== 9) {
        digits.push(lastNum + 1);
    } else {
        digits.push(1, 0);
    }

    digits = digits.concat(lastZero);

    return digits;
};

console.log('\nPlus One');
console.log(plusOne([1, 2, 3])); // [1, 2, 4]
console.log(plusOne([4, 3, 2, 1])); // [4, 3, 2, 2]
console.log(plusOne([9])); // [1, 0]
console.log(plusOne([4, 9, 9])); // [5, 0, 0]
console.log(plusOne([1, 9, 9, 9])); // [2, 0, 0, 0]
