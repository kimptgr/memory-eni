import { getRandom } from './utils/random.js';

window.onload = init ;
var cards ;
var btnStart ;
var nbShot ;
var firstCardCliked ;
var urlImage = 'url("./images/ressources1/memory-legume/' ;
var imageType = '.svg")' ;
var dataUser ;
var pathImage ;

function init(){
    cards = document.querySelectorAll(".memoryCard") ;
    // btnStart = document.querySelector(".btnStart") ;
    // btnStart.addEventListener("click", playgame) ;
    dataUser = getUser() ;
    if (getUser())
        dataUser = getUser() ; 
    else
       window.location.href = "./connexion.html" ;

    document.addEventListener("keydown", (e) => {
        if (e.key == " "){
            playgame() ;
        }
    })
    showAllCards();
    
}

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

let arrayOfsrc = [
    {path : "url('./images/ressources1/memory-legume/",
        format: ".svg')",
        taille: 12
    }, {path : "url('./images/ressources1/animauxAnimes/",
        format: ".webp')",
        taille: 16
    },
    {path: "url('./images/ressources1/dinosauresAvecNom/",
        format: ".jpg')",
        taille: 20}
] ;

function showAllCards(){
       let favMemSrc = arrayOfsrc[dataUser.favoriteMemory] ;
        cards.forEach((card, index) => {
            if (index < 6 ) {
                pathImage =  arrayOfsrc[dataUser.favoriteMemory].path + (index + 1) + arrayOfsrc[dataUser.favoriteMemory].format ;
                console.log(pathImage) ;
            card.style.backgroundImage = pathImage ;
            }
            else {
                pathImage = favMemSrc.path + (index - 5) + favMemSrc.format ;
            card.style.backgroundImage = pathImage;
        }
    } )
}

let h1Game = document.querySelector("h1") ;

let cardVisible = 0 ;

function playgame(){
    cardVisible = 0
    nbShot = 0 ;
    cards.forEach(card => {
        card.style.backgroundImage = "url(./images/ressources1/question.svg" ;
        card.style.order = getRandom(11) ;
        card.addEventListener("click", clickCard) ;
        card.classList.remove("visible") ;
    });
    let h6 = document.querySelector("h6") ;
    h6.innerText = "Manche 1" ;

    let h1Game = document.querySelector("h1") ;
    h1Game.innerText = "Espace pour recommencer" ;
    /* Le style à appliquer pour toute les cartes au même endroit
        card.style.position = "absolute" ;
        card.style.top = "0" ;
        card.style.left = "0" ;
        card.style.height = "20vmin" ;
        card.style.width = "20vmin" ; */
}

let card1, card2 ;
let timeoutID1, timeoutID2 ;

function clickCard(e){
    let cardNumber = e.target.id ;
    let cardClicked = document.getElementById(cardNumber) ;
    if (cardClicked.classList.contains("visible"))
        {
        alert("Tu as déjà retourné cette carte, choisis en une autre.")
    }
    else {       
        if (nbShot%2 === 0) { // première de la paire
            clearTimeout(timeoutID1);
            clearTimeout(timeoutID2);
            makeInvisible(card1);
            makeInvisible(card2);
            makeVisible(cardNumber)
            firstCardCliked = cardNumber ;
            card1 = firstCardCliked ;
        }
        else { // 2eme
            makeVisible(cardNumber);
            card2 = cardNumber ;
            if((cardNumber == (firstCardCliked - 6)) || (firstCardCliked == (cardNumber - 6)) ){ // paire ok
                card1 = undefined ; 
                card2 = undefined ;
                cardVisible += 2 ;
            }
            else {
                showPair() ;
                makeVisible(cardNumber);
            }
            }
            nbShot ++ ;
            let h6 = document.querySelector("h6") ;
            h6.innerText = "Manche " + Math.round(nbShot/2) ;

            if (cardVisible === 12){
                let h1Game = document.querySelector("h1") ;
                h1Game.innerText = "Tu as gagné en "+ nbShot/2 + " manches !" ;
             }
    } 
}

function makeVisible(cardNumber){
    let imageNumber = cardNumber ;

    cards[cardNumber-1].classList.add("visible") ;
    if (cardNumber > 6) {imageNumber = imageNumber -6 ;}
    cards[cardNumber-1].style.backgroundImage = arrayOfsrc[dataUser.favoriteMemory].path +imageNumber+ arrayOfsrc[dataUser.favoriteMemory].format;
}

function makeInvisible(cardNumber){
    let imageNumber = cardNumber ;
   if(cardNumber !== undefined ){
    cards[cardNumber-1].classList.remove("visible") ;
    if (cardNumber > 6) {imageNumber = imageNumber -6 ;}
    cards[cardNumber-1].style.backgroundImage = `url(./images/ressources1/question.svg`;}
}

function showPair(){
    console.log("show must go on")
    timeoutID1 = setTimeout(makeInvisible, 3000, card1);
    timeoutID2 = setTimeout(makeInvisible, 3000, card2);
}