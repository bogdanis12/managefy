// const readFromLS = (key) => {
//   const valueInLS = localStorage.getItem(key);
//   return JSON.parse(valueInLS);
// };

// const writeInLS = (key, value) => {
//   const stringifiedValue = JSON.stringify(value);
//   localStorage.setItem(key, stringifiedValue);
// };

// const removeFromLS = (key) => {
//   localStorage.removeItem(key);
// };

// const userLogInTime = readFromLS("userLogInTime");

// const userLoggedIn = readFromLS("loggedInUsers");
// console.log(userLoggedIn);

// const isUserLoggedIn = userLoggedIn !== null;
// if (isUserLoggedIn) {
//   setInterval(function () {
//     const check = (Date.now() - userLogInTime) / 1000 >= 3600;
//     console.log(check);
//     if (check) {
//       removeFromLS("loggedInUsers");
//       removeFromLS("userLogInTime");
//       window.location.assign("./login.html");
//     }
//   }, 1000);
// }
