import {
  correctNavbarShow,
  getUserOut,
  readFromLS,
  writeInLS,
} from "./utils.js";

const userLogInTime = readFromLS("userLogInTime");

const userLoggedIn = readFromLS("loggedInUsers");
console.log(userLoggedIn);
if (userLoggedIn === null) {
  window.location.assign("./login.html");
}
const isUserLoggedIn = userLoggedIn !== null;
if (isUserLoggedIn) {
  getUserOut(userLogInTime);
  correctNavbarShow();

  const getMyShifts = readFromLS("addShifts");
  console.log("myshifts", getMyShifts);
  const getMyShiftName = localStorage.getItem("shiftName");
  console.log("shiftname", getMyShiftName);

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
    clear();
    window.location.assign("./index.html");
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign("./index.html");
  });
}
