import { isPasswordValid, readFromLS, writeInLS } from "./utils.js";

const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const age = document.getElementById("age");
const registerBtn = document.getElementById("registerBtn");
const errorToShow = document.getElementById("error");
const showError = document.createElement("p");
showError.classList.add("show-error");

const users = readFromLS("users") || [];

const emailAlreadyExist = (userEntry) =>
  users.filter((user) => user.emailInput === userEntry).length === 1;

const userAlreadyExist = (userEntry) =>
  users.filter((user) => user.userNameInput === userEntry).length === 1;

const emailCondition = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const usersInfo = {
    emailInput: email.value,
    userNameInput: username.value,
    passwordInput: btoa(password.value),
    firstNameInput: firstName.value,
    secondNameInput: secondName.value,
    ageInput: age.value,
  };
  if (!emailCondition.test(email.value)) {
    console.log(emailCondition.test(email.value));
    showError.innerHTML = `<sup>*</sup>not a valid format for email`;
    errorToShow.appendChild(showError);
    return;
  }

  if (emailAlreadyExist(email.value)) {
    showError.innerHTML = `<sup>*</sup>email already exists`;
    errorToShow.appendChild(showError);
    return;
  }

  if (userAlreadyExist(username.value)) {
    showError.innerHTML = `<sup>*</sup>user already exists`;
    errorToShow.appendChild(showError);
    return;
  }

  if (username.value.length < 6) {
    showError.innerHTML = `<sup>*</sup>your username needs contain atleast 6 characters`;
    errorToShow.appendChild(showError);
    return;
  }
  if (password.value.length < 6) {
    showError.innerHTML = `<sup>*</sup>password need to contain at least 6 characters`;
    errorToShow.appendChild(showError);
    return;
  }
  if (firstName.value.length <= 1 || secondName.value <= 1) {
    showError.innerHTML = `<sup>*</sup>your first name / second name needs contain atleast 2 characters`;
    errorToShow.appendChild(showError);
    return;
  }
  if (age.value < 18 || age.value > 65) {
    showError.innerHTML = `<sup>*</sup>your age needs to be between 18 and 65`;
    errorToShow.appendChild(showError);
    return;
  }
  if (isPasswordValid(password.value, showError, errorToShow)) {
    users.push(usersInfo);
    writeInLS("users", users);
    const loggedInUsers = [];
    loggedInUsers.push(username.value);
    const userLogInTime = [];
    const timeLogIn = Date.now();
    userLogInTime.push(timeLogIn);
    writeInLS("userLogInTime", userLogInTime);
    writeInLS("loggedInUsers", loggedInUsers);
    window.location.assign("./index.html");
  }
});
