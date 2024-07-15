"use strict";
import { getRandom } from "./utils/random.js";

window.onload = init;
var dataUser;
var newPkmValue ;

function init() {
    dataUser = getUser();
    console.log(dataUser === void 0) ;
    if (dataUser === undefined) {window.location.href = "./inscription.html";}
    showUser(dataUser);
    showScores(dataUser);

    let btnProfilPicture = document.getElementById("randomImg");
    btnProfilPicture.addEventListener("click", changePicture);

    let selectFavoriteMemory = document.getElementById("favoriteMemory");
    selectFavoriteMemory.addEventListener("change", showMemory);

    let btnModif = document.getElementById("btnModification");
    btnModif.setAttribute("disabled", "");
    btnModif.addEventListener("click", saveNewData);

    let fields = document.querySelectorAll("input");
    fields.forEach((field) => {
        field.addEventListener("input", (e) => verifyValidity(e.target.name, e.target.value, btnModif));
    });

    fields = document.querySelectorAll("select");
    fields.forEach((field) => {
        field.addEventListener("change", (e) => changePreferences(e.target.name, e.target.value, btnModif));
    });
}

function getUser() {
    if (document.cookie) {
        let dataInCookie = document.cookie;
        let tabCookie = dataInCookie.split("=");
        let dataInJSON = tabCookie[1];
        let data = JSON.parse(dataInJSON);
        dataUser = data;
        return dataUser
    }
}

//Fill in the fields with user data
function showUser(user) {
    let valuePkmn = dataUser.imgProfil ;
    getPkmn(valuePkmn);
    newPkmValue = valuePkmn ;

    let inputName = document.getElementById("name");
    inputName.setAttribute("value", user.name);

    let inputMail = document.getElementById("mail");
    inputMail.setAttribute("value", user.mail);

    let inputFavMem = document.getElementById("favoriteMemory");
    for (let i = 0; i < inputFavMem.options.length; i++) {
        if (inputFavMem.options[i].value === user.favoriteMemory) {
            inputFavMem.options[i].selected = true;
            break;
        }
    }

    let inputFavSize = document.getElementById("favoriteSize");
    for (let i = 0; i < inputFavSize.options.length; i++) {
        if (inputFavSize.options[i].value === user.favoriteSize) {
            inputFavSize.options[i].selected = true;
            break;
        }
    }
    showMemory();
};

function showMemory() {
    let arrayOfmemoImgSrc = ["./images/ressources1/memory-legume/memory_detail.png", "./images/ressources1/animauxAnimes/memory_detail_animaux_animes.png", "./images/ressources1/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png"];
    let memorImg = document.getElementById("memorImg");
    let selectFavoriteMemory = document.getElementById("favoriteMemory")
    memorImg.src = `${arrayOfmemoImgSrc[selectFavoriteMemory.value]}`;
};

function showScores(dataUser){
// .scores = [{
//     pseudo: inputName, 
//     score: 25,
//     taille:"5*4",
//     memory: "Dinos",
//     date: "14/07/2024"
// }, {
//     pseudo: inputName, 
//     score: 15,
//     taille:"3*4",
//     memory: "Légumes",
//     date: "12/07/2024"
// }];
let scores = dataUser.score ;
if (scores !== null && scores !== undefined) {
    let scoreTable = document.querySelector("#scoreTable > tbody") ;
    scores.forEach((score) => {
        const NEWTR = document.createElement("tr");

        Object.keys(score).forEach(key => {
            if (key !== "dateheure") {
                const NEWTD = document.createElement("td");
                const NEWCONTENT = document.createTextNode(score[key]); // Récupérer la valeur associée à la clé
                NEWTD.appendChild(NEWCONTENT);
                NEWTR.appendChild(NEWTD);
            }
        });
        scoreTable.appendChild(NEWTR);
    });
}
}

function changePicture() {
    
let btnModif = document.getElementById("btnModification");
    newPkmValue = getRandom(300) ;
    getPkmn(newPkmValue) ;
    validInput("randomImg");
    changeBtnSubmit(btnModif);
}

function getPkmn(valuePkmn) {
    
    const URL = "https://pokeapi.co/api/v2/pokemon/";

    try {
        fetch(URL + valuePkmn)
            .then(response => response.json())
            .then(data => showPkmn(data));
    } catch (error) {
        console.log("Erreur avec l'API")
        console.log(error)
    }
};

function showPkmn(data) {
    const NEWIMG = document.querySelector("img");
    NEWIMG.setAttribute("src", data.sprites.front_default);
}

//==========================================================================

function saveNewData(e) {
    // e.preventDefault();

    let inputName = document.getElementById("name").value;
    let inputMail = document.getElementById("mail").value;
    let inputFavMem = document.getElementById("favoriteMemory").value;
    let inputFavSize = document.getElementById("favoriteSize").value;

    let usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON);
    let currentUser = getUser();
    let currentUserIndex = users.findIndex(user => user.name === currentUser.name);

    if (inputName === users[currentUserIndex].name
        && inputMail === users[currentUserIndex].mail
        && inputFavMem === users[currentUserIndex].favoriteMemory
        && inputFavSize === users[currentUserIndex].favoriteSize
        && dataUser.imgProfil === newPkmValue
    ) {
        e.target.setAttribute("disabled", "");
        alert("Pas de changements détectés.")
    }
    else if (!checkAllInputValidity()){
        alert("Champs invalids");
    }
    else {
        currentUser.name = inputName;
        currentUser.mail = inputMail;
        currentUser.favoriteMemory = inputFavMem;
        currentUser.favoriteSize = inputFavSize;
        currentUser.imgProfil = newPkmValue;

        // //#################################POUR TESTER SHOWSCORE
        // currentUser.scores = [{
        //     pseudo: inputName, 
        //     score: 25,
        //     taille:"5*4",
        //     memory: "Dinos",
        //     date: "14/07/2024"
        // }, {
        //     pseudo: inputName, 
        //     score: 15,
        //     taille:"3*4",
        //     memory: "Légumes",
        //     date: "12/07/2024"
        // }];

        // //#######################################################

        //Update change 
        users[currentUserIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));

        // replace cookie puis charge new User
        let currentUserInJSON = JSON.stringify(currentUser);
        document.cookie = `currentUser=${currentUserInJSON}`;
        alert("Changements enregistrées !");
    };

    showUser(getUser());
}
/////////////////////////CCOLLER/////////////////////////////////////
function checkIfUsed(key, value) {
    let usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON);
    let isUsed = false;

    if (users !== null) {
        users.forEach(element => {
            if (element[key] == value) {
                isUsed = true;
            }
        });
    }
    return isUsed
}
/////////////////////////CCOLLER/////////////////////////////////////
// Fonction who verifiy if data change, if its correct and change the input and the btn submit
// fct qui prend trois arguments le type de donnée à vérifier, la donnée et l'id du bouton de soumission
// 

function verifyValidity(inputName, inputValue, btnID) {
    let feedback = document.querySelector("#" + inputName + "+ p");
    let currentUser = getUser();

    switch (inputName) {
        case "name":
            if (inputValue.length < 3) {
                feedback.textContent = "3 caractères minimum";
                invalidInput(inputName);
                changeBtnSubmit(btnID);
            }
            else if (inputValue === currentUser.name) {
                normalizeInput(inputName);
                changeBtnSubmit(btnID);
            }
            else if (checkIfUsed("name", inputValue)) {
                feedback.textContent = "Nom déjà pris.";
                invalidInput(inputName);
                changeBtnSubmit(btnID);
            }
            else {
                validInput(inputName);
                changeBtnSubmit(btnID);
            }
            break;

        case "mail":
            const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!MAILREGEX.test(inputValue)) {
                feedback.textContent = "Mail incorrect";
                invalidInput(inputName);
                changeBtnSubmit(btnID);
            }
            else if (inputValue === currentUser.mail) {
                normalizeInput(inputName);
                changeBtnSubmit(btnID);
            }
            else if (checkIfUsed("mail", inputValue)) {
                feedback.textContent = "Mail déjà utilisé.";
                invalidInput(inputName);
                changeBtnSubmit(btnID);
            }
            else {
                validInput(inputName);
                changeBtnSubmit(btnID);
            }
            break;

        default:
            break;
    }
}

function changePreferences(inputName, inputValue, btnID) {
    let userData = getUser() ;
    let element = document.getElementById(inputName) ;
    if (inputValue === userData[inputName]){
        element.classList.remove("is-valid");
        changeBtnSubmit(btnID);
    }
    else {
        element.classList.add("is-valid") ;}
        changeBtnSubmit(btnID);
}

function checkAllInputValidity() {
    let allValid = true;
    let fields = document.querySelectorAll("input");
    fields.forEach((field) => {
        if (field.classList.contains("is-invalid")) {
            allValid = false;
            return;
        }
    });
    return allValid;
}

function oneIsChanged() {
    let fields = document.querySelectorAll("#randomImg, input, select") ;
    let oneIsChanged = false;
    fields.forEach((field) => {
        if (field.classList.contains("is-valid")) {
            oneIsChanged = true ;
            return;
        }
    });
    return oneIsChanged;
}

function changeBtnSubmit(btnID){
    if (!checkAllInputValidity()) {
        btnID.setAttribute("disabled", "");   
    }
    else if (checkAllInputValidity() && oneIsChanged()){
        btnID.removeAttribute("disabled");
    }
    else {
        btnID.setAttribute("disabled", "");   
    }
}

function normalizeInput(id) {
    let element = document.getElementById(id);
    if (element !== null) {
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");}
}
// CCOLLER##########################Mais avec modif
function invalidInput(id) {
    let element = document.getElementById(id);
    if (element !== null) {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;}
}

function validInput(id) {
    let element = document.getElementById(id);
    if (element !== null) {element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;}
}