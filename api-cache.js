const app = document.querySelector("#app");
const storageID = "pirate-news";
const expiration = 1000 * 30;

function ahoyPirateAPI() {
  const savedData = loadData();
  if (savedData) {
    createMarkup(savedData);
    console.log("Loaded from cache");
    return;
  }
  fetch("https://vanillajsacademy.com/api/pirates.json")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      createMarkup(data);
      storeData(data);
      console.log("Fetched from API");
    })
    .catch(function (error) {
      app.textContent = "Sry, no pirate news here! 🙅🏻‍♀️";
      console.error(error);
    });
}

function storeData(apiData) {
  const data = { articles: apiData, timestamp: new Date().getTime() };
  localStorage.setItem(storageID, JSON.stringify(data));
}

function isDataStillValid(savedData, expiring) {
  if (!savedData || !savedData.articles || !savedData.timestamp) return;
  const ageOfData = new Date().getTime() - savedData.timestamp;
  return ageOfData < expiring;
}

function loadData() {
  let savedData = localStorage.getItem(storageID);
  if (!savedData) return;
  savedData = JSON.parse(savedData);
  if (isDataStillValid(savedData, expiration)) {
    return savedData.articles;
  }
}

// Sanitize third-party content by encoding to string
const sanitizeHTML = function (str) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return "&#" + c.charCodeAt(0) + ";";
  });
};

function createMarkup(data) {
  app.innerHTML = data.articles
    .map(function (item) {
      const html = `
              <div>
                <h3>${sanitizeHTML(item.title)}</h3>
                <p>${sanitizeHTML(item.article)}</p>
              </div>
            `;
      return html;
    })
    .join("");
}

ahoyPirateAPI();
