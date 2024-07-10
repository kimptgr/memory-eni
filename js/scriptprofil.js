window.onload = init ;

function init() {
 getPkmn() ;
}

function getPkmn(){
    let valuePkmn = getRandom(300); ;
    const URL = "https://pokeapi.co/api/v2/pokemon/" ;
    try {
        fetch( URL+ valuePkmn)
        .then (response => response.json())
        .then (data => showPkmn(data)) ;
        console.log(data) ;
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
    return randomNumber ;}