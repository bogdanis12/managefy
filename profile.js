const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const age = document.getElementById("age");
const registerBtn = document.getElementById("registerBtn");
const editBtn = document.getElementById("editBtn");
const errorToShow = document.getElementById("showError");
const showError = document.createElement("p");
showError.classList.add("show-error");

const welcome = document.createElement("span");
const navbar = document.getElementById("navbar");
const logOut = document.getElementById("logOut");
const logIn = document.getElementById("logIn");
const register = document.getElementById("register");
const addShift = document.getElementById("addShift");
const search = document.getElementById("search");
const searchDate = document.getElementById("searchDate");
const startSearch = document.getElementById("startSearch");
const endSearch = document.getElementById("endSearch");
logOut.hidden = true;
logIn.hidden = false;
register.hidden = false;
addShift.hidden = true;

const readFromLS = (key) => {
  const valueInLS = localStorage.getItem(key);
  return JSON.parse(valueInLS);
};

const writeInLS = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

const removeFromLS = (key) => {
  localStorage.removeItem(key);
};

const users = readFromLS("users") || [];

const userLoggedIn = readFromLS("loggedInUsers");
if (userLoggedIn !== null) {
  logOut.hidden = false;
  logIn.hidden = true;
  register.hidden = true;
  addShift.hidden = false;
  welcome.innerHTML = `Welcome <b>${userLoggedIn}</b>`;
  welcome.classList.add("welcome-user");
  navbar.appendChild(welcome);
  welcome.addEventListener("click", () => {
    window.location.assign("./profile.html");
  });
  logOut.addEventListener("click", (event) => {
    localStorage.removeItem("loggedInUsers");
    window.location.assign("./login.html");
  });
}

const emailAlreadyExist = (userEntry) =>
  users.filter((user) => user.emailInput === userEntry).length === 1;

const userAlreadyExist = (userEntry) =>
  users.filter((user) => user.userNameInput === userEntry).length === 1;

const objIndex = users.findIndex((user) => user.userNameInput == userLoggedIn);
console.log(objIndex);

// Check if the user is logged in
const isUserLoggedIn = userLoggedIn !== null;
console.log(isUserLoggedIn);

const userLogInTime = readFromLS("userLogInTime");

if (isUserLoggedIn) {
  setInterval(function () {
    const check = (Date.now() - userLogInTime) / 1000 >= 3600;
    console.log(check);
    if (check) {
      removeFromLS("loggedInUsers");
      removeFromLS("userLogInTime");
      window.location.assign("./login.html");
    }
  }, 1000);
}

// Clear the fields
const clear = () => {
  email.value = "";
  username.value = "";
  password.value = "";
  firstName.value = "";
  secondName.value = "";
  age.value = "";
};

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
    password.value = passwordInput;
    firstName.value = firstNameInput;
    secondName.value = secondNameInput;
    age.value = ageInput;
  }
});
let emailCondition = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const lowerCaseChars = /[a-z]/;
const upperCaseChars = /[A-Z]/;
const specialChars = /\W/;
const numberChars = /\d/;
// function isPasswordValid(password) {
//   if (!lowerCaseChars.test(password)) {
//     showError.innerText = `<sup>*</sup>you need atleast one lower case in your password`;
//     errorToShow.appendChild(showError);
//     return;
//   }

//   if (!upperCaseChars.test(password)) {
//     showError.innerText = `<sup>*</sup>you need atleast one upper case in your password`;
//     errorToShow.appendChild(showError);
//     return;
//   }

//   if (!specialChars.test(password)) {
//     showError.innerText = `<sup>*</sup>you need atleast one special character in your password`;
//     errorToShow.appendChild(showError);
//     return;
//   }

//   if (!numberChars.test(password)) {
//     showError.innerText = `<sup>*</sup>you need atleast one number in your password`;
//     errorToShow.appendChild(showError);
//     return;
//   }

//   return `Your ${password} meets all the criteria`;
// }
if (!isUserLoggedIn) {
  window.location.assign("./home.html");
}

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!emailCondition.test(email.value)) {
    console.log(emailCondition.test(email.value));
    showError.innerText = `<sup>*</sup>not a valid format for email`;
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
  if (isPasswordValid(password.value) && isUserLoggedIn) {
    users.forEach((user) => {
      users[objIndex].emailInput = email.value;
      users[objIndex].userNameInput = username.value;
      users[objIndex].passwordInput = password.value;
      users[objIndex].firstNameInput = firstName.value;
      users[objIndex].secondNameInput = secondName.value;
      users[objIndex].ageInput = age.value;
      writeInLS("users", users);
    });
    clear();

    window.location.assign("./home.html");
  }
});

cancelBtn.addEventListener("click", () => {
  clear();
  window.location.assign("./home.html");
});
