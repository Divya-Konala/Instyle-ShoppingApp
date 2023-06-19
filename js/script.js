let login=document.querySelector(".login");
let signup=document.querySelector(".signup");
let loginOrSignUp=document.querySelector(".loginOrSignUp");
let loginBtn=document.querySelector(".loginBtn");
let signupBtn=document.querySelector(".signupBtn");
let modalTitle=document.querySelector(".modal-title");

login.addEventListener("click",()=>{
    login.classList.add("active");
    signup.classList.remove("active");
    loginBtn.classList.remove("hide");
    signupBtn.classList.add("hide");
    loginOrSignUp.innerHTML=`<input type="email" placeholder="email" class="email"/>
    <input type="password" placeholder="password" class="password"/>`;
    modalTitle.innerText="Login Here";
})

signup.addEventListener("click",()=>{
    console.log("signup clicked");
    signup.classList.add("active");
    login.classList.remove("active");
    signupBtn.classList.remove("hide");
    loginBtn.classList.add("hide");
    loginOrSignUp.innerHTML=`<input type="text" placeholder="full name" class="fullName"/> <input type="email" placeholder="email" class="email"/>
    <input type="password" placeholder="password" class="password"/> <input type="password" placeholder="confirm password" class="confirmPassword"/>
    <p></p>
    `
    modalTitle.innerText="Signup Here";
})

document.querySelector(".reset").addEventListener("click",()=>{
    let inputs=document.querySelectorAll("input");
    for(let i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
})

