import { app } from "./firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);

document.getElementById("signup")
.addEventListener("click", async () => {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  alert("Account created");
});

document.getElementById("login")
.addEventListener("click", async () => {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  alert("Logged in");
});

document.getElementById("logout")
.addEventListener("click", async () => {

  await signOut(auth);

  alert("Logged out");
});