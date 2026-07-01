/*------------------------ Cached Element References ------------------------*/
const allCards = document.querySelectorAll('.Card');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('#resetButton');
const theTime = document.querySelector('#time');

/*-------------------------------- Variables --------------------------------*/
const names = [
    './pic1.png', './pic2.png', './pic3.png', 
    './pic4.png', './pic5.png', './pic6.png',
    './pic1.png', './pic2.png', './pic3.png', 
    './pic4.png', './pic5.png', './pic6.png'
];

let firstCard;
let secondCard;
let timerId;
let timeLeft = 60;
let matchedPair = 0;
const TOTAL_PAIRS = 6; 

/*-------------------------------- Functions --------------------------------*/

function startTime() {
    timerId = setInterval(() => {
        timeLeft--;
        theTime.textContent = `${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timerId);
            alert("Game Over!");
        }
    }, 1000);
}

function startGame() {
    allCards.forEach((card, index) => {
        card.src = names[index];
    });

    setTimeout(() => {
        allCards.forEach((card) => {
            card.src = './OIP.webp';
        });
        startTime();
    }, 5000);
}

function resetGame() {
    clearInterval(timerId); // Fixed: Safely resets the ticking timer loop
    timeLeft = 60;
    theTime.textContent = "60 seconds";
    firstCard = null;
    secondCard = null;
    matchedPair = 0;

    allCards.forEach((card) => {
        card.src = './OIP.webp';
    });

    names.sort(() => Math.random() - 0.5);
}

function handleClick(event, index) {
    if (!firstCard && !secondCard) {
        event.target.src = names[index];
        firstCard = event.target;
    } 
    else if (firstCard && !secondCard) {
        event.target.src = names[index];
        secondCard = event.target;
        
        if (firstCard.src === secondCard.src) { 
            matchedPair++; 
            
            if (matchedPair === TOTAL_PAIRS) {
                setTimeout(() => {
                    window.location.href = "win.html";
                }, 300);
            }
            firstCard = null;
            secondCard = null;
        } 
        else {
            setTimeout(() => {
                firstCard.src = 'OIP.webp';
                secondCard.src = 'OIP.webp';
                firstCard = null;
                secondCard = null;
            }, 2000);
        }
    }
}

/*----------------------------- Event Listeners -----------------------------*/
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

allCards.forEach((card, index) => {
    card.addEventListener('click', (event) => {
        handleClick(event, index);
    });
});