import { readFromLS, writeInLS } from "./utils.js";

const registerBtn = document.getElementById("registerBtn");
const logInBtn = document.getElementById("logInBtn");
const usernameLogIn = document.getElementById("usernameLogIn");
const passwordLogIn = document.getElementById("passwordLogIn");
const resetPassword = document.getElementById("resetPassword");
const showError = document.getElementById("errorMessage");
const showErrorMessage = document.createElement("p");

const users = readFromLS("users");
console.log(users);

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign("./register.html");
});

logInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const validator = readFromLS("users");
  let loggedInUsers = [];
  // check if the username,email and password are correct and able to log in
  const check = (element) =>
    (usernameLogIn.value === element.userNameInput ||
      usernameLogIn.value === element.emailInput) &&
    btoa(passwordLogIn.value) === element.passwordInput;
  if (validator.some(check)) {
    console.log(validator.some(check));
    let userToDisplay = "";
    // check the user to display even if it will log in with email/username
    users.forEach((user) => {
      if (
        usernameLogIn.value === user.emailInput ||
        usernameLogIn.value === user.userNameInput
      ) {
        userToDisplay = user.userNameInput;
      }
    });
    loggedInUsers.push(userToDisplay);
    let userLogInTime = [];
    const timeLogIn = Date.now();
    userLogInTime.push(timeLogIn);
    writeInLS("userLogInTime", userLogInTime);
    writeInLS("loggedInUsers", loggedInUsers);
    window.location.assign("./loading.html");
  } else {
    // error in case of username or password or email are incorrect
    users.forEach((user) => {
      if (
        usernameLogIn.value !== user.userNameInput ||
        passwordLogIn.value !== user.passwordInput
      ) {
        showErrorMessage.innerHTML = `<sup>*</sup>username or password incorrect`;
        showError.appendChild(showErrorMessage);
        showErrorMessage.classList.add("show-error");
      }
    });
  }
});

resetPassword.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign("./check_email.html");
});
