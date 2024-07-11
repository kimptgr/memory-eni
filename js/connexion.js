var usersJSON = localStorage.getItem("users");
var users = JSON.parse(usersJSON) ;

window.onload = init ;

function init(){
    let btnConnexion = document.getElementById("submit");
    btnConnexion.addEventListener("click" , connect) ;
}

function connect(e){
    let inputUserMail = document.getElementById("inputEmail").value;
    let inputUserPassword = document.getElementById("inputPassword").value;


    if (users !== null) {
        e.target.classList ;
        users.forEach((user) => {
            if(user["mail"] == inputUserMail && user["pwd"] == inputUserPassword){
                // e.target.classList.remove("is-invalid") ;
                // e.target.classList.add("is-valid") ;
                alert(`Bienvenue !`) ; 
                window.location.replace("./game.html") ;
                let currentUser = JSON.stringify(user) ;
                document.cookie = `currentUser=${currentUser}` ;
            }
            else {
                // e.target.classList.remove("is-invalid") ;
                // e.target.classList.add("is-valid") ;
                
                // e.target.classList.remove("is-valid") ;
                // e.target.classList.add("is-invalid") ; 
            }
            getUser()
            e.target.classList ;
        }
    );}
}
    
function getUser() {
    if (document.cookie){
        let dataInCookie = document.cookie ;
        let tabCookie = dataInCookie.split("=");
        let dataInJSON = tabCookie[1] ;
        let data = JSON.parse(dataInJSON) ;
        dataUser = data ;
        window.location.href = "./game.html" ;
        return dataUser}
    else {
    }
}

// c/coller dans profil
        function checkIfUsed(key, value) {
            let usersJSON = localStorage.getItem("users");
            let users = JSON.parse(usersJSON) ;
            let isUsed = false;
            validInput("btnInscription");
            if (users !== null) {
            users.forEach(element => {
                if(element[key] == value){
                    isUsed = true ;
                    invalidInput("btnInscription");
                }
            });}
            return isUsed
        }

        // =============================TODO
        // Manque l'affichage si mauvais utilisateur faux 
    