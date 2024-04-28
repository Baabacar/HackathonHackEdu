// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwH56W-fEQwVi2Qf0frGMq9HZ55npb_vY",
  authDomain: "hackedu-ff8da.firebaseapp.com",
  projectId: "hackedu-ff8da",
  storageBucket: "hackedu-ff8da.appspot.com",
  messagingSenderId: "20863073632",
  appId: "1:20863073632:web:ae6933dfca7618d2267205",
  measurementId: "G-Z5X0G10Y6L",
};


// **Initialize Firebase before using other functions**
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  login() ;
});

var Stmpl = `<div class="flex p-4">
<div class="flex-shrink-0">
  <svg class="flex-shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    fill="currentColor" viewBox="0 0 16 16">
    <path
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z">
    </path>
  </svg>
</div>
<div class="ms-3">
  <p class="text-sm text-white ">
  </p>
</div>
</div>`

var Btmpl = `<div class="flex p-4">
<div class="flex-shrink-0">
  <svg class="flex-shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
  </svg>
</div>
<div class="ms-3">
  <p class="text-sm text-white">
    This is an error message.
  </p>
</div>
</div>`

function signUp() {
  const email = document.getElementById("email_field").value;
  const password = document.getElementById("password_field").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      showToast(Stmpl,"User created successfully!");
      console.log("User created successfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      showToast(Btmpl,error.message);
      console.log(errorCode, errorMessage);
    });
}

function login() {
  const email = document.getElementById("email_field").value;
  const password = document.getElementById("password_field").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      onAuthStateChanged(auth,user)
      const user = userCredential.user;
      
      console.log("User logged in successfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      // L'utilisateur est connecté, redirigez-le vers la page d'accueil
      window.location.replace("http://127.0.0.1:5501/static/templates/choix.html");
    } else {
      // Aucun utilisateur connecté
      console.log("Aucun utilisateur connecté");
    }
  });
function showToast(Tmpl,message) {
    // Clone the template and add it to the container
    const toastTemplate = document.getElementById('toastTemplate'); 
    toastTemplate.innerHTML += Tmpl 
    toastTemplate.style.display = 'block';

    // Set the message
    const toastMessage = toastTemplate.querySelector('.text-white');
    toastMessage.textContent = message;

    // Add the toast to the container
    const toastContainer = document.getElementById('toastContainer');
    toastContainer.appendChild(toastTemplate);

    // Automatically remove the toast after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
        toastContainer.removeChild(toastTemplate);
    }, 3000);
}