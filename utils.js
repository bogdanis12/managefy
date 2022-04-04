// function to read from localstorage
const readFromLS = (key) => {
  const valueInLS = localStorage.getItem(key);
  return JSON.parse(valueInLS);
};

// function to write in localstorage
const writeInLS = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

// function to remove from localstorage
const removeFromLS = (key) => {
  localStorage.removeItem(key);
};

// function to check if the password is matching the pattern choosen
function isPasswordValid(password, errorShowed, errorDiv) {
  const lowerCaseChars = /[a-z]/;
  const upperCaseChars = /[A-Z]/;
  const specialChars = /\W/;
  const numberChars = /\d/;
  if (!lowerCaseChars.test(password)) {
    errorShowed.innerHTML = `<sup>*</sup>you need at least one lower case in your password`;
    errorDiv.appendChild(errorShowed);
    return;
  }

  if (!upperCaseChars.test(password)) {
    errorShowed.innerHTML = `<sup>*</sup>you need at least one upper case in your password`;
    errorDiv.appendChild(errorShowed);
    return;
  }

  if (!specialChars.test(password)) {
    errorShowed.innerHTML = `<sup>*</sup> you need at least one special character in your password`;
    errorDiv.appendChild(errorShowed);
    return;
  }

  if (!numberChars.test(password)) {
    errorShowed.innerHTML = `<sup>*</sup>you need at least one number in your password`;
    errorDiv.appendChild(errorShowed);
    return;
  }

  return `Your ${password} meets all the criteria`;
}

// function to get the user out after one hour
const getUserOut = (timeLogIn) => {
  setInterval(function () {
    const check = (Date.now() - timeLogIn) / 1000 >= 3600;
    console.log(check);
    if (check) {
      removeFromLS("loggedInUsers");
      removeFromLS("userLogInTime");
      window.location.assign("./login.html");
    }
  }, 1000);
};

// function to clear the inputs
const clear = () => {
  email.value = "";
  username.value = "";
  password.value = "";
  firstName.value = "";
  secondName.value = "";
  age.value = "";
};

// function to show the navbar correct
//display elements from navbar when user is loggedIn
const correctNavbarShow = () => {
  const userLoggedIn = readFromLS("loggedInUsers");
  console.log(userLoggedIn);
  const welcome = document.createElement("span");
  const navbar = document.getElementById("navbar");
  const logOut = document.getElementById("logOut");
  const logIn = document.getElementById("logIn");
  const register = document.getElementById("register");
  const addShift = document.getElementById("addShift");
  const isUserLoggedIn = userLoggedIn !== null;
  logOut.hidden = true;
  logIn.hidden = false;
  register.hidden = false;
  addShift.hidden = true;

  if (isUserLoggedIn) {
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
};

export {
  isPasswordValid,
  writeInLS,
  readFromLS,
  removeFromLS,
  getUserOut,
  clear,
  correctNavbarShow,
};
