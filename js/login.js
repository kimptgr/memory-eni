window.onload = init ;
let userData = {
    name: "",
    mail: "",
    pwd: ""
};


function init(){
    let userLogin = document.getElementById("name") ;
    userLogin.addEventListener("input", verifyValidity) ;

    let userMail = document.getElementById("mail") ;
    userMail.addEventListener("input", verifyValidity) ;

    let userPwd = document.getElementById("pwd") ;
    userPwd.addEventListener("input", verifyValidity) ;

    let userConfirmPassword = document.getElementById("confirmPassword") ;
    userConfirmPassword.addEventListener("input", verifyValidity) ;

    let btnInscription = document.getElementById("btnInscription") ;
    btnInscription.addEventListener("click", createAccount) ;
}

function verifyValidity(e){
    let userLoginInput = e.target ;

    if(userLoginInput.value === "") {
        userLoginInput.classList.remove("is-valid") ;
        userLoginInput.classList.remove("is-invalid") ;
    }
    else if (userLoginInput.value !== "" && userLoginInput.checkValidity()){
        console.log(" >" + userLoginInput.value + "< ");
        userLoginInput.classList.add("is-valid") ;
        userLoginInput.classList.remove("is-invalid") ;
    }
    else {
        console.log("login non ok")
        userLoginInput.classList.remove("is-valid") ;
        userLoginInput.classList.add("is-invalid") ;
    }

    let mdp1 = document.getElementById("pwd") ;
    let mdp2 = document.getElementById("confirmPassword") ;

    console.log(mdp2.id +"<mdp 1 login input >"+ userLoginInput.id)

    // vérifier mdp1 = mdp 2
}

function changeLogin(){
    let userLoginInput = document.getElementById("name").value ;
    return (userLoginInput)
}

function changeMail(){
    let userLoginInput = document.getElementById("mail").value ;
    return (userLoginInput)
}

function changePwd(){
    let userLoginInput = document.getElementById("pwd").value ;
    return (userLoginInput)
}
function confirmPassword(){
    let userLoginInput = document.getElementById("confirmPassword").value ;
    return (userLoginInput)
}

function createAccount(e){
    e.preventDefault() ;
    userData = {
        name: changeLogin(),
        mail: changeMail(),
        pwd: confirmPassword()
    };
    console.log(userData)
}