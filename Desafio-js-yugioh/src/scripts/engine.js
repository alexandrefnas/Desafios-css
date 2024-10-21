const state = {
    score: {
        playerScore: 0,
        computeScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardsSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX:  document.querySelector("#computer-cards"),
    },
    action: {
        button: document.getElementById("next-duel"),        
    }
};

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1,4],
        LoseOf: [2,5],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2,5],
        LoseOf: [0,3],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0,3],
        LoseOf: [1,4],
    },
    {
        id: 3,
        name: "skidragon",
        type: "paper",
        img: `${pathImages}skidragon.png`,
        WinOf: [1,4],
        LoseOf: [2,5],
    },
    {
        id: 4,
        name: "tormentor",
        type: "rock",
        img: `${pathImages}tormentor.png`,
        WinOf: [2,5],
        LoseOf: [0,3],
    },
    {
        id: 5,
        name: "dragonofRa",
        type: "Scissors",
        img: `${pathImages}dragonofRa.png`,
        WinOf: [0,3],
        LoseOf: [1,4],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });
        
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await ShowHiddenCardFieldsImages(true);

    await drawCardsInField(cardId, computerCardId);

    await hiddenCardDetails();

    let duelResults = await checkDuelResults(cardId, computerCardId);
    await updateScore();
    await drawButton(duelResults);
}

async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function ShowHiddenCardFieldsImages(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";          
    }
    if (value === false) {        
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardDetails() {
    state.cardsSprites.avatar.src = `${pathImages}card-back.png`;
    state.cardsSprites.name.innerText = "";
    state.cardsSprites.type.innerText = "";
}

async function drawButton(text) {
    state.action.button.innerText = text.toUpperCase();
    state.action.button.style.display = "block"    
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computeScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    for (let i = 0; i < playerCard.WinOf.length; i++){
        if (playerCard.WinOf.includes(computerCardId)) {
            duelResults = "win";       
            state.score.playerScore++;
        }
    }

    for (let i = 0; i < playerCard.LoseOf.length; i++) {
        if (playerCard.LoseOf.includes(computerCardId)) {
            duelResults = "lose";
            state.score.computeScore++;
        }
    }
    await playAudio(duelResults);
    return duelResults;
}

async function removeAllCardsImages() {
    let {computerBOX, player1Box} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    
    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
    state.cardsSprites.avatar.src = cardData[index].img;
    state.cardsSprites.name.innerText = cardData[index].name;
    state.cardsSprites.type.innerText = "Attibute : " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardsSprites.avatar.src = `${pathImages}card-back.png`;
    state.action.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {        
        audio.play();
    }
    catch{}
}

function init() {
    state.cardsSprites.avatar.src = `${pathImages}card-back.png`;
    ShowHiddenCardFieldsImages(false);
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);
    const bgm = document.getElementById("bgm");    
    // bgm.play();    
}

init();