let darkMode = localStorage.getItem("darkMode");
const chk = document.getElementById("chk");
const mainC = document.getElementById("mainC");
const welcomeIdDark = document.getElementById("welcomeIdDark");
const usernameLabelDark = document.getElementById("usernameLabelDark");
const passwordLabelDark = document.getElementById("passwordLabelDark");
const usernameLogIn = document.getElementById("usernameLogIn");
const passwordLogIn = document.getElementById("passwordLogIn");

const enableDarkMode = () => {
  mainC.classList.toggle("dark");
  welcomeIdDark.classList.toggle("dark-text");
  usernameLabelDark.classList.toggle("label-dark");
  passwordLabelDark.classList.toggle("label-dark");
  usernameLogIn.classList.toggle("input-white");
  passwordLogIn.classList.toggle("input-white");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  mainC.classList.remove("dark");
  welcomeIdDark.classList.remove("dark-text");
  usernameLabelDark.classList.remove("label-dark");
  passwordLabelDark.classList.remove("label-dark");
  usernameLogIn.classList.remove("input-white");
  passwordLogIn.classList.remove("input-white");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

chk.addEventListener("click", (event) => {
  console.log(event);
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
