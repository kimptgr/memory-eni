window.onload = init ;
var cards ;
var btnStart ;
var nbShot ;
var firstCardCliked ;


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
    } )

    /* Le style à appliquer pour toute les cartes au même endroit
        card.style.position = "absolute" ;
        card.style.top = "0" ;
        card.style.left = "0" ;
        card.style.height = "20vmin" ;
        card.style.width = "20vmin" ; */
}

function clickCard(e){
    let timeoutID1, timeoutID2 ;
    let cardNumber = e.target.id ;
    let cardClicked = document.getElementById(cardNumber) ;

    if (cardClicked.classList.contains("visible"))
        {
        alert("Tu as déjà retourné cette carte, choisis en une autre.")
    }
    else {
        if (nbShot%2 === 0) {
            clearTimeout(timeoutID1);
            clearTimeout(timeoutID2);
            makeVisible(cardNumber)
            firstCardCliked = cardNumber ;
        }
        else { 
            makeVisible(cardNumber);
            if(firstCardCliked == cardNumber + 6 || firstCardCliked == cardNumber - 6 ){
                console.log("Hey égalité !")
            }
            else {
                console.log("2ème carte à jouer fausse")
                makeVisible(cardNumber);
                timeoutID1 = setTimeout(makeInvisible, 3000, firstCardCliked);
                timeoutID2 = setTimeout(makeInvisible, 3000, cardNumber);
            }
            }
        nbShot ++ ;
    }
    // Vérifie si paire
    //     cards.forEach()
    // let searchEven = cards.filter((card) => card.classList.contains("visible")) ; 
    // if (searchEven.length != 0) {console.log("Une paire !")}
    // else {console.log("Pas paire...")}
    
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

    cards[cardNumber-1].classList.remove("visible") ;
    if (cardNumber > 6) {imageNumber = imageNumber -6 ;}
    cards[cardNumber-1].style.backgroundImage = `url(./images/ressources1/question.svg`;
}