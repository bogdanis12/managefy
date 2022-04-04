import {
  getUserOut,
  isPasswordValid,
  readFromLS,
  writeInLS,
  clear,
  correctNavbarShow,
} from "./utils.js";

const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const age = document.getElementById("age");
const editBtn = document.getElementById("editBtn");
const errorToShow = document.getElementById("showError");
const showError = document.createElement("p");
showError.classList.add("show-error");

const users = readFromLS("users") || [];

const userLoggedIn = readFromLS("loggedInUsers");

const objIndex = users.findIndex((user) => user.userNameInput == userLoggedIn);
console.log(objIndex);

const isUserLoggedIn = userLoggedIn !== null;
console.log(isUserLoggedIn);

const userLogInTime = readFromLS("userLogInTime");

const getUserInfoInProfile = () => {
  users.forEach((user) => {
    const {
      emailInput,
      userNameInput,
      passwordInput,
      firstNameInput,
      secondNameInput,
      ageInput,
    } = user;
    if (userLoggedIn == userNameInput) {
      email.value = emailInput;
      username.value = userNameInput;
      password.value = atob(passwordInput);
      firstName.value = firstNameInput;
      secondName.value = secondNameInput;
      age.value = ageInput;
    }
  });
};

if (isUserLoggedIn) {
  getUserOut(userLogInTime);
  correctNavbarShow();
  getUserInfoInProfile();

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (password.value.length < 6) {
      showError.innerHTML = `<sup>*</sup>password need to contain at least 6 characters`;
      errorToShow.appendChild(showError);
      return;
    }
    if (firstName.value.length <= 1 || secondName.value <= 1) {
      showError.innerHTML = `<sup>*</sup>your first name / second name needs contain at least 2 characters`;
      errorToShow.appendChild(showError);
      return;
    }
    if (age.value < 18 || age.value > 65) {
      showError.innerHTML = `<sup>*</sup>your age needs to be between 18 and 65`;
      errorToShow.appendChild(showError);
      return;
    }
    if (
      isPasswordValid(password.value, showError, errorToShow) &&
      isUserLoggedIn
    ) {
      users.forEach((user) => {
        users[objIndex].emailInput = email.value;
        users[objIndex].userNameInput = username.value;
        users[objIndex].passwordInput = btoa(password.value);
        users[objIndex].firstNameInput = firstName.value;
        users[objIndex].secondNameInput = secondName.value;
        users[objIndex].ageInput = age.value;
        writeInLS("users", users);
      });
      clear();
      window.location.assign("./index.html");
    }
  });
  cancelBtn.addEventListener("click", () => {
    clear();
    window.location.assign("./index.html");
  });
}

if (!isUserLoggedIn) {
  window.location.assign("./index.html");
}
