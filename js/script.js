window.onload = init ;
var cards ;
var btnStart ;

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
    let cardNumber = e.target.id ;
    let imageNumber = cardNumber ;
    let cardClicked = document.getElementById(cardNumber) ;

    if (cardClicked.classList.contains("visible"))
        {
        alert("Tu as déjà retourné cette carte, choisis en une autre.")
    }
    else {
        cardClicked.setAttribute('class', "visible") ;
        if (cardNumber > 6) imageNumber = imageNumber -6 ;
        cardClicked.style.backgroundImage = `url("./images/ressources1/memory-legume/${imageNumber}.svg")`;
    }
        // Vérifie si paire
    //     cards.forEach()
    // let searchEven = cards.filter((card) => card.classList.contains("visible")) ; 
    // if (searchEven.length != 0) {console.log("Une paire !")}
    // else {console.log("Pas paire...")}







    // if (cardNumber <= 6 ) {
    //     cardClicked.style.backgroundImage = `url("./images/ressources1/memory-legume/${cardNumber}.svg")`;
    //     }
    //     else {
    //     cardClicked.style.backgroundImage = `url("./images/ressources1/memory-legume/${cardNumber - 6}.svg")`;
    // }
    console.log("Une carte est cliquée ! + " + e.target.id)
}
function getRandom(max){
    let randomNumber = Math.floor(Math.random()*max) ;
    return randomNumber ;

}