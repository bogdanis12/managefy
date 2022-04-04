// Getting all the elements that we need
const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const hourlyWage = document.getElementById("hourlyWage");
const shiftName = document.getElementById("shiftName");
const comments = document.getElementById("comments");
const saveBtn = document.getElementById("saveBtn");
const workPlace = document.getElementById("workplace");
const showError = document.getElementById("showError");
const showErrorMessage = document.createElement("p");
showErrorMessage.classList.add("show-error");

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

//Function to clear all the fields
const clear = () => {
  date.value = "";
  startTime.value = "";
  endTime.value = "";
  shiftName.value = "";
  comments.value = "";
  hourlyWage.value = "";
  workPlace.value = "";
};

//Functions for reading from local storage, writing in localstorage and
//removing from local storage
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

//Getting all the shifts that we have, if we don't have we'll get an empty\
//array
const allShifts = readFromLS("addShifts") || [];
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
//Checking if the user is logged in
if (userLoggedIn === null) {
  window.location.assign("./login.html");
}

const userLogInTime = readFromLS("userLogInTime");

const isUserLoggedIn = userLoggedIn !== null;
//If the user is logged in there is the timer set it for 60 minutes
//after 60 minutes the user will be automatically logged out
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

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const myShift = {
    date: date.value,
    start: startTime.value,
    end: endTime.value,
    wagePerHour: hourlyWage.value,
    shiftName: shiftName.value,
    comments: comments.value,
    workPlace: workPlace.value,
    username: userLoggedIn[0],
  };
  const isShiftAlreadyThere = allShifts.some(
    (shift) => myShift.shiftName === shift.shiftName
  );

  const isStartGreaterThanEnd = startTime.value < endTime.value;
  console.log(isShiftAlreadyThere);
  if (!isStartGreaterThanEnd) {
    showErrorMessage.innerHTML = `<sup>*</sup>start time can not be greater than end time`;
    showError.appendChild(showErrorMessage);
    return;
  }
  if (!isShiftAlreadyThere && isStartGreaterThanEnd) {
    allShifts.push(myShift);
    writeInLS("addShifts", allShifts);
    clear();
  }
});
