import { hachPassword } from "./utils/cryptage.js";
window.onload = init;

function init() {
    let btnConnexion = document.getElementById("submit");
    btnConnexion.addEventListener("click", connect);
}

async function connect(e) {
    e.preventDefault();
    var usersJSON = localStorage.getItem("users");
    var users = JSON.parse(usersJSON);
    let inputUserMail = document.getElementById("inputEmail").value;
    let inputUserPassword = document.getElementById("inputPassword").value;


    if (users !== null) {
        e.target.classList;
        try {
            let passwordHashed = await hachPassword(inputUserPassword);
            users.every((user) => {
                if (user["mail"] == inputUserMail && user["pwd"] == passwordHashed) {
                    e.target.classList.remove("is-invalid");
                    e.target.classList.add("is-valid");
                    alert(`Bienvenue !`);
                    let currentUser = JSON.stringify(user);
                    document.cookie = `currentUser=${currentUser}`;
                    window.location.href = "./game.html";
                    return false;
                }
                else {
                    e.preventDefault();
                    e.target.classList.remove("is-valid");
                    e.target.classList.add("is-invalid");
                    return true;
                }
            }
            )
        } catch (error) {
            console.log(error);
        };
    }
}
