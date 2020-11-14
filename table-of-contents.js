function renderTable() {
  const toc = document.querySelector("#table-of-contents");
  let headings = document.querySelectorAll("h2");

  if (headings.length) {
    headings = Array.prototype.slice
      .call(headings)
      .map(function (item) {
        if (!item.id) {
          item.id = item.textContent.replace(/[^a-z0-9]+/gi, "-");
        }
        return `<li><a href="#${item.id}">${item.textContent}</a></li>`;
      })
      .join("");
    toc.innerHTML = `<ol>${headings}</ol>`;
  }
}

renderTable();
