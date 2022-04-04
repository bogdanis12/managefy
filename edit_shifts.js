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

const userLogInTime = readFromLS("userLogInTime");

const userLoggedIn = readFromLS("loggedInUsers");
console.log(userLoggedIn);
if (userLoggedIn === null) {
  alert("You must be logged in to access this page");
  window.location.assign("./login.html");
}

const isUserLoggedIn = userLoggedIn !== null;
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
const mostProfit = document.getElementById("mostProfit");

logOut.hidden = true;
logIn.hidden = false;
register.hidden = false;
addShift.hidden = true;

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

const getMyShifts = readFromLS("addShifts");
console.log(getMyShifts);
const getMyShiftName = localStorage.getItem("shiftName");
console.log(getMyShiftName);

let editDate = document.getElementById("date");
let editStartTime = document.getElementById("startTime");
let editEndTime = document.getElementById("endTime");
let editHourlyWage = document.getElementById("hourlyWage");
let editShiftName = document.getElementById("shiftName");
let editComments = document.getElementById("comments");
let editSaveBtn = document.getElementById("saveBtn");
let editWorkPlace = document.getElementById("workplace");
const cancelBtn = document.getElementById("cancelBtn");

getMyShifts.forEach((shift) => {
  const {
    date,
    start,
    end,
    wagePerHour,
    shiftName,
    comments,
    workPlace,
  } = shift;
  if (getMyShiftName == shiftName) {
    editDate.value = date;
    editStartTime.value = start;
    editEndTime.value = end;
    editShiftName.value = shiftName;
    editComments.value = comments;
    editHourlyWage.value = wagePerHour;
    editWorkPlace.value = workPlace;
  }
});

const objIndex = getMyShifts.findIndex(
  (shift) => shift.shiftName == getMyShiftName
);

const clear = () => {
  editDate.value = "";
  editStartTime.value = "";
  editEndTime.value = "";
  editShiftName.value = "";
  editComments.value = "";
  editHourlyWage.value = "";
  editWorkPlace.value = "";
};

editSaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getMyShifts[objIndex].date = editDate.value;
  getMyShifts[objIndex].start = editStartTime.value;
  getMyShifts[objIndex].wagePerHour = editHourlyWage.value;
  getMyShifts[objIndex].shiftName = editShiftName.value;
  getMyShifts[objIndex].comments = editComments.value;
  getMyShifts[objIndex].end = editEndTime.value;
  getMyShifts[objIndex].workPlace = editWorkPlace.value;
  writeInLS("addShifts", getMyShifts);
  alert("You succesfuly edited the shift");
  clear();
  window.location.assign("./home.html");
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign("./home.html");
});
