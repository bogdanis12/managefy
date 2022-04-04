const registerBtn = document.getElementById("registerBtn");
const logInBtn = document.getElementById("logInBtn");
const usernameLogIn = document.getElementById("usernameLogIn");
const passwordLogIn = document.getElementById("passwordLogIn");
const resetPassword = document.getElementById("resetPassword");
const showError = document.getElementById("errorMessage");
const showErrorMessage = document.createElement("p");

const readFromLS = (key) => {
  const valueInLS = localStorage.getItem(key);
  return JSON.parse(valueInLS);
};

const writeInLS = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

let userLogInTime = readFromLS("userLogInTime") || [];

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign("./register.html");
});
const users = readFromLS("users");
console.log(users);
logInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const validator = readFromLS("users");

  let loggedInUsers = [];

  const check = (element) =>
    usernameLogIn.value === element.userNameInput &&
    passwordLogIn.value === element.passwordInput;

  if (validator.some(check)) {
    console.log(validator.some(check));
    loggedInUsers.push(usernameLogIn.value);
    userLogInTime = [];
    const timeLogIn = Date.now();
    userLogInTime.push(timeLogIn);
    writeInLS("userLogInTime", userLogInTime);
    writeInLS("loggedInUsers", loggedInUsers);
    window.location.assign("./home.html");
  } else {
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
