window.onload = init ;
var dataUser ;

function init() {
    if (getUser())
         showUser(getUser()) ; 
        else
        window.location.href = "./inscription.html" ;
    getPkmn() ;
    let btnModif = document.getElementById("btnModification") ;
    btnModif.addEventListener("click", saveNewData)
}
// Faire un bouton pour changer image, l'enregistrer dans les localstorage
//===============================get a random profil image 
function getPkmn(){
    let valuePkmn = getRandom(300); ;
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

function getRandom(max){
    let randomNumber = Math.floor(Math.random()*max) ;
    return randomNumber 
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
    inputFavMem.setAttribute("value", user.favoriteMemory) ;
    
    let inputFavSize = document.getElementById("favoriteSize") ;
    inputFavSize.setAttribute("value", user.favoriteSize) ;
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
    let currentUserIndex ;
    //get index du currentuser
    users.forEach((user, index) => {
        if(user["name"] == currentUser.name){
            currentUserIndex = index ;
        }
    })

    // check if changement ds le formulaire, if are ok
    const MAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

    if(inputName !== users[currentUserIndex].name 
        && !checkIfUsed("name", inputName)
        && inputName.length >= 3 
    ){
        currentUser.name = inputName ;
    }
    if(inputMail !== users[currentUserIndex] 
        && !checkIfUsed("mail", inputMail)
        && MAILREGEX.test(inputMail)
    ){
        currentUser.mail = inputMail ;
    }
    if(inputFavMem !== users[currentUserIndex].favoriteMemory){
        currentUser.mail = inputMail ;
    }
    if(inputFavSize != users[currentUserIndex].favoriteSize){
        currentUser.mail = inputMail ;
    }

    //Update change 
    users[currentUserIndex] = currentUser ;
    localStorage.setItem("users", JSON.stringify(users));

    // replace cookie puis charge new User

    currentUserInJSON = JSON.stringify(currentUser) ;
    document.cookie = `currentUser=${currentUserInJSON}`;
    alert("Changements enregistrées !") ;
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