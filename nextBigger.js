async function searchRepositories() {
  const response = await fetch("https://api.github.com/search/repositories", {
    q: "q",
  });
  return response;
}

// console.log(searchRepositories())

function nextBigger(n) {
  let arr = Array.from(n);
  let i = 1;
  let g = 2;
  while (true) {
    [arr[arr.length - i], arr[arr.length - g]] = [
      arr[arr.length - g],
      arr[arr.length - i],
    ];
    if (Number(arr.join("")) > Number(n)) {
      return Number(arr.join(""));
    }
    if (i === arr.length + 1) {
      return -1;
    }
    i++;
    g++;
  }
}

console.log(nextBigger("2017"));
console.log(nextBigger("144"));
console.log(nextBigger("12"));
console.log(nextBigger("111"));
console.log(nextBigger("5988"))
