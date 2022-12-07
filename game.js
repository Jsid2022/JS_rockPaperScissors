const startBtn = document.querySelector('#startGame');
const gameResultDiv = document.getElementById('gameResult');
const startDiv = document.querySelector('#startDiv');
const gameDiv = document.querySelector('#gameDiv');
const choicesDiv = document.getElementsByClassName('choicesDiv');
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
let playerS = playerScore.textContent;
let computerS = computerScore.textContent;
gameDiv.style.display = 'none';
let gameStarted = false;
let roundStatus = false;
gameResultDiv.style.display = "none";


startBtn.addEventListener('click', () => {
    startDiv.style.display = "none";
    gameDiv.style.display = 'flex';
    for (let i = 0; i < choicesDiv.length; i++) {
        choicesDiv[i].classList.add('transition');
        choicesDiv[i].classList.add('duration-700');
        choicesDiv[i].classList.add('hover:bg-black');
        choicesDiv[i].classList.add('hover:text-white');
        choicesDiv[i].classList.add('hover:cursor-pointer');
    }
    gameStarted = true;
    roundStatus = true;
})

const setPlayerChoice = (value) => {
    if (value == 0) {
        playerChoice.src = "images/rock.png";
    } else if (value == 1) {
        playerChoice.src = "images/scissors.png";
    } else {
        playerChoice.src = "images/paper.png";
    }
}

const setComputerChoice = () => {
    const randNo = Math.floor(Math.random() * 3);
    if (randNo == 0) {
        computerChoice.src = "images/rock.png";
    } else if (randNo == 1) {
        computerChoice.src = "images/scissors.png";
    } else {
        computerChoice.src = "images/paper.png";
    }
    return randNo;
}

const resetChoices = () => {
    playerChoice.src = "images/questionMark.png";
    computerChoice.src = "images/questionMark.png";
    roundStatus = true;
}

const startGameRound = (choice) => {
    if (gameStarted && roundStatus) {
        setPlayerChoice(choice);
        const randNo = setComputerChoice();

        if (choice != randNo) {
            if (choice === 0 && randNo === 1) {
                playerScore.textContent = ++playerS;
            } else if (choice === 1 && randNo === 0) {
                computerScore.textContent = ++computerS;
            } else if (choice === 1 && randNo === 2) {
                playerScore.textContent = ++playerS;
            } else if (choice === 2 && randNo === 1) {
                computerScore.textContent = ++computerS;
            } else if (choice === 2 && randNo === 0) {
                playerScore.textContent = ++playerS;
            } else {
                computerScore.textContent = ++computerS;
            }
        }
        roundStatus = false;
        setTimeout(resetChoices, 1000);

        if (playerScore.textContent == 3 || computerScore.textContent == 3) {
            if (playerScore.textContent == 3) {
                gameResultDiv.classList.remove('text-[red]');
                gameResultDiv.classList.add('text-[green]');
                gameResultDiv.textContent = "You Won !!";
            } else {
                gameResultDiv.classList.add('text-[red]');
                gameResultDiv.classList.remove('text-[green]');
                gameResultDiv.textContent = "Computer Won !!";
            }
            playerScore.textContent = 0;
            computerScore.textContent = 0;
            playerS = playerScore.textContent;
            computerS = computerScore.textContent;
            gameDiv.style.display = "none";
            startDiv.style.display = "flex";
            startBtn.textContent = "Play Again";
            gameResultDiv.style.display = "flex";
        }
    }
}