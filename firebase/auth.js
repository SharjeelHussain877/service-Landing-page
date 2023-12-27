import { app } from "./firebase.config.js";
import { saveDataAfterAuth } from "./firestore.js";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const db = getFirestore(app);

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
        saveDataAfterAuth(
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
    const q = query(collection(db, "users"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        let log = true;
        if (log && location.pathname !== "/dashboard.html") {
          location.href = "dashboard.html";
          log = false;
        }
      });
    });
  } else {
    if (location.pathname !== "/login.html" && location.pathname !== "/signup.html") {
      // Redirect to login or signup page if not already there
      location.href = "../login.html";
      // or location.href = "../signup.html";
    }
  }
});

// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "usa"), {
  name: "UJirRrvKzBeTFYJkqCsvr2rD8b92",
  state: "CA",
  country: "USA",
});

export { checkAuth, signIn };
