import { app } from "./firebase.config.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const db = getFirestore(app);

async function saveDataAfterAuth(
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



export { saveDataAfterAuth };
