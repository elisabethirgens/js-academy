const toc = document.querySelector("#table-of-contents");
let headings = document.querySelectorAll("h2");
let anchorReplacement = 0;

function renderTable() {
  if (headings.length) {
    headings = Array.prototype.slice
      .call(headings)
      .map(function (item) {
        if (!item.id) {
          anchorReplacement++;
          item.setAttribute("id", anchorReplacement);
        }
        return `<li><a href="#${item.id}">${item.textContent}</a></li>`;
      })
      .join("");
    toc.innerHTML = `<ol>${headings}</ol>`;
  }
}

renderTable();
