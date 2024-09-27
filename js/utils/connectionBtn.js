export function connectionBtn() {
    var dataUser = getUser();

    let connexion = document.getElementById("deconnexionLink");
    if (dataUser !== undefined) {
        connexion.innerText = "Déconnexion";
        connexion.addEventListener("click", connectionBtn)
    }
    connexion.addEventListener("click", deconnexion);

    function deconnexion(){
    document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.href = "./connexion.html";
}

function getUser() {
    if (document.cookie) {
        let dataInCookie = document.cookie;
        let tabCookie = dataInCookie.split("=");
        let dataInJSON = tabCookie[1];
        let data = JSON.parse(dataInJSON);
        dataUser = data;
        return dataUser
    }
}
}

