window.onload = init ;

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
let userData = {
    name: "",
    mail: "",
    pwd: "",
    favoriteMemory: "veggies",
    favoriteSize: 12
};

var usersJSON = localStorage.getItem("users");
var users = JSON.parse(usersJSON) ;

function verifyValidity(e){
    let userInput = e.target ;

    switch (userInput.id) {
        case "name":
            if(userInput.value.length >= 3 
            ){
                validInput(userInput.id);
            }
            else{
                invalidInput(userInput.id)
            }
            break;
            case "mail": 
                const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if(MAILREGEX.test(userInput.value) 
            ){
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
}
function validInput(id) {
    let element = document.getElementById(id) ;
    element.classList.add("is-valid") ;
    element.classList.remove("is-invalid") ;
    userData[id] = element.value ;
    
    return true ;
}

function invalidInput(id) {
    let element = document.getElementById(id) ;
    element.classList.remove("is-valid") ;
    element.classList.add("is-invalid") ;
    userData[id] = "" ;
            return false ;
}

function createAccount(e){
    e.preventDefault() ;
    if (document.getElementById("notification")){
        document.getElementById("notification").remove() ;
    }

    let btnInscription = e.target ;

    const NEWDIV = document.createElement("div") ;
    NEWDIV.setAttribute("id", "notification") ;
    const NEW_P = document.createElement("p") ;

    let msgInvalid = document.getElementById("feedbackUsermail") ;

    if (checkIfUsed("name", userData.name) ){
        msgInvalid.innerText = "Nom d'utilisateur déjà pris" ;
    }
    else if (checkIfUsed("mail", userData.mail)) {
        msgInvalid.innerText = "Adresse mail déjà utilisée" ;
    }
    else if (userData.name != "" && userData.mail !== "" && userData.pwd !== ""){
        const newContent = document.createTextNode(`Bienvenue ${userData.name}, have fun !`);
        NEW_P.appendChild(newContent)
        saveUser(userData)
    }
    else {
        const newContent = document.createTextNode(`Merci de remplir correctement le formulaire`);
        NEW_P.appendChild(newContent)
    }

    NEWDIV.appendChild(NEW_P) ;
    btnInscription.insertAdjacentElement('beforebegin', NEWDIV);
}

function saveUser(userData) {
    if(users !== null) {
      users.push(userData) ;
    }
    else {
        users = [userData]
    }
    localStorage.setItem("users", JSON.stringify(users));
}

function checkIfUsed(key, value) {
    let isUsed = false;
    validInput("btnInscription");
    users.forEach(element => {
        if(element[key] == value){
            isUsed = true
            invalidInput("btnInscription");
            btnInscription
        }
    });
    return isUsed
}