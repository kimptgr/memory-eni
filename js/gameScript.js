import { getRandom } from "./utils/random.js";
import { arrayOfsrc } from "./utils/arraymemory.js";
import { connectionBtn } from "./utils/connectionBtn.js";

window.onload = init;
var cards;
var nbShot;
var firstCardCliked;
var dataUser;
var pathImage;
var totalCards = 0;
var indexOfMemory;

function init() {
  connectionBtn();
  dataUser = getUser();
  if (dataUser === undefined)
    dataUser = {
      name: "Nomen nescio",
      mail: "",
      pwd: "",
      favoriteMemory: 7,
      favoriteSize: 12,
      imgProfil: 778,
      score: [],
    };
  //-------------Permet de forcer l'inscription pour accéder au jeu
  //window.location.href = "./connexion.html";
  document.addEventListener("keyup", (e) => {
    if (e.key == " ") {
      playgame();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key == " ") {
      playgame();
    }
  });

  // document.querySelector("h4").addEventListener("touchstart", playgame);

  //Play on mobile
  document.querySelector(".relaunch").addEventListener("click", playgame);

  afficheSelect();
  showGameBoard();

  let inputFavMem = document.getElementById("favoriteMemory");
  inputFavMem.addEventListener("change", changeMemory);
  let inputFavSize = document.getElementById("favoriteSize");
  inputFavSize.addEventListener("change", changeSize);
}

function getUser() {
  if (document.cookie) {
    let dataInCookie = document.cookie;
    let tabCookie = dataInCookie.split("=");
    let dataInJSON = tabCookie[1];
    let data = JSON.parse(dataInJSON);
    dataUser = data;
    return dataUser;
  } else {
  }
}

function showAllCards() {
  cards = document.querySelectorAll(".memoryCard");

  cards.forEach((card, index) => {
    if (index < totalCards / 2) {
      pathImage =
        arrayOfsrc[indexOfMemory].path +
        (index + 1) +
        arrayOfsrc[indexOfMemory].format;
      card.style.backgroundImage = pathImage;
    } else {
      pathImage =
        arrayOfsrc[indexOfMemory].path +
        (index - (totalCards / 2 - 1)) +
        arrayOfsrc[indexOfMemory].format;
      card.style.backgroundImage = pathImage;
    }
  });
}

let cardVisible = 0;

function playgame() {
  cardVisible = 0;
  nbShot = 0;
  makeBoardGame();
  cards.forEach((card) => {
    card.style.backgroundImage = "url(./images/ressources1/question.svg";
    card.style.order = getRandom(totalCards - 1);
    card.addEventListener("click", clickCard);
    card.classList.remove("visible");
  });
  let h6 = document.querySelector("h6");
  h6.innerText = "Manche 1";

  let h4Game = document.querySelector("h4");
  h4Game.innerText = "Clique ici ou barre espace pour recommencer";
  /* Le style à appliquer pour toute les cartes au même endroit
        card.style.position = "absolute" ;
        card.style.top = "0" ;
        card.style.left = "0" ;
        card.style.height = "20vmin" ;
        card.style.width = "20vmin" ; */
}

let card1, card2;
let timeoutID1, timeoutID2;

function clickCard(e) {
  let cardNumber = e.target.id;
  let cardClicked = document.getElementById(cardNumber);
  if (cardClicked.classList.contains("visible")) {
    alert("Tu as déjà retourné cette carte, choisis en une autre.");
  } else {
    // First card
    if (nbShot % 2 === 0) {
      clearTimeout(timeoutID1);
      clearTimeout(timeoutID2);
      makeInvisible(card1);
      makeInvisible(card2);
      makeVisible(cardNumber);
      firstCardCliked = cardNumber;
      card1 = firstCardCliked;
    }
    // Second card
    else {
      makeVisible(cardNumber);
      card2 = cardNumber;
      if (
        cardNumber == firstCardCliked - totalCards / 2 ||
        firstCardCliked == cardNumber - totalCards / 2
      ) {
        // paire ok
        card1 = undefined;
        card2 = undefined;
        cardVisible += 2;
      } else {
        showPair();
        makeVisible(cardNumber);
      }
    }
    nbShot++;
    let h6 = document.querySelector("h6");
    h6.innerText = "Manche " + Math.round(nbShot / 2);
    if (cardVisible == totalCards) {
      let h1Game = document.querySelector("h4");
      let score = nbShot / 2;
      if (dataUser.name != "Nomen nescio") saveParty(score);
      h1Game.innerText = "Tu as gagné en " + score + " manches !";
      if (dataUser.name != "Nomen nescio") updateUser(dataUser);
    }
  }
}

function makeVisible(cardNumber) {
  let imageNumber = cardNumber;

  cards[cardNumber - 1].classList.add("visible");
  if (cardNumber > totalCards / 2) {
    imageNumber = imageNumber - totalCards / 2;
  }
  cards[cardNumber - 1].style.backgroundImage =
    arrayOfsrc[indexOfMemory].path +
    imageNumber +
    arrayOfsrc[indexOfMemory].format;
}

function makeInvisible(cardNumber) {
  let imageNumber = cardNumber;
  console.log(cards);
  if (cardNumber !== undefined) {
    cards[cardNumber - 1].classList.remove("visible");
    if (cardNumber > totalCards / 2) {
      imageNumber = imageNumber - totalCards / 2;
    }
    cards[
      cardNumber - 1
    ].style.backgroundImage = `url(./images/ressources1/question.svg`;
  }
}

function showPair() {
  timeoutID1 = setTimeout(makeInvisible, 3000, card1);
  timeoutID2 = setTimeout(makeInvisible, 3000, card2);
}

function makeBoardGame() {
  let totalRow;
  let totalColumn;
  let sizeCase;
  let boardGameSection = document.querySelector(".boardGame");
  let memoryCard = document.querySelectorAll(".memoryCard");
  if (memoryCard.length > 0) {
    memoryCard.forEach((card) => card.remove());
  }

  if (totalCards == 12) {
    sizeCase = 20;
    totalRow = 3;
    totalColumn = 4;
  }
  if (totalCards == 16) {
    sizeCase = 20;
    totalRow = 4;
    totalColumn = 4;
  }
  if (totalCards == 20) {
    sizeCase = 15;
    totalRow = 4;
    totalColumn = 5;
  }
  if (totalCards == 46) {
    sizeCase = 15;
    totalRow = 4;
    totalColumn = 12;
  }
  if (totalCards == 52) {
    sizeCase = 15;
    totalRow = 4;
    totalColumn = 13;
  }
  if (totalCards == 54) {
    sizeCase = 15;
    totalRow = 6;
    totalColumn = 9;
  }

  boardGameSection.style.gridTemplateColumns = `repeat(${totalColumn}, ${sizeCase}vmin)`;
  boardGameSection.style.gridTemplateRows = `repeat(${totalRow}, ${sizeCase}vmin)`;
  for (let i = 1; i <= totalCards; i++) {
    let newDiv = document.createElement("div");
    newDiv.id = i;
    newDiv.classList.add("memoryCard");
    boardGameSection.appendChild(newDiv);
  }
  cards = document.querySelectorAll(".memoryCard");
}

function saveParty(totalPoint) {
  console.log("score " + totalPoint);
  let today = new Date();
  let todayFormat = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
  let memoryName = arrayOfsrc[indexOfMemory].name;
  let memorySize = totalCards + " cartes";

  let newScore = {
    pseudo: dataUser.name,
    score: totalPoint,
    taille: memorySize,
    memory: memoryName,
    date: todayFormat,
    dateheure: today,
  };

  if (dataUser["score"] !== undefined) {
    dataUser.score.push(newScore);
  } else {
    dataUser.score = [{ newScore }];
  }

  let currentMemoryScores = totalCards + "+" + indexOfMemory;
  let allScoresJSON = localStorage.getItem(currentMemoryScores);
  let allScores = JSON.parse(allScoresJSON);
  if (allScoresJSON !== null) {
    allScores.push(newScore);
    allScores.sort((a, b) => {
      let dateA = new Date(a.dateheure);
      let dateB = new Date(b.dateheure);

      if (a.score === b.score) {
        return dateA.getTime() - dateB.getTime();
      }
      return a.score - b.score;
    });
    allScores = allScores.slice(0, 5);
  } else {
    allScores = [newScore];
  }
  localStorage.setItem(currentMemoryScores, JSON.stringify(allScores));
  showbestScores();
}

//CCOLLER=======================
function updateUser(dataUser) {
  let usersJSON = localStorage.getItem("users");
  let users = JSON.parse(usersJSON);
  let currentUser = dataUser;
  let currentUserIndex = users.findIndex(
    (user) => user.name === currentUser.name
  );
  //Update change
  users[currentUserIndex] = currentUser;
  localStorage.setItem("users", JSON.stringify(users));

  // replace cookie puis charge new User
  let currentUserInJSON = JSON.stringify(currentUser);
  document.cookie = `currentUser=${currentUserInJSON}`;
}

function showbestScores() {
  let currentMemoryScores = totalCards + "+" + indexOfMemory;
  let allScoresJSON = localStorage.getItem(currentMemoryScores);
  let scores = JSON.parse(allScoresJSON);
  let scoreTable = document.querySelector("#scoreTable > tbody");
  while (scoreTable.firstChild) {
    scoreTable.removeChild(scoreTable.firstChild);
  }
  if (scores !== null && scores !== undefined) {
    scores.forEach((score) => {
      const NEWTR = document.createElement("tr");

      Object.keys(score).forEach((key) => {
        if (key !== "dateheure") {
          const NEWTD = document.createElement("td");
          const NEWCONTENT = document.createTextNode(score[key]); // Récupérer la valeur associée à la clé
          NEWTD.appendChild(NEWCONTENT);
          NEWTR.appendChild(NEWTD);
        }
      });
      scoreTable.appendChild(NEWTR);
    });
  }
}

function afficheSelect() {
  totalCards = dataUser.favoriteSize;
  indexOfMemory = dataUser.favoriteMemory;

  let favMemSrc = arrayOfsrc[dataUser.favoriteMemory];
  if (totalCards > favMemSrc.taille) {
    indexOfMemory = arrayOfsrc.findIndex(
      (memory) => memory.taille == totalCards
    );
  }

  let inputFavMem = document.getElementById("favoriteMemory");
  for (let i = 0; i < inputFavMem.options.length; i++) {
    if (inputFavMem.options[i].value == indexOfMemory) {
      inputFavMem.options[i].selected = true;
      break;
    }
  }

  let inputFavSize = document.getElementById("favoriteSize");
  for (let i = 0; i < inputFavSize.options.length; i++) {
    if (inputFavSize.options[i].value == dataUser.favoriteSize) {
      inputFavSize.options[i].selected = true;
      break;
    }
  }
}

function showGameBoard() {
  makeBoardGame();
  showAllCards();
  showbestScores();
}

function changeMemory(e) {
  indexOfMemory = e.target.value;
  totalCards = arrayOfsrc[indexOfMemory].taille;

  let inputFavSize = document.getElementById("favoriteSize");
  for (let i = 0; i < inputFavSize.options.length; i++) {
    if (inputFavSize.options[i].value == arrayOfsrc[indexOfMemory].taille) {
      inputFavSize.options[i].selected = true;
      break;
    }
  }
  //hide select options size
  let options = document.querySelectorAll("#favoriteSize option");
  options.forEach((element) => {
    if (arrayOfsrc[indexOfMemory].taille >= element.value) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });

  showGameBoard();
}

function changeSize(e) {
  totalCards = e.target.value;
  if (totalCards > arrayOfsrc[indexOfMemory].taille) {
    totalCards = arrayOfsrc[indexOfMemory].taille;
  }
  showGameBoard();
}
