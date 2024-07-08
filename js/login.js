window.onload = init ;

function init(){
    let userLogin = document.getElementById("name") ;
    userLogin.addEventListener("input", changeLogin) ;
}

function changeLogin(e){
    let userLoginInput = e.target.value ;
    console.log(userLoginInput)
}