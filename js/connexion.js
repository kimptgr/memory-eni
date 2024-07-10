var usersJSON = localStorage.getItem("users");
var users = JSON.parse(usersJSON) ;

window.onload = init ;

function init(){
    let btnConnexion = document.getElementById("submit");
    btnConnexion.addEventListener("click" , connect)
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
                
                let currentUser = JSON.stringify(user) ;
                document.cookie = `currentUser=${currentUser}` ;
            }
            else {
                console.log(e.target)
                // e.target.classList.remove("is-invalid") ;
                // e.target.classList.add("is-valid") ;

                // e.target.classList.remove("is-valid") ;
                // e.target.classList.add("is-invalid") ;
            }
            e.target.classList ;
        }
        );}
    




}