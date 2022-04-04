const emailInput = document.getElementById("emailInput");
const check = document.getElementById("check");
const passwordInput = document.getElementById("passwordInput");
const saveBtn = document.getElementById("saveBtn");

const readFromLS = (key) => {
  const valueInLS = localStorage.getItem(key);
  return JSON.parse(valueInLS);
};

const writeInLS = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

const lowerCaseChars = /[a-z]/;
const upperCaseChars = /[A-Z]/;
const specialChars = /\W/;
const numberChars = /\d/;
const errorToShow = document.getElementById("error");
const showError = document.createElement("p");
showError.classList.add("show-error");

function isPasswordValid(password) {
  if (!lowerCaseChars.test(password)) {
    showError.innerText = `<sup>*</sup>you need atleast one lower case in your password`;
    errorToShow.appendChild(showError);
    return;
  }

  if (!upperCaseChars.test(password)) {
    showError.innerText = `<sup>*</sup>you need atleast one upper case in your password`;
    errorToShow.appendChild(showError);
    return;
  }

  if (!specialChars.test(password)) {
    showError.innerText = `<sup>*</sup>you need atleast one special character in your password`;
    errorToShow.appendChild(showError);
    return;
  }

  if (!numberChars.test(password)) {
    showError.innerText = `<sup>*</sup>you need atleast one number in your password`;
    errorToShow.appendChild(showError);
    return;
  }

  return `Your ${password} meets all the criteria`;
}

let savedEmail = readFromLS("savedEmail") || [];

const allUsers = readFromLS("users") || [];
console.log(allUsers);
let objIndex = (users) =>
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

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const index = objIndex(allUsers);
  if (
    savedEmail === emailInput.value &&
    passwordInput.value.length >= 6 &&
    isPasswordValid(passwordInput.value)
  ) {
    allUsers[index].passwordInput = passwordInput.value;
    writeInLS("users", allUsers);
    window.location.assign("./login.html");
  } else {
    isPasswordValid(passwordInput.value);
  }
});
