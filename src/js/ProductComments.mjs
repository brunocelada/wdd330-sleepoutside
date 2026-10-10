```javascript
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductComments {
  constructor(productId) {
    this.productId = productId;
    this.storageKey = `product-comments-${productId}`;
    this.comments = [];
  }

  init() {
    this.comments = getLocalStorage(this.storageKey) || [];
    this.render();
    this.addFormListener();
  }

  render() {
    const container = document.querySelector("#productComments");
    if (!container) return;

    container.innerHTML = `
      <section class="comments-section">
        <h2>Customer Comments</h2>

        <form id="commentForm">
          <label for="commentName">Your name</label>
          <input id="commentName" name="name" required maxlength="50" />

          <label for="commentText">Your comment</label>
          <textarea id="commentText" name="comment" required maxlength="1000"></textarea>

          <button type="submit">Post Comment</button>
        </form>

        <div id="commentsList"></div>
      </section>
    `;

    this.renderComments();
  }

  renderComments() {
    const list = document.querySelector("#commentsList");
    if (!list) return;

    list.replaceChildren();

    if (this.comments.length === 0) {
      list.textContent = "No comments yet. Be the first to comment!";
      return;
    }

    this.comments.forEach((comment) => {
      const article = document.createElement("article");
      article.className = "product-comment";

      const name = document.createElement("h3");
      name.textContent = comment.name;

      const text = document.createElement("p");
      text.textContent = comment.text;

      const date = document.createElement("small");
      date.textContent = comment.date;

      article.append(name, text, date);
      list.appendChild(article);
    });
  }

  addFormListener() {
    const form = document.querySelector("#commentForm");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.elements.name.value.trim();
      const text = form.elements.comment.value.trim();

      if (!name || !text) return;

      this.comments.unshift({
        name,
        text,
        date: new Date().toLocaleDateString(),
      });

      setLocalStorage(this.storageKey, this.comments);

      form.reset();
      this.renderComments();
    });
  }
}
```