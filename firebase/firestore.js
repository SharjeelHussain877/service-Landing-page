import { app } from "./firebase.config.js";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const db = getFirestore(app);

async function saveData(
  userId,
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
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userId,
      first_name: name1,
      last_name: name2,
      birthday,
      gender,
      address,
      country,
      city,
      near_amous_lace: nearFamousPlace,
      contact_num,
      email,
      password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getCurrentUserData = async (userUid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(collection(db, "users"), where("userId", "==", userUid));
      const querySnapshot = await getDocs(q);
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
        userData[0].id = doc.id;
      });
      userData.join(", ");
      resolve(userData[0]);
    } catch (error) {
      reject(error);
    }
  });
};

export { saveData, getCurrentUserData };
