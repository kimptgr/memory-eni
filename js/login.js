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

function verifyValidity(e){
    let userInput = e.target ;

    switch (userInput.id) {
        case "name":
            if(userInput.value.length >= 3){
                validInput(userInput.id);
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
    console.log(userData.id +" <  > " + element.value) ;
    console.log(userData);
    
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
    btnInscription.insertAdjacentElement('afterend', NEWDIV)
    if (userData.name != "" && userData.mail !== "" && userData.pwd !== ""){
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
    let usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON) ;

    if(users !== null) {
      users.push(userData) ;
       // users = {users, userData} ;
    }
    else {
        users = [userData]
    }
    console.log(users) ;
    console.log(userData) ;
    localStorage.setItem("users", JSON.stringify(users));
}