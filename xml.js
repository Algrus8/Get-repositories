const btn = document.querySelector(".btn-get-posts");
const btnAddPost = document.querySelector(".btn-add-post");
const container = document.querySelector(".container");
function getPosts(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.error(error);
  });

  xhr.send();
}

function renderPosts(response) {
  const fragment = document.createDocumentFragment();

  getPosts((response) => {
    response.forEach((post) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.textContent = post.title;
      cardTitle.classList.add("card-title");
      const article = document.createElement("p");
      article.textContent = post.body;
      article.classList.add("card-text");
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(article);
      card.appendChild(cardBody);
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
  });
}

btn.addEventListener("click", () => {
  renderPosts();
});

function createPost(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("post", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.error(error);
  });

  xhr.send(JSON.stringify(body));
}

