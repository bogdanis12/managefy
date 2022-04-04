const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const age = document.getElementById("age");
const form = document.querySelector("form");
const registerBtn = document.getElementById("registerBtn");
const errorToShow = document.getElementById("error");
const showError = document.createElement("p");
showError.classList.add("show-error");

const readFromLS = (key) => {
  const valueInLS = localStorage.getItem(key);
  return JSON.parse(valueInLS);
};

const writeInLS = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

const users = readFromLS("users") || [];

const emailAlreadyExist = (userEntry) =>
  users.filter((user) => user.emailInput === userEntry).length === 1;

const userAlreadyExist = (userEntry) =>
  users.filter((user) => user.userNameInput === userEntry).length === 1;

const lowerCaseChars = /[a-z]/;
const upperCaseChars = /[A-Z]/;
const specialChars = /\W/;
const numberChars = /\d/;

function isPasswordValid(password) {
  if (!lowerCaseChars.test(password)) {
    showError.innerText = `<sup>*</sup>You need atleast one lower case in your password`;
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
let emailCondition = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const usersInfo = {
    emailInput: email.value,
    userNameInput: username.value,
    passwordInput: password.value,
    firstNameInput: firstName.value,
    secondNameInput: secondName.value,
    ageInput: age.value,
  };
  if (!emailCondition.test(email.value)) {
    console.log(emailCondition.test(email.value));
    showError.innerText = `<sup>*</sup>not a valid format for email`;
    errorToShow.appendChild(showError);
    return;
  }

  if (emailAlreadyExist(email.value)) {
    showError.innerText = `<sup>*</sup>email already exists`;
    errorToShow.appendChild(showError);
    return;
  }

  if (userAlreadyExist(username.value)) {
    showError.innerText = `<sup>*</sup>user already exists`;
    errorToShow.appendChild(showError);
    return;
  }

  if (username.value.length < 6) {
    showError.innerText = `<sup>*</sup>your username needs contain atleast 6 characters`;
    errorToShow.appendChild(showError);
    return;
  }
  if (password.value.length < 6) {
    showError.innerText = `<sup>*</sup>password need to contain at least 6 characters`;
    errorToShow.appendChild(showError);
    return;
  }
  if (firstName.value.length <= 1 || secondName.value <= 1) {
    showError.innerText = `<sup>*</sup>your first name / second name needs contain atleast 2 characters`;
    errorToShow.appendChild(showError);
    return;
  }
  if (age.value < 18 || age.value > 65) {
    showError.innerText = `<sup>*</sup>your age needs to be between 18 and 65`;
    errorToShow.appendChild(showError);
    return;
  }
  if (
    username.value.length >= 6 &&
    password.value.length >= 6 &&
    firstName.value.length > 1 &&
    secondName.value.length > 1 &&
    isPasswordValid(password.value)
  ) {
    users.push(usersInfo);
    writeInLS("users", users);
    const loggedInUsers = [];
    loggedInUsers.push(username.value);
    const userLogInTime = [];
    const timeLogIn = Date.now();
    userLogInTime.push(timeLogIn);
    writeInLS("userLogInTime", userLogInTime);
    writeInLS("loggedInUsers", loggedInUsers);
    window.location.assign("./home.html");
  }
});
