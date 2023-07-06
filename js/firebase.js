const firebaseConfig = {
  apiKey: "AIzaSyAjqgEfv8WplgfnH36I39mp6ip4H5cYWgQ",
  authDomain: "instyle-b572e.firebaseapp.com",
  projectId: "instyle-b572e",
  storageBucket: "instyle-b572e.appspot.com",
  messagingSenderId: "724474488853",
  appId: "1:724474488853:web:2d99f1868186ff9649061c",
};

firebase.initializeApp(firebaseConfig);

let loginBtn = document.querySelector(".loginProfileBtn");
let logoutBtn = document.querySelector(".logoutBtn");
let greetings = document.querySelector(".greetings");

const nameRegex = /^[a-zA-Z]+\s[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const pwdRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const getUserDetails = () => {
  let user = firebase.auth().currentUser;
  let profile = document.querySelector(".profile");
  loginBtn.classList.add("profile-hide");
  logoutBtn.classList.remove("profile-hide");
  if(user!==null)
   if (user.displayName != null) setUserName(user.displayName);
};

const setUserName = (name) => {
  greetings.textContent = "Hi " + name;
};

// getUserDetails();

document.querySelector(".signupBtn").addEventListener("click", () => {
  let name = document.querySelector(".fullName").value;
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  let confirmPassword = document.querySelector(".confirmPassword").value;
  if (validateSignupForm(name, email, password, confirmPassword)) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        closeModal();
        getUserDetails();
        setUserName(name);
        return user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => {
        showToast(error.message);
      });
  }
});

document.querySelector(".loginBtn").addEventListener("click", () => {
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  if(email!=="" && password!==""){
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      closeModal();
      getUserDetails();
    })
    .catch((error) => {
      showToast(error.message);
    });
  }else{
    showToast("Field cannot be empty");
  }
  
});

document
  .getElementById("google-signin-button")
  .addEventListener("click", () => {
    console.log("clicked");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        closeModal();
        getUserDetails();
      })
      .catch((error) => {
        showToast(error.message);
      });
  });

logoutBtn.addEventListener("click", () => {
  console.log("logout clicked");
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged out");
      logoutBtn.classList.add("profile-hide");
      loginBtn.classList.remove("profile-hide");
      greetings.textContent = "";
    })
    .catch((error) => {
      showToast(error.message);
    });
});

function closeModal() {
  var element = document.querySelector(".btn-close");
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(event);
}

function validateSignupForm(name, mailId, pwd, cnfPwd) {
  if (
    nameRegex.test(name) &&
    emailRegex.test(mailId) &&
    pwdRegex.test(pwd) &&
    pwd === cnfPwd
  ) {
    return true;
  } else if (!nameRegex.test(name))
    showToast("Name should contain a firstName & lastName");
  else if (!emailRegex.test(mailId)) showToast("Not a Valid MailId");
  else if (!pwdRegex.test(pwd))
    showToast(
      "Password: Min. 8 characters and must contain: one upper case letter, one lower case letter, a number and a special character."
    );
  else showToast("Password - Confirm Password Mismatch");
  return false;
}

//toastify
function showToast(text) {
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = text;

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("show");
  }, 10);

  setTimeout(function () {
    toast.classList.remove("show");
    // Remove the toast from the document
    setTimeout(function () {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}
