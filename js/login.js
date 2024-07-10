window.onload = init ;
let userData = {
    name: "",
    mail: "",
    pwd: "",
    favoriteMemory: "veggies",
    favoriteSize: 12
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
    let userInput = e.target ;
    console.log(userInput) ;

    switch (userInput.id) {
        case "name":
            if(userInput.value.length >= 3){
                validInput(userInput.id)
            }
            else{
                invalidInput(userInput.id)
            }
            break;
        case "mail":
            const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(MAILREGEX.test(userInput.value)){
                validInput(userInput.id)
            }
            else{
                invalidInput(userInput.id)
            }
            break;
        case "pwd":
            passwordToVerify = userInput.value ;

            const MINUSCULE = /[a-z]/ ;
            const MAJUSCULE = /[A-Z]/ ;
            const CHIFFRE = /[0-9]/ ;
            const CARACSPE = /[@#$%^&+=!(){}\[\]:;<>,.?\/\\\-_]/ ;

        if (
            CARACSPE.test(passwordToVerify) &&
            MINUSCULE.test(passwordToVerify) && 
            MAJUSCULE.test(passwordToVerify) &&
            CHIFFRE.test(passwordToVerify) &&
            passwordToVerify.length > 5
    ){
        console.log("j'ai validé ta condition") ; 
        validInput(userInput.id) ;
        }
        else {
            invalidInput(userInput.id)
        }
        break;
            
        case "confirmPassword":
            let psw = document.getElementById("pwd") ;
            if(psw.value === userInput.value){
                validInput(userInput.id)
            }
            else{
                invalidInput(userInput.id)
            }
            break;
        default:
            break;
    }
    // if(userLoginInput.value === "") {
    //     userLoginInput.classList.remove("is-valid") ;
    //     userLoginInput.classList.remove("is-invalid") ;
    //     isValid = false ;
    // }

    // else if (e.target.id === "confirmPassword") {
    //     if (psw.value != confirmPassword.value){
    //         confirmPassword.classList.remove("is-valid") ;
    //         confirmPassword.classList.add("is-invalid") ;
    //         isValid = false ;
    //     }
    //     else {
    //         confirmPassword.classList.add("is-valid") ;
    //         confirmPassword.classList.remove("is-invalid") ;
    //         isValid = true ;
    //     }
    // }

    // else if (userLoginInput.value !== "" && userLoginInput.checkValidity()){

    //     userLoginInput.classList.add("is-valid") ;
    //     userLoginInput.classList.remove("is-invalid") ;
    //     isValid = true ;
    // }
    // else {
    //     console.log("hello") ;
    //         userLoginInput.classList.remove("is-valid") ;
    //         userLoginInput.classList.add("is-invalid") ;
    //         isValid = false ;
    //     }
}
function validInput(id) {
    let element = document.getElementById(id) ;
    element.classList.add("is-valid") ;
    element.classList.remove("is-invalid") ;
    return true ;
}

function invalidInput(id) {
    let element = document.getElementById(id) ;
            element.classList.remove("is-valid") ;
            element.classList.add("is-invalid") ;
            return false ;
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

function saveUser(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
}