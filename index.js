import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const input = document.querySelector(".search__input");
const searchList = document.querySelector(".search__list");
const chosen = document.querySelector(".chosen");

const debounce = (fn, debounceTime) => {
  let timeOut;
  return function (...args) {
    const functionCall = () => fn.apply(this, args);
    clearTimeout(timeOut);
    timeOut = setTimeout(functionCall, debounceTime);
  };
};

async function searchRepo(value) {
  if (!input.value) {
    return;
  }
  const octokit = await new Octokit({});
  const response = await octokit.request("GET /search/repositories", {
    q: input.value,
    per_page: 5,
  });
  showList(response.data.items);
}
const debounceSearch = debounce(searchRepo, 250);

function showList(elements) {
  const requestList = document.querySelectorAll(".search__request");
  elements.forEach((element, index) => {
    requestList[index].textContent = element.name;
    requestList[index].gitResponse = element;
  });
  searchList.style.display = "block";
}

function addChosen(response) {
  const chosen = document.querySelector(".chosen");

  const element = document.createElement("div");
  element.classList.add("chosen__element");
  const list = document.createElement("ul");
  list.classList.add("chosen__list");
  const name = document.createElement("li");
  name.textContent = `Name: ${response.name}`;
  const owner = document.createElement("li");
  owner.textContent = `Owner: ${response.owner.login}`;
  const stars = document.createElement("li");
  stars.textContent = `Stars: ${response.stargazers_count}`;
  const closeButton = document.createElement("button");
  closeButton.classList.add("chosen__close");

  list.appendChild(name);
  list.appendChild(owner);
  list.appendChild(stars);
  element.appendChild(list);
  element.appendChild(closeButton);
  chosen.appendChild(element);

  input.value = "";
  searchList.style.display = "none";
}

input.addEventListener("keyup", () => {
  debounceSearch();
});

searchList.addEventListener("click", (event) => {
  addChosen(event.target.gitResponse);
});

chosen.addEventListener("click", (event) => {
  if (event.target.classList.contains("chosen__close")) {
    event.target.closest("div").remove();
  }
});
