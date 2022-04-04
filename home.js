import {
  correctNavbarShow,
  getUserOut,
  readFromLS,
  writeInLS,
} from "./utils.js";

const userLogInTime = readFromLS("userLogInTime");

const userLoggedIn = readFromLS("loggedInUsers");
console.log(userLoggedIn);

const isUserLoggedIn = userLoggedIn !== null;
console.log(isUserLoggedIn);

if (isUserLoggedIn) {
  getUserOut(userLogInTime);
  correctNavbarShow();

  const search = document.getElementById("search");
  const searchDate = document.getElementById("searchDate");
  const startSearch = document.getElementById("startSearch");
  const endSearch = document.getElementById("endSearch");
  const mostProfit = document.getElementById("mostProfit");
  const buttonToShow = document.getElementById("buttonToShow");
  const tableBody = document.getElementById("tableBody");
  const tableHead = document.getElementById("tableHead");
  const searchHero = document.getElementById("searchHero");
  const buttonClick = document.getElementById("buttonClick");
  const notFound = document.getElementById("notFound");
  const getMyShifts = readFromLS("addShifts");
  notFound.style.display = "none";
  const profitPerShift = (shiftStart, shiftEnd, wage) => {
    let result = 0;
    const start = new Date();
    const end = new Date();
    const startTimeFormat = new Date(`${start.toDateString()} ${shiftStart}`);
    const endTimeFormat = new Date(`${end.toDateString()} ${shiftEnd}`);
    result =
      Math.round(
        ((endTimeFormat - startTimeFormat) / 1000 / 3600) * wage * 100
      ) / 100;
    return result;
  };

  const doNotDisplayTable = () => {
    mostProfit.style.display = "none";
    tableHead.classList.add("table-head-dissapear");
    searchHero.classList.add("table-head-dissapear");
  };

  const doNotDisplayNoShiftsCreated = () => {
    buttonToShow.style.display = "none";
  };

  if (getMyShifts === null) {
    doNotDisplayTable();
    buttonClick.addEventListener("click", function () {
      window.location.assign("./add_shifts.html");
    });
  }

  let myShifts = [];
  if (getMyShifts !== null) {
    myShifts = getMyShifts.filter(function (shift) {
      return shift.username === userLoggedIn[0];
    });

    if (myShifts.length === 0) {
      doNotDisplayTable();
    } else {
      doNotDisplayNoShiftsCreated();
    }
    myShifts.forEach((shift) => {
      if (shift.comments === "") {
        shift.comments = "-";
      }
    });
    buttonClick.addEventListener("click", function () {
      window.location.assign("./add_shifts.html");
    });
    writeInLS("userShifts", myShifts);
  }

  // Get all the shifts of the user an create a new Object that contains months and
  // profit per shift
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

  // create a temp Obj dynamically which will contain the month with the best earnings
  const myObj = {};
  myProfitArray.forEach((element) => {
    if (!myObj[element.month]) {
      myObj[element.month] = 0;
    }
    myObj[element.month] += Number(element.profitMonth);
  });
  console.log("myObj: ", myObj);

  // get the values from temp Obj
  const values = Object.values(myObj);
  console.log("values: ", values);
  // calculate the maximum value from the array of values
  const max = values.reduce((accumulator, currentValue) => {
    return Math.max(accumulator, currentValue);
  }, 0);
  console.log("max: ", max);

  const mostProfitShow = document.createElement("p");
  mostProfitShow.classList.add("custom-text");
  // check if our max value is in our temp Obj and display it on the screen
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
      let tableBody = `<tr id="tableClick" class="shiftRow">
      <td>${shiftName}</td>
      <td>${date}</td>
      <td>${start}</td>
      <td>${end}</td>
      <td>${comments}</td>
      <td>$${wagePerHour}</td>
      <td>${workPlace}</td>
      <td>$/h ${profitPerShift(start, end, wagePerHour)}</td>
    </tr>`;
      insertRow += tableBody;
    });
    tableBody.innerHTML = insertRow;
    // click everywhere in the table and go to edit shift saving the shift name which is
    // unique
    const shiftRowElements = document.getElementsByClassName("shiftRow");
    const shiftRows = Array.from(shiftRowElements);
    shiftRows.forEach((shift) => {
      shift.addEventListener("click", function (event) {
        const [target] = this.children;
        const currentShiftName = target.innerText;
        console.log(currentShiftName);
        localStorage.setItem("shiftName", currentShiftName);
        window.location.assign("./edit_shifts.html");
      });
    });
  };

  renderShift(myShifts);

  search.addEventListener("keyup", () => {
    const searchedTerm = search.value;
    const filteredTerm = myShifts.filter((shift) => {
      return shift.shiftName.includes(searchedTerm);
    });
    if (searchedTerm > "0" && filteredTerm.length === 0) {
      notFound.style.display = "unset";
      mostProfit.style.display = "none";
    } else {
      notFound.style.display = "none";
    }
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
}

if (!isUserLoggedIn) {
  window.location.assign("./login.html");
}
