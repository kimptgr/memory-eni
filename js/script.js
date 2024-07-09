window.onload = init ;
var cards ;
var btnStart ;
function init(){
    cards = document.querySelectorAll(".memoryCard") ;
    btnStart = document.querySelector(".btnStart")("click", playgame)
    showAllCards();
    
}

function showAllCards(){

    console.log(cards)
    cards.forEach((card, index) => {
        if (index < 6 ) {
            card.style.backgroundImage = `url("./images/ressources1/memory-legume/${index + 1}.svg")`;
            }
            else {
            console.log("hello");
            card.style.backgroundImage = `url("./images/ressources1/memory-legume/${index - 5}.svg")`;
        }
    } )
}

function playgame(){
    
}