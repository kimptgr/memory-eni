window.onload = init ;
var cards ;
function init(){
    cards = document.querySelectorAll(".memoryCard") ;
    showAllCards();
}

function showAllCards(){

    console.log(cards)
    cards.forEach((card, index) => {
        if (index < 6 ) {
            console.log('url("/images/ressources1/memory-legume/' + index + '.svg")') ;
            card.style.backgroundImage = `url("/images/ressources1/memory-legume/${index + 1}.svg")`;
            }
            else {
            console.log("hello");
            card.style.backgroundImage = `url("/images/ressources1/memory-legume/${index - 5}.svg")`;
        }
    } )
}