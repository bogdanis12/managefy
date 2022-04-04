import { readFromLS, removeFromLS } from "../JavaScript Project copy/utils.js";

const userLogInTime = readFromLS("userLogInTime");

const userLoggedIn = readFromLS("loggedInUsers");
console.log(userLoggedIn);

const isUserLoggedIn = userLoggedIn !== null;
console.log(isUserLoggedIn);

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

if (isUserLoggedIn) {
  getUserOut(userLogInTime);
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

if (userLoggedIn === null) {
  window.location.assign("./login.html");
}

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

const tableContent = document.getElementById("tableContent");
const tableBody = document.getElementById("tableBody");
const getMyShifts = JSON.parse(localStorage.getItem("addShifts"));
const shiftRowElements = document.getElementsByClassName("shiftRow");

const profitPerShift = (shiftStart, shiftEnd, wage) => {
  let result = 0;
  const startTimeFormat = new Date(`1 ${shiftStart}`);
  const endTimeFormat = new Date(`1 ${shiftEnd}`);
  result =
    Math.round(((endTimeFormat - startTimeFormat) / 1000 / 3600) * wage * 100) /
    100;
  return result;
};

const myShifts = getMyShifts.filter(function (shift) {
  return shift.username === userLoggedIn[0];
});

let myProfitArray = [];
myShifts.forEach((shift) => {
  const month = new Date(shift.date).toLocaleString("default", {
    month: "long",
  });
  const myProfitObj = {
    month: month,
    profitMonth: Number(
      profitPerShift(shift.start, shift.end, shift.wagePerHour)
    ),
  };
  myProfitArray.push(myProfitObj);
});
console.log("myProfitArray: ", myProfitArray);

const myObj = {};
myProfitArray.forEach((element) => {
  if (!myObj[element.month]) {
    myObj[element.month] = 0;
  }
  myObj[element.month] += Number(element.profitMonth);
});
console.log("myObj: ", myObj);
const values = Object.values(myObj);
console.log("values: ", values);
const max = values.reduce((accumulator, currentValue) => {
  return Math.max(accumulator, currentValue);
}, 0);
console.log("max: ", max);

const mostProfitShow = document.createElement("p");
mostProfitShow.classList.add("custom-text");

if (myShifts.length === 0) {
  mostProfit.classList.add("visible");
}

for (const [key, value] of Object.entries(myObj)) {
  if (max === value) {
    mostProfitShow.innerText = `Your most profitable month is ${key} with ${max}$`;
    mostProfit.appendChild(mostProfitShow);
    console.log(`Your most profitable month is ${key} with ${max}$`);
    break;
  }
}

const renderShift = (shifts) => {
  let insertRow = "";
  shifts.forEach((shift) => {
    const {
      date,
      start,
      end,
      wagePerHour,
      shiftName,
      comments,
      workPlace,
    } = shift;
    let tableBody = `<tr class="shiftRow">
      <td>${shiftName}</td>
      <td>${date}</td>
      <td>${start}</td>
      <td>${end}</td>
      <td>${comments}</td>
      <td>${wagePerHour}</td>
      <td>${workPlace}</td>
      <td>$/h ${profitPerShift(start, end, wagePerHour)}</td>
    </tr>`;
    insertRow += tableBody;
  });
  tableBody.innerHTML = insertRow;
};

console.log(myShifts);
renderShift(myShifts);

const shiftRows = Array.from(shiftRowElements);
shiftRows.forEach((shift) => {
  shift.addEventListener("click", function (event) {
    const [target] = this.children;
    const currentShiftName = target.innerText;
    localStorage.setItem("shiftName", currentShiftName);
    window.location.assign("./edit_shifts.html");
  });
});

search.addEventListener("keyup", () => {
  const searchedTerm = search.value;
  const filteredTerm = myShifts.filter((shift) => {
    return shift.shiftName.includes(searchedTerm);
  });
  renderShift(filteredTerm);
});

searchDate.addEventListener("click", (e) => {
  e.preventDefault();
  const startSearchedDate = new Date(startSearch.value);
  const endSearchedDate = new Date(endSearch.value);
  let shiftToRender = [];
  getMyShifts.forEach((shift) => {
    const dateFormat = new Date(shift.date);
    const start = startSearchedDate.getTime();
    const end = endSearchedDate.getTime();
    const dataBaseTime = dateFormat.getTime();
    const result = dataBaseTime >= start && dataBaseTime <= end;
    if (result) {
      shiftToRender.push(shift);
    }
  });
  if (shiftToRender.length === 0) {
    renderShift(myShifts);
    return;
  }
  console.log("shiftToRender", shiftToRender);
  renderShift(shiftToRender);
});
