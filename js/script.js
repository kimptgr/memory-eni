window.onload = init ;
var cards ;
var btnStart ;
var nbShot ;
var firstCardCliked ;
var gagne = false ;


function init(){
    cards = document.querySelectorAll(".memoryCard") ;

    btnStart = document.querySelector(".btnStart") ;
    btnStart.addEventListener("click", playgame) ;
    showAllCards();
    
}

function showAllCards(){
    cards.forEach((card, index) => {
        if (index < 6 ) {
            card.style.backgroundImage = `url("./images/ressources1/memory-legume/${index + 1}.svg")`;
            }
            else {
            card.style.backgroundImage = `url("./images/ressources1/memory-legume/${index - 5}.svg")`;
        }
    } )
}

function playgame(){
    nbShot = 0 ;
    cards.forEach((card, index) => {
        card.style.backgroundImage = "url(./images/ressources1/question.svg" ;
        card.style.order = getRandom(11) ;
        card.addEventListener("click", clickCard) ;
        card.classList.remove("visible") ;
    }) ;
    let h6 = document.querySelector("h6") ;
    h6.innerText = "Nombre de coup joué : " + nbShot ;
    /* Le style à appliquer pour toute les cartes au même endroit
        card.style.position = "absolute" ;
        card.style.top = "0" ;
        card.style.left = "0" ;
        card.style.height = "20vmin" ;
        card.style.width = "20vmin" ; */
}

let card1, card2 ;
let timeoutID1, timeoutID2 ;
let cardVisible = 0 ;

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
            card2 = cardNumber ;
            makeVisible(cardNumber);
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
            h6.innerText = "Nombre de coup joué : " + nbShot ;

            if (cardVisible === 12){
                gagne == true ;
                alert("Tu as gagné en "+ nbShot/2 + " manches !")
                gagne = false ;
             }
    } 
}

function getRandom(max){
    let randomNumber = Math.floor(Math.random()*max) ;
    return randomNumber ;

}

function makeVisible(cardNumber){
    let imageNumber = cardNumber ;

    cards[cardNumber-1].classList.add("visible") ;
    if (cardNumber > 6) {imageNumber = imageNumber -6 ;}
    cards[cardNumber-1].style.backgroundImage = `url("./images/ressources1/memory-legume/${imageNumber}.svg")`;
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