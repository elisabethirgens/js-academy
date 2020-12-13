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
    if (!event.target.hasAttribute("checked")) {
      event.target.setAttribute("checked", "");
    } else {
      event.target.removeAttribute("checked", "");
    }
    relevantValue = event.target.checked;
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
    const saved = savedData[id];
    if (field.type === "checkbox") {
      if (saved === true) {
        field.setAttribute("checked", "");
      } else {
        field.removeAttribute("checked", "");
      }
      return; // to avoid setting DOM value to 'on' for checkboxes
    }
    if (!saved) return;
    if (field.type === "radio") {
      if (field.value === saved) {
        field.setAttribute("checked", "");
      }
      return; // to avoid changing DOM value to saved value for both radio buttons
    }
    field.value = saved; // for input text and select only
  });
}
loadData();

function clearForm(event) {
  if (event.target.id !== "save-me") return;
  localStorage.removeItem(storageID);
}

document.addEventListener("input", inputHandler);
document.addEventListener("submit", clearForm);
