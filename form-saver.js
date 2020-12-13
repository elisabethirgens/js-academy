const storageID = "form-autosave";

function getElemId(field) {
  // Prefer name, so unique id can be used for labels
  if (field.name) {
    return field.name;
  }
  if (field.id) {
    return field.id;
  }
  return null;
}

function inputHandler(event) {
  if (!event.target.closest("#save-me")) return;
  const id = getElemId(event.target);
  if (!id) return;
  let relevantValue = event.target.value;
  if (event.target.type === "checkbox") {
    if (event.target.checked) {
      event.target.setAttribute("checked", "");
      relevantValue = "on";
    } else {
      event.target.removeAttribute("checked", "");
      relevantValue = "off";
    }
  }
  storeData(id, relevantValue);
}

function storeData(id, value) {
  // Create object and get any existing data before adding new values
  let dataObj = localStorage.getItem(storageID);
  dataObj = dataObj ? JSON.parse(dataObj) : {};
  dataObj[id] = value;
  localStorage.setItem(storageID, JSON.stringify(dataObj));
}

function loadData() {
  let savedData = localStorage.getItem(storageID);
  if (!savedData) return;
  savedData = JSON.parse(savedData);
  const fieldsAll = Array.prototype.slice.call(
    document.querySelectorAll(
      "#save-me input, #save-me select, #save-me textarea"
    )
  );
  fieldsAll.forEach(function (field) {
    const id = getElemId(field);
    if (!id) return;
    if (field.type === "checkbox") {
      if (savedData[id] === "on") {
        field.setAttribute("checked", "");
      } else {
        field.removeAttribute("checked", "");
      }
    } else if (field.type === "radio") {
      if (field.value === savedData[id]) {
        field.setAttribute("checked", "");
      }
    } else {
      if (!savedData[id]) return;
      field.value = savedData[id];
    }
  });
}
loadData();

function clearForm(event) {
  if (event.target.id !== "save-me") return;
  localStorage.removeItem(storageID);
}

document.addEventListener("input", inputHandler);
document.addEventListener("submit", clearForm);
