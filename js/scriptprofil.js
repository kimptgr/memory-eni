"use strict";

window.onload = init;
var dataUser;

function init() {
    if (!getUser()) window.location.href = "./inscription.html";
    console.log(dataUser);
    dataUser = getUser();
    showUser(dataUser);

    let selectFavoriteMemory = document.getElementById("favoriteMemory");
    selectFavoriteMemory.addEventListener("change", showMemory);

    let btnModif = document.getElementById("btnModification");
    btnModif.setAttribute("disabled", "");
    btnModif.addEventListener("click", saveNewData);

    let fields = document.querySelectorAll("input");
    fields.forEach((field) => {
        field.addEventListener("input", (e) => verifyValidity(e.target.name, e.target.value));
    });

    fields = document.querySelectorAll("select");
    fields.forEach((field) => {
        field.addEventListener("change", (e) => changePreferences(e.target.name, e.target.value));
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

    //TODO Fill with scores
};

function showMemory() {
    let arrayOfmemoImgSrc = ["./images/ressources1/memory-legume/memory_detail.png", "./images/ressources1/animauxAnimes/memory_detail_animaux_animes.png", "./images/ressources1/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png"];
    let memorImg = document.getElementById("memorImg");
    let selectFavoriteMemory = document.getElementById("favoriteMemory")
    memorImg.src = `${arrayOfmemoImgSrc[selectFavoriteMemory.value]}`;
};

function enabledbtn() {
    let userData = getUser() ;
    let selectFavoriteMemory = document.getElementById("favoriteMemory") ;
    let selectFavoriteSize = document.getElementById("favoriteSize")
    let btnModif = document.getElementById("btnModification");
    if (checkAllInputValidity() &&
        (selectFavoriteMemory.value !== userData.favoriteMemory
    || selectFavoriteSize !== userData.favoriteSize)
) {
    btnModif.removeAttribute("disabled");}
}

function disabledbtn() {
    let btnModif = document.getElementById("btnModification");
    btnModif.setAttribute("disabled", "");
}
////////////////////////////////////////////////////////////////////////
// TODO Faire un bouton pour changer image
/////////////////////////////////////////////////////////////////////////

// Give to user a random profil picture
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

    if (inputName !== users[currentUserIndex].name
        && !checkIfUsed("name", inputName)
        && inputName.length >= 3
    ) {
        currentUser.name = inputName;

    }

    const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputMail !== users[currentUserIndex].mail
        && !checkIfUsed("mail", inputMail)
        && MAILREGEX.test(inputMail)
    ) {
        currentUser.mail = inputMail;
    }
    if (inputFavMem !== users[currentUserIndex].favoriteMemory) {
        currentUser.favoriteMemory = inputFavMem;
    }
    if (inputFavSize != users[currentUserIndex].favoriteSize) {
        currentUser.favoriteSize = inputFavSize;
    }



    if (inputName === users[currentUserIndex].name
        && inputMail === users[currentUserIndex].mail
        && inputFavMem === users[currentUserIndex].favoriteMemory
        && inputFavSize === users[currentUserIndex].favoriteSize
    ) {
        e.target.setAttribute("disabled", "");
        alert("Pas de changements détectés.")

    }
    else if (!checkAllInputValidity()) {
        alert("Champs invalids");
    }
    else {
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
function verifyValidity(inputName, inputValue) {
    let feedback = document.querySelector("#" + inputName + "+ p");
    let currentUser = getUser();
    switch (inputName) {
        case "name":
            if (inputValue.length < 3) {
                console.log("j'entre dans le verifyvalidity");
                feedback.textContent = "3 caractères minimum";
                invalidInput(inputName);
                disabledbtn();
            }
            else if (inputValue === currentUser.name) {
                console.log("comme avvant");
                normalizeInput(inputName);
                disabledbtn();
            }
            else if (checkIfUsed("name", inputValue)) {
                feedback.textContent = "Nom déjà pris.";
                invalidInput(inputName);
                disabledbtn();
                console.log("déjà utilisé");
            }
            else {
                validInput(inputName);
                enabledbtn();
            }
            break;

        case "mail":
            const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!MAILREGEX.test(inputValue)) {
                feedback.textContent = "Mail incorrect";
                invalidInput(inputName);
                disabledbtn();
            }
            else if (inputValue === currentUser.mail) {
                console.log("comme avant");
                normalizeInput(inputName);
                disabledbtn();
            }
            else if (checkIfUsed("mail", inputValue)) {
                feedback.textContent = "Mail déjà utilisé.";
                invalidInput(inputName);
                disabledbtn();
                console.log("déjà utilisé");
            }
            else {
                validInput(inputName);
                enabledbtn();
            }
            break;

        default:
            break;
    }
}

function changePreferences(inputName, inputValue) {
    let userData = getUser() ;
    if (inputValue === userData[inputName]){
        disabledbtn();
    }
    else {
        enabledbtn() ;}
}
function checkAllInputValidity() {
    let allValid = true;
    console.log("je check que tout est valide") ;
    let fields = document.querySelectorAll("input");
    fields.forEach((field) => {
        console.log(field);
        if (field.classList.contains("is-invalid")) {
            allValid = false;
            console.log("Ja'ai vu que y'a 1 faux");
            return;
        }
    });
    return allValid;
}

function normalizeInput(id) {
    let element = document.getElementById(id);
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
}
// CCOLLER##########################Mais avec modif
function invalidInput(id) {
    let element = document.getElementById(id);
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    // userData[id] = "" ;
    return false;
}

function validInput(id) {
    let element = document.getElementById(id);
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    // if (id !== confirmPassword){ userData[id] = element.value ;} ;
    return true;
}

//TODO Si pas de changements mais qu'on clique rien ne se passe