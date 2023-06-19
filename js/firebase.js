const firebaseConfig = {
  apiKey: "AIzaSyAjqgEfv8WplgfnH36I39mp6ip4H5cYWgQ",
  authDomain: "instyle-b572e.firebaseapp.com",
  projectId: "instyle-b572e",
  storageBucket: "instyle-b572e.appspot.com",
  messagingSenderId: "724474488853",
  appId: "1:724474488853:web:2d99f1868186ff9649061c",
};

firebase.initializeApp(firebaseConfig);

let loginBtn=document.querySelector(".loginProfileBtn");
let logoutBtn=document.querySelector(".logoutBtn");

const getUserDetails = () => {
  let user = firebase.auth().currentUser;
  let profile = document.querySelector(".profile");
  if (user) {
    loginBtn.classList.add("profile-hide");
    logoutBtn.classList.remove("profile-hide");
  } else {
    logoutBtn.classList.add("profile-hide");
    loginBtn.classList.remove("profile-hide");
  }
};

// getUserDetails();

document.querySelector(".signupBtn").addEventListener("click", () => {
  let name = document.querySelector(".fullName").value;
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  let confirmPassword = document.querySelector(".confirmPassword").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      const user = userCredential.user;
      return user.updateProfile({
        displayName: name,
      });
      closeModal();
      getUserDetails();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

document.querySelector(".loginBtn").addEventListener("click", () => {
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      closeModal();
      getUserDetails();
    })
    .catch((error) => {
      console.log(error.message);
    });
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
        //   toast.success("google login successful!", {
        //     position: "top-right",
        //     theme: "dark",
        //   });
        console.log(result);
        closeModal();
        getUserDetails();
      })
      .catch((error) => {
        //   toast.error(ErrorMapping[error.code] || error.message, {
        //     position: "top-right",
        //     theme: "dark",
        //   });
        console.log(error.message);
      });
  });

  logoutBtn.addEventListener("click",()=>{
    console.log("logout clicked");
    firebase.auth().signOut()
      .then(() => {
        console.log("logged out");
        getUserDetails();
      })
      .catch((error) => {
        toast.success("unable to logout", {
          position: "top-right",
          theme: "dark",
        });
      });
  })

function closeModal() {
  var element = document.querySelector(".btn-close");
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(event);
}
