let cards = document.querySelectorAll(".card");
let isFlipped = false;
let timerInterval, timeLeft, score, matches, firstCard, secondCard;
let scoreElement = document.getElementById("score");
let messageElement = document.getElementById("win-message");
const timerElement = document.getElementById("timer");

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = `Time Left: ${timeLeft}s`;
        } else {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

function success() {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    score += 10;
    document.getElementById("score").textContent = `Score: ${score}`;
    reset();
    const allFlipped = [...cards].every((card) => card.classList.contains("flip"));
    if (allFlipped) {
        endGame(true);
    }
}

function flip() {
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkIt();
}

function checkIt() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        success();
        scoreElement.textContent = `Score: ${score}`;
    } else {
        fail();
    }
}

function fail() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
    }, 800);
}

function reset() {
    isFlipped = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

function endGame(win) {
    clearInterval(timerInterval);
    messageElement.style.display = "block";
    messageElement.textContent = win ? `Congratulations😀! You won with a score of ${score}! You made it in ${180 - timeLeft}s` : `Time's up! Better luck next time 👍`;
    cards.forEach((card) => card.removeEventListener("click", flip));
}

function initGame() {
    matches = 0;
    score = 0;
    timeLeft = 180;
    timerElement.textContent = "Time Left: 180s";
    scoreElement.textContent = "Score: 0";
    messageElement.style.display = "none";
    cards.forEach((card) => {
        card.classList.remove("flip");
        card.addEventListener("click", flip);
    });
    startTimer();
}
initGame();