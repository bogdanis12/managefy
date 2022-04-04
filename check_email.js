import { isPasswordValid, readFromLS, writeInLS } from "./utils.js";

const emailInput = document.getElementById("emailInput");
const check = document.getElementById("check");
const passwordInput = document.getElementById("passwordInput");
const saveBtn = document.getElementById("saveBtn");

const errorToShow = document.getElementById("error");
const showError = document.createElement("p");
showError.classList.add("show-error");

let savedEmail = readFromLS("savedEmail") || [];

const allUsers = readFromLS("users") || [];
console.log(allUsers);
const objIndex = (users) =>
  users.findIndex((user) => user.emailInput === savedEmail);

passwordInput.hidden = true;
saveBtn.hidden = true;

check.addEventListener("click", (e) => {
  e.preventDefault();
  allUsers.forEach((user) => {
    if (emailInput.value !== user.emailInput) {
      showError.innerHTML = `<sup>*</sup> wrong email`;
      errorToShow.appendChild(showError);
      return;
    }
    if (emailInput.value === user.emailInput) {
      showError.classList.add("display");
      passwordInput.hidden = false;
      saveBtn.hidden = false;
      savedEmail = emailInput.value;
      writeInLS("savedEmail", savedEmail);
    }
  });
});

console.log(savedEmail);
saveBtn.addEventListener("click", (e) => {
  showError.classList.remove("display");
  e.preventDefault();
  const index = objIndex(allUsers);
  if (passwordInput.value.length < 6) {
    showError.classList.add("show-error");
    showError.innerHTML = `<sup>*</sup>password must be at least 6 characters`;
    errorToShow.appendChild(showError);
    return;
  }
  if (isPasswordValid(passwordInput.value, showError, errorToShow)) {
    allUsers[index].passwordInput = btoa(passwordInput.value);
    writeInLS("users", allUsers);
    window.location.assign("./login.html");
  }
});
