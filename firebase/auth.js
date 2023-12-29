import { app } from "./firebase.config.js";
import { saveData, getCurrentUserData } from "./firestore.js";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const auth = getAuth(app);

// sign up with authentication
function checkAuth(
  name1,
  name2,
  birthday,
  gender,
  address,
  country,
  city,
  nearFamousPlace,
  contact_num,
  email,
  password
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      if (userCredential) {
        saveData(
          user.uid,
          name1,
          name2,
          birthday,
          gender,
          address,
          country,
          city,
          nearFamousPlace,
          contact_num,
          email,
          password
        );
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

// login with authentication

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
document.getElementById("logout")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      location.href = "login.html";
    })
    .catch((error) => {
      // An error happened.
    });
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    getCurrentUserData(user.uid)
      .then((success) => console.log("success", success))
      .catch((err) => console.log("error", err));
  } else {
    // sign out
  }
});

export { checkAuth, signIn  };
