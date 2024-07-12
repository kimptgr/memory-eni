"use-strict" ;
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
var totalCards = 0;

function init(){
    makeBoardGame() ;
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
    totalCards = dataUser.favoriteSize ;
    let indexOfMemory = dataUser.favoriteMemory ;
    if (totalCards > favMemSrc.taille){
        indexOfMemory = arrayOfsrc.findIndex((memory) => (memory.taille == totalCards ))
       }

        cards.forEach((card, index) => {
            if (index < totalCards/2 ) {
                pathImage =  arrayOfsrc[indexOfMemory].path + (index + 1) + arrayOfsrc[indexOfMemory].format ;
            card.style.backgroundImage = pathImage ;
            }
            else {
                pathImage = arrayOfsrc[indexOfMemory].path + (index - ((totalCards/2)-1)) + arrayOfsrc[indexOfMemory].format ;
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
        card.style.order = getRandom(totalCards-1) ;
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
            makeVisible(cardNumber) ;
            firstCardCliked = cardNumber ;
            card1 = firstCardCliked ;
        }
        else { // 2eme
            makeVisible(cardNumber);
            card2 = cardNumber ;
            if((cardNumber == (firstCardCliked - (totalCards/2))) || (firstCardCliked == (cardNumber - (totalCards/2))) ){ // paire ok
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

            if (cardVisible === totalCards){
                let h1Game = document.querySelector("h1") ;
                h1Game.innerText = "Tu as gagné en "+ nbShot/2 + " manches !" ;
             }
    } 
}

function makeVisible(cardNumber){
    let imageNumber = cardNumber ;
    console.log(totalCards/2) ; 

    cards[cardNumber-1].classList.add("visible") ;
    if (cardNumber > (totalCards/2)) {
        imageNumber = imageNumber - (totalCards/2) } ;
    cards[cardNumber-1].style.backgroundImage = arrayOfsrc[dataUser.favoriteMemory].path + imageNumber + arrayOfsrc[dataUser.favoriteMemory].format;
} ;

function makeInvisible(cardNumber){
    let imageNumber = cardNumber ;
   if(cardNumber !== undefined ){
    cards[cardNumber-1].classList.remove("visible") ;
    if (cardNumber > totalCards/2) {imageNumber = imageNumber - (totalCards/2) } ;
    cards[cardNumber-1].style.backgroundImage = `url(./images/ressources1/question.svg`;}
} ;

function showPair(){
    console.log("show must go on")
    timeoutID1 = setTimeout(makeInvisible, 3000, card1);
    timeoutID2 = setTimeout(makeInvisible, 3000, card2);
} ;

function makeBoardGame() {
    let dataUser = getUser() ;
    let memorySizeFav = dataUser.favoriteSize ;
    let memoryFavorite = dataUser.favoriteMemory ;
    let totalCards = dataUser.favoriteSize ;
    let totalRow ;
    let totalColumn ;
    let sizeCase ;
    let boardGameSection = document.querySelector('.boardGame');
    
    if (totalCards == 12 ) {sizeCase = 20 ; totalRow = 3 ; totalColumn = 4; } ;
    if (totalCards == 16 ) {sizeCase = 20 ; totalRow = 4 ; totalColumn = 4;} ;
    if (totalCards == 20 ) {sizeCase = 15 ; totalRow = 4 ; totalColumn = 5 ;} ;
    
    boardGameSection.style.gridTemplateColumns = `repeat(${totalColumn}, ${sizeCase}vmin)`;
    boardGameSection.style.gridTemplateRows = `repeat(${totalRow}, ${sizeCase}vmin)`;
    for (let i = 1; i <= totalCards; i++) {
        let newDiv = document.createElement('div');
        newDiv.id = i;
        newDiv.classList.add('memoryCard');
        boardGameSection.appendChild(newDiv);
}



    console.log(sizeCase) ;
}