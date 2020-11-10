const toc = document.querySelector("#table-of-contents");
let headings = document.querySelectorAll("h2");

function renderTable() {
  headings = Array.prototype.slice
    .call(headings)
    .map(function (item) {
      const anchor = item.getAttribute("id");
      const heading = item.textContent;
      return `<li><a href="#${anchor}">${heading}</a></li>`;
    })
    .join("");
  toc.innerHTML = `<ol>${headings}</ol>`;
}

renderTable();
