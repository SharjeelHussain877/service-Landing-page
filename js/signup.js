import {checkAuth} from "./../firebase/auth.js"

document.getElementById("submit").addEventListener("click", () => {
  const first_name = document.getElementById("first-name").value;
  const last_name = document.getElementById("last-name").value;
  const birthday = document.getElementById("BD").value;
  const gender = document.getElementById("gender").value;
  const streetAddress = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const nearFamousPlace = document.getElementById("famous-place").value;
  const email = document.getElementById("email").value;
  const contact_num = document.getElementById("contact-num").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  checkAuth(first_name,
    last_name,
    birthday,
    gender,
    streetAddress,
    country,
    city,
    nearFamousPlace,
    contact_num,
    email,
    password)
});


