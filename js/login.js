import { signIn } from "./../firebase/auth.js"
document.getElementById("submit").addEventListener("click", () => {
    const email_or_phone = document.getElementById("email-or-phone").value;
    const password = document.getElementById("password").value;
    signIn(email_or_phone,password)
  });
  