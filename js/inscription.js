import {hachPassword} from "./utils/cryptage.js" ;

"use strict";
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
    favoriteMemory: 0,
    favoriteSize: 12,
    imgProfil: getRandom(300),
    score: []
};

function getRandom(max){
    let randomNumber = Math.floor(Math.random()*max) ;
    return randomNumber
}

var isNameOk = false ;
var isMailOk = false ;
var isPswOk = false ;
var isConfirmOk = false ;

function verifyValidity(e){
    let userInput = e.target ;

    switch (userInput.id) {
        case "name":
            if(userInput.value.length >= 3 
            ){
                validInput(userInput.id);
                isNameOk = true ;
            }
            else{
                invalidInput(userInput.id) ;
                isNameOk = false ;
            }
            break;
            case "mail": 
            const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(MAILREGEX.test(userInput.value) 
            ){
        validInput(userInput.id)
        isMailOk = true ;
    }
    else{
        invalidInput(userInput.id)
        isMailOk = false ;
    }
    break;
    case "pwd":
        let passwordToVerify = userInput.value ;
        const MINUSCULE = /[a-z]/ ;
        const MAJUSCULE = /[A-Z]/ ;
        const CHIFFRE = /[0-9]/ ;
        const CARACSPE = /[@#$%^&+=!(){}\[\]:;<>,.?\/\\\-_]/ ;

        let faible = document.getElementById("faible");
        let moyen = document.getElementById("moyen");
        let fort = document.getElementById("fort");

        if(passwordToVerify.length > 8 && (CARACSPE.test(passwordToVerify) || CHIFFRE.test(passwordToVerify) )){
            faible.style.display = "inline-block" ;
            moyen.style.display = "inline-block" ;
            fort.style.display = "inline-block" ;
        }
        else if(passwordToVerify.length > 5 && (CARACSPE.test(passwordToVerify) || CHIFFRE.test(passwordToVerify))) {
            faible.style.display = "inline-block" ;
            moyen.style.display = "inline-block" ;
            fort.style.display = "none" ;
        }
        else if (passwordToVerify.length < 6){
            faible.style.display = "inline-block" ;
            moyen.style.display = "none" ;
            fort.style.display = "none" ;
        };
        
        if (
            CARACSPE.test(passwordToVerify) &&
            MINUSCULE.test(passwordToVerify) && 
            MAJUSCULE.test(passwordToVerify) &&
            CHIFFRE.test(passwordToVerify) &&
            passwordToVerify.length > 5
        ){
            validInput(userInput.id) ;
            isPswOk = true ;
        }
        else {
            invalidInput(userInput.id)
            isPswOk = false ;
        }
    break;
    
    case "confirmPassword":
        let psw = document.getElementById("pwd") ;
        if(psw.value === userInput.value){
            validInput(userInput.id)
            isConfirmOk = true ;
            }
            else{
                invalidInput(userInput.id);
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
    if (id !== confirmPassword){ userData[id] = element.value ;} ;
    return true ;
}

function invalidInput(id) {
    let element = document.getElementById(id) ;
    element.classList.remove("is-valid") ;
    element.classList.add("is-invalid") ;
    userData[id] = "" ;
    return false ;
}

async function createAccount(e){
    e.preventDefault() ;
    if (document.getElementById("notification")){
        document.getElementById("notification").remove() ;
    }

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
    else if (userData.name != "" && userData.mail !== "" && userData.pwd !== ""
     //   && userData.pwd === userData.confirm ///////////////////////////////////////////////////////////////////////////////
    ){
        //window.location.href = "./game.html"
        const newContent = document.createTextNode(`Bienvenue ${userData.name}, have fun !`);
        NEW_P.appendChild(newContent);

        try {
            userData.pwd = await hachPassword(userData.pwd);
            console.log("dans try");
            console.log("dans try" + userData.pwd);
            saveUser(userData) ;
        } catch (error) {
            console.log("dans erreur du tryinscription");
            console.log(error) ;
        }
        
    }
    else {
        const newContent = document.createTextNode(`Merci de remplir correctement le formulaire`);
        NEW_P.appendChild(newContent);
    }
    
    let btnInscription = e.target ;
    NEWDIV.appendChild(NEW_P) ;
    btnInscription.insertAdjacentElement('beforebegin', NEWDIV);
}
// //######################A EXPORTER
// async function  hachPassword(password){
//     console.log("dans cryptage");
//     var hashedPassword = await argon2.hash({
//         pass: password,
//         salt: 'kimemory',
//         type: argon2.ArgonType.Argon2id,
//     });
//     console.log(hashedPassword.hashHex);
//     return hashedPassword.hashHex;
// };

// //###################################

//C/Coller dans profil
function saveUser(userData) {
    let usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON);
    if(users !== null) {
      users.push(userData);
    }
    else {
        users = [userData];
    }
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "./connexion.html" ;
    let currentUser = JSON.stringify(userData) ;
    document.cookie = `currentUser=${currentUser}` ;
}


// CC 
function checkIfUsed(key, value) {
    let usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON) ;
    let isUsed = false;
    validInput("btnInscription");
    if (users !== null) {
    users.forEach(element => {
        if(element[key] == value){
            isUsed = true ;
            invalidInput("btnInscription");
        }
    });}
    return isUsed
}