const state = {
    view: {
        timeLeft: document.querySelector("#time-left"),
    },
    values: {
        currentTime: 0,
    },
    action: {
        countDownTimerId: setInterval(countDown, 1000),
    },
    
};

const avancado = [
    "😺",
    "😺",
    "🐵",
    "🐵",
    "🐺",
    "🐺",
    "🐯",
    "🐯",
    "🦒",
    "🦒",
    "🐶",
    "🐶",
    "🐱‍👤",
    "🐱‍👤",
    "🐱‍🐉",
    "🐱‍🐉",
    "🐷",
    "🐷",
    "🐼",
    "🐼",
    "🐴",
    "🐴",
    "🦓",
    "🦓",
    "🐸",
    "🐸",
    "🐔",
    "🐔",
    "🐨",
    "🐨",
    "🐮",
    "🐮",
    "🐗",
    "🐗",
    "🐹",
    "🐹",
    "🐰",
    "🐰",
    "🐻",
    "🐻",
];

let emojis = avancado;

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));


for (let i = 0; i < emojis.length; i++) {
    
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;    
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
        
    }
}

function checkMatch() {
    if (openCards[0].innerHTML == openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");        
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");        
    }
    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert(`Voce venceu! gastou ${state.view.timeLeft.textContent} segundos para resolver.`);
        clearInterval(state.action.countDownTimerId);
        state.values.currentTime = 0;
    }
}

function countDown() {
    state.values.currentTime++;
    state.view.timeLeft.textContent = state.values.currentTime;
}
