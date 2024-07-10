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

function getUser() {
    let dataInJSON = document.cookie ;
    console.log(dataInJSON) ;
    let data = JSON.parse(dataInJSON) ;
    dataUser = data ;
    return dataUser
}

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

    // Faire un bouton pour changer image, l'enregistrer dans les localstorage
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

    let inputName = document.getElementById("name") ;
    let inputMail = document.getElementById("mail") ;
    let inputFavMem = document.getElementById("favoriteMemory") ;
    let inputFavSize = document.getElementById("favoriteSize") ;

    let userName = dataUser.name ; 
    let userMail = dataUser.mail ;
    let userfavoriteMemory = dataUser.favoriteMemory ;
    let userfavoriteSize = dataUser.favoriteSize ;

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

    if (userName !== inputName.value && inputName.value.length > 3) userName = inputName.value ;
    if (userMail !== inputMail.value && mailRegex.test(inputMail.value)) userMail = inputMail.value ;
    if (userfavoriteMemory !== inputFavMem.value) userfavoriteMemory = inputFavMem.value ;
    if (userfavoriteSize !== inputFavSize.value) userfavoriteSize = inputFavSize.value ;
        let newData = {
            name: userName,
            mail: userMail,
            pwd: dataUser.pwd,
            favoriteMemory: userfavoriteMemory,
            favoriteSize: userfavoriteSize
        }

        localStorage.setItem("user", JSON.stringify(newData));
}