const toc = document.querySelector("#table-of-contents");
let headings = document.querySelectorAll("h2");
let anchorReplacement = 0;

function renderTable() {
  if (headings.length) {
    headings = Array.prototype.slice
      .call(headings)
      .map(function (item) {
        if (!item.hasAttribute("id")) {
          anchorReplacement++;
          item.setAttribute("id", anchorReplacement);
        }
        const anchor = item.getAttribute("id");
        const heading = item.textContent;
        return `<li><a href="#${anchor}">${heading}</a></li>`;
      })
      .join("");
    toc.innerHTML = `<ol>${headings}</ol>`;
  }
}

renderTable();
