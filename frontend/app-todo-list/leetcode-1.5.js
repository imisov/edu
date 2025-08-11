// Алгоритмические задачи с LeetCode
//
// 1. Fizz Buzz
function fizzBuzz(n) {
    let answer = [];
    let number = 0;
    while (number < n) {
        number += 1;
        if (number % 3 === 0 && number % 5 === 0) {
            answer.push('FizzBuzz');
        } else if (number % 3 === 0) {
            answer.push('Fizz');
        } else if (number % 5 === 0) {
            answer.push('Buzz');
        } else {
            answer.push(number.toString());
        }
    }
    return answer;
}

console.log('\nFizz Buzz');
console.log(fizzBuzz(3)); // ['1', '2', 'Fizz']
console.log(fizzBuzz(5)); // ['1', '2', 'Fizz', '4', 'Buzz']
console.log(fizzBuzz(15)); // ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']


// 2. Reverse Integer
function reverse(x) {
    let reverseArr = String(x).split('').reverse();

    const lastChar = reverseArr[reverseArr.length - 1];
    if (lastChar === '-') {
        reverseArr.unshift(lastChar);
        reverseArr.pop();
    }

    let reverseInteger = parseInt(reverseArr.join(''));

    if (reverseInteger < Math.pow(-2, 31) || reverseInteger > Math.pow(2, 31) - 1) {
        return 0;
    } else {
        return reverseInteger;
    }
}

console.log('\nReverse Integer');
console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21


// 3. First Unique Character
function firstUniqChar(s) {
    let charArr = [];
    for (let i = 0; i < s.length; i++) {
        if (!charArr.includes(s[i])) {
            charArr.push(s[i]);
            if (s.lastIndexOf(s[i]) === i) {
                return i;
            }
        }
    }
    return -1;
}

console.log('\nFirst Unique Character');
console.log(firstUniqChar('leetcode')); // 0
console.log(firstUniqChar('loveleetcode')); // 2
console.log(firstUniqChar('aabb')); // -1


// 4. Move Zeroes
function moveZeroes(nums) {
    let lastNonZeroNumber = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[lastNonZeroNumber] = nums[i];
            lastNonZeroNumber += 1;
        }
    }

    for (let i = lastNonZeroNumber; i < nums.length; i++) {
        nums[i] = 0;
    }

    return nums;
}

console.log('\nMove Zeroes');
console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0])); // [0]


// 5. Pascal's Triangle
function generate(numRows) {
    let pascal = [[1]];
    if (numRows > 1) {
        pascal.push([1, 1]);
        for (let i = 2; i < numRows; i++) {
            pascal.push([]);
            for (let j = 0; j <= i; j++) {
                if (j === 0 || j === i) {
                    pascal[i][j] = 1;
                } else {
                    pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
                }
            }
        }
    }
    return pascal;
}

console.log("\nPascal's Triangle");
console.log(generate(5)); // [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
console.log(generate(1)); // [[1]]
