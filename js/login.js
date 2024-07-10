window.onload = init ;
let userData = {
    name: "",
    mail: "",
    pwd: ""
};


function init(){
    let userLogin = document.getElementById("name") ;
    userLogin.addEventListener("input", verifyValidity) ;

    let userMail = document.getElementById("mail") ;
    userMail.addEventListener("input", verifyValidity) ;

    let userPwd = document.getElementById("pwd") ;
    userPwd.addEventListener("input", verifyValidity) ;

    let userConfirmPassword = document.getElementById("confirmPassword") ;
    userConfirmPassword.addEventListener("input", verifyValidity) ;

    let btnInscription = document.getElementById("btnInscription") ;
    btnInscription.addEventListener("click", createAccount) ;
}

var isValid = false ;
function verifyValidity(e){
    let userLoginInput = e.target ;
    let psw = document.getElementById("pwd") ;
    let confirmPassword = document.getElementById("confirmPassword") ;

    if(userLoginInput.value === "") {
        userLoginInput.classList.remove("is-valid") ;
        userLoginInput.classList.remove("is-invalid") ;
        isValid = false ;
    }

    else if (e.target.id === "confirmPassword") {
        console.log(psw.value === confirmPassword.value)
        if (psw.value != confirmPassword.value){
            confirmPassword.classList.remove("is-valid") ;
            confirmPassword.classList.add("is-invalid") ;
            isValid = false ;
        }
        else {
            confirmPassword.classList.add("is-valid") ;
            confirmPassword.classList.remove("is-invalid") ;
            isValid = true ;
        }
    }

    else if (userLoginInput.value !== "" && userLoginInput.checkValidity()){
        userLoginInput.classList.add("is-valid") ;
        userLoginInput.classList.remove("is-invalid") ;
        isValid = true ;
    }
    else {
        userLoginInput.classList.remove("is-valid") ;
        userLoginInput.classList.add("is-invalid") ;
        isValid = false ;
    }

}

function changeLogin(){
    let userLoginInput = document.getElementById("name").value ;
    return (userLoginInput)
}

function changeMail(){
    let userLoginInput = document.getElementById("mail").value ;
    return (userLoginInput)
}

function changePwd(){
    let userLoginInput = document.getElementById("pwd").value ;
    return (userLoginInput)
}
function confirmPassword(){
    let userLoginInput = document.getElementById("confirmPassword").value ;
    return (userLoginInput)
}

function createAccount(e){
    e.preventDefault() ;
    if (document.getElementById("notification")){
        document.getElementById("notification").remove() ;
    }
    let btnInscription = document.getElementById("btnInscription") ;

    const NEWDIV = document.createElement("div") ;
    NEWDIV.setAttribute("id", "notification") ;
    const NEW_P = document.createElement("p") ;
    
    btnInscription.insertAdjacentElement('afterend', NEWDIV)
    
    if (isValid) {
        userData = {
            name: changeLogin(),
            mail: changeMail(),
            pwd: confirmPassword()
        };
        const newContent = document.createTextNode(`Bienvenue ${userData.name}, have fun !`);
        NEW_P.appendChild(newContent)
        saveUser(userData)

    }
    else {
        const newContent = document.createTextNode(`Merci de remplir correctement le formulaire`);
        NEW_P.appendChild(newContent)
    }

    NEWDIV.appendChild(NEW_P) ;
    btnInscription.insertAdjacentElement('afterend', NEWDIV);
}

Azerty123