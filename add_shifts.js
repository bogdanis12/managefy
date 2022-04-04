import {
  correctNavbarShow,
  getUserOut,
  readFromLS,
  writeInLS,
} from "./utils.js";

const userLoggedIn = readFromLS("loggedInUsers");
if (userLoggedIn !== null) {
  correctNavbarShow();
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

  const userShifts = readFromLS("userShifts") || [];

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

  //Getting all the shifts that we have, if we don't have we'll get an empty\
  //array
  const allShifts = readFromLS("addShifts") || [];

  //Checking if the user is logged in

  const userLogInTime = readFromLS("userLogInTime");

  const isUserLoggedIn = userLoggedIn !== null;
  //If the user is logged in there is the timer set it for 60 minutes
  //after 60 minutes the user will be automatically logged out
  if (isUserLoggedIn) {
    getUserOut(userLogInTime);
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

    const isShiftAlreadyThere = userShifts.some(
      (shift) => myShift.shiftName === shift.shiftName
    );

    const isStartGreaterThanEnd = startTime.value < endTime.value;
    console.log(isShiftAlreadyThere);
    if (!isStartGreaterThanEnd) {
      showErrorMessage.innerHTML = `<sup>*</sup>start time can not be greater than end time`;
      showError.appendChild(showErrorMessage);
      return;
    }
    if (isShiftAlreadyThere) {
      showErrorMessage.innerHTML = `<sup>*</sup>this shift already exist`;
      showError.appendChild(showErrorMessage);
      return;
    }
    if (!isShiftAlreadyThere && isStartGreaterThanEnd) {
      if (hourlyWage.value === "") {
        showErrorMessage.innerHTML = `<sup>*</sup>you need to add your hourly wage`;
        showError.appendChild(showErrorMessage);
        return;
      }
      allShifts.push(myShift);
      userShifts.push(myShift);
      writeInLS("addShifts", allShifts);
      writeInLS("userShifts", userShifts);
      clear();
      document.location.assign("./index.html");
    }
  });
}

if (userLoggedIn === null) {
  window.location.assign("./login.html");
}
