// 문제 1-1: 순수 함수로 변환

// 비순수 함수 1
 let total = 0;
 function addToTotal(amount) {
   total += amount;
   return total;
 }

// 비순수 함수 2
 function shuffle(arr) {
   for (let i = arr.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
 }

// 비순수 함수 3
 const config = { debug: false };
 function log(message) {
   if (config.debug) {
     console.log(message);
   }
 }

//TODO: 순수 함수 버전 구현

function addToTotal(total, amount) {
  return total + amount;
}

function shuffle(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function log(config, message) {
  if (config.debug) {
    return message;
  }
  return null;
}

// 테스트 출력
console.log('--- 문제 1-1 결과 ---');

// 1. addToTotal 테스트
const currentTotal = 0;
console.log(addToTotal(currentTotal, 10)); // 10 출력

// 2. shuffle 테스트
const nums = [1, 2, 3, 4, 5];
console.log(shuffle(nums)); // 섞인 배열 출력
console.log(nums); // [1, 2, 3, 4, 5] 원본 유지 확인

// 3. log 테스트
const myConfig = { debug: true };
console.log(log(myConfig, "테스트 메시지입니다.")); // "테스트 메시지입니다." 출력