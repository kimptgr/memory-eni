"use strict";

window.onload = init ;
var dataUser ;

function init() {
    if (getUser()){
        dataUser = getUser() ;
         showUser(getUser()) ;
         console.log(dataUser) ;
    }
        else
        window.location.href = "./inscription.html" ;
    getPkmn() ;
    let selectFavoriteMemory = document.getElementById("favoriteMemory") ;
    selectFavoriteMemory.addEventListener("change", showMemory) ;

    let fields = document.querySelectorAll("input, select") ;

    let btnModif = document.getElementById("btnModification") ;
    btnModif.addEventListener("click", saveNewData) ;

    btnModif.setAttribute("disabled", "") ;
    fields.forEach((field) => {
        field.addEventListener("change", enabledbtn);
        field.addEventListener("input", enabledbtn)
}) ;
}

function enabledbtn(){
    let btnModif = document.getElementById("btnModification") ;
    btnModif.removeAttribute("disabled");
}
// Faire un bouton pour changer image, l'enregistrer dans les localstorage
// un badge
//===============================get a random profil image 
function getPkmn(){
    let valuePkmn = getUser().imgProfil;
    const URL = "https://pokeapi.co/api/v2/pokemon/" ;
    try {
        fetch( URL+ valuePkmn)
        .then (response => response.json())
        .then (data => showPkmn(data)) ;
    } catch (error) {
        console.log("Erreur avec l'API")
        console.log(error)
    }
} ;

function showPkmn(data){
    const NEWIMG = document.querySelector("img") ;
    NEWIMG.setAttribute("src", data.sprites.front_default) ;
}

//==========================================================================
function getUser() {
    if (document.cookie){
        let dataInCookie = document.cookie ;
        let tabCookie = dataInCookie.split("=");
        let dataInJSON = tabCookie[1] ;
        let data = JSON.parse(dataInJSON) ;
        dataUser = data ;
        return dataUser}
    else {
    }
}

function showUser(user) {
    let inputName = document.getElementById("name") ;
    inputName.setAttribute("value", user.name) ;
    
    let inputMail = document.getElementById("mail") ;
    inputMail.setAttribute("value", user.mail) ;
    
    let inputFavMem = document.getElementById("favoriteMemory") ;
    for (let i = 0; i < inputFavMem.options.length; i++) {
        if (inputFavMem.options[i].value === user.favoriteMemory) {
            inputFavMem.options[i].selected = true;
            break;
        }
    }
    showMemory() ;

    // inputFavMem.setAttribute("value", user.favoriteMemory) ;
    
    let inputFavSize = document.getElementById("favoriteSize") ;
 //   inputFavSize.setAttribute("value", user.favoriteSize) ;

    for (let i = 0; i < inputFavSize.options.length; i++) {
        if (inputFavSize.options[i].value === user.favoriteSize) {
            inputFavSize.options[i].selected = true;
            break;
        }
    }
} ;

function showMemory() {
    let arrayOfmemoImgSrc = ["./images/ressources1/memory-legume/memory_detail.png", "./images/ressources1/animauxAnimes/memory_detail_animaux_animes.png", "./images/ressources1/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png" ] ;
    let memorImg = document.getElementById("memorImg") ;
    let selectFavoriteMemory = document.getElementById("favoriteMemory")
    memorImg.src = `${arrayOfmemoImgSrc[selectFavoriteMemory.value]}` ;
} ;

function saveNewData(e) {
    e.preventDefault() ;

    let inputName = document.getElementById("name").value ;
    let inputMail = document.getElementById("mail").value ;
    let inputFavMem = document.getElementById("favoriteMemory").value ;
    let inputFavSize = document.getElementById("favoriteSize").value ;

    let usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON) ;
    let currentUser = getUser() ;
    let currentUserIndex = users.findIndex( user => user.name === currentUser.name) ;
    
    if(inputName !== users[currentUserIndex].name 
        && !checkIfUsed("name", inputName)
        && inputName.length >= 3 
    ){
        currentUser.name = inputName ;
    }
    
    const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    if(inputMail !== users[currentUserIndex].mail
        && !checkIfUsed("mail", inputMail)
        && MAILREGEX.test(inputMail)
    ){
        currentUser.mail = inputMail ;
    }
    if(inputFavMem !== users[currentUserIndex].favoriteMemory){
        currentUser.favoriteMemory = inputFavMem ;
    }
    if(inputFavSize != users[currentUserIndex].favoriteSize){
        currentUser.favoriteSize = inputFavSize ;
    }

    //Update change 
    users[currentUserIndex] = currentUser ;
    localStorage.setItem("users", JSON.stringify(users));

    // replace cookie puis charge new User

    let currentUserInJSON = JSON.stringify(currentUser) ;
    document.cookie = `currentUser=${currentUserInJSON}`;

    if (inputName === users[currentUserIndex].name
        && inputMail === users[currentUserIndex].mail
        && inputFavMem === users[currentUserIndex].favoriteMemory
        && inputFavSize === users[currentUserIndex].favoriteSize
    ){
        e.target.setAttribute("disabled", "") ;
        alert("Pas de changements détectés.")
        
    } else {
        alert("Changements enregistrées !") ;
    }

    showUser(getUser()) ;
}

function checkIfUsed(key, value) {
    let usersJSON = localStorage.getItem("users");
    let users = JSON.parse(usersJSON) ;
    let isUsed = false;

    if (users !== null) {
    users.forEach(element => {
        if(element[key] == value){
            isUsed = true ;
        }
    });}
    return isUsed
}

//TODO Si pas de changements mais qu'on clique rien ne se passe