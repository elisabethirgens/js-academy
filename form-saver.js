const storageID = "form-autosave";

function getElemId(field) {
  if (field.id) {
    return field.id;
  }
  if (field.name) {
    return field.name;
  }
  return null;
}

function storeData(event) {
  if (!event.target.closest("#save-me")) return;
  const id = getElemId(event.target);
  if (!id) return;
  // Create object and get any existing data before adding new values
  let dataObj = localStorage.getItem(storageID);
  dataObj = dataObj ? JSON.parse(dataObj) : {};
  dataObj[id] = event.target.value;
  localStorage.setItem(storageID, JSON.stringify(dataObj));
}

function repopulateForm() {
  let savedData = localStorage.getItem(storageID);
  if (!savedData) return;
  savedData = JSON.parse(savedData);
  const fieldsAll = Array.prototype.slice.call(
    document.querySelectorAll("#save-me input, #save-me textarea")
  );
  fieldsAll.forEach(function (field) {
    const id = getElemId(field);
    if (!id) return;
    const saved = savedData[id];
    if (!saved) return;
    field.value = saved;
  });
}
repopulateForm();

function clearForm(event) {
  if (event.target.id !== "save-me") return;
  localStorage.removeItem(storageID);
}

document.addEventListener("input", storeData);
document.addEventListener("submit", clearForm);
