// get all elements from html
const startBtn = document.querySelector('#startGame');
const gameResultDiv = document.getElementById('gameResult');
const startDiv = document.querySelector('#startDiv');
const gameDiv = document.querySelector('#gameDiv');
const choicesDiv = document.getElementsByClassName('choicesDiv');
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');

// Hide game div and result div
gameDiv.style.display = 'none';
gameResultDiv.style.display = "none";

// set both players score to 0
let playerS = playerScore.textContent;
let computerS = computerScore.textContent;

// variables necessary to manage game rounds
let gameStarted = false;
let roundStatus = false;


// on click (start button)
startBtn.addEventListener('click', () => {
    // hide start div
    startDiv.style.display = "none";
    // and display the game div
    gameDiv.style.display = 'flex';
    // add hover classes to images
    for (let i = 0; i < choicesDiv.length; i++) {
        choicesDiv[i].classList.add('transition');
        choicesDiv[i].classList.add('duration-700');
        choicesDiv[i].classList.add('hover:bg-black');
        choicesDiv[i].classList.add('hover:text-white');
        choicesDiv[i].classList.add('hover:cursor-pointer');
    }

    // set game status to true (game started)
    gameStarted = true;
    roundStatus = true;
})

// This function will set Player Choice
const setPlayerChoice = (value) => {
    if (value == 0) {
        playerChoice.src = "images/rock.png";
    } else if (value == 1) {
        playerChoice.src = "images/scissors.png";
    } else {
        playerChoice.src = "images/paper.png";
    }
}

// This function will set computer choice (Randomly)
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

// This function will reset choices of both player and computer
const resetChoices = () => {
    playerChoice.src = "images/questionMark.png";
    computerChoice.src = "images/questionMark.png";
    roundStatus = true;
}

// Start game function
const startGameRound = (choice) => {

    if (gameStarted && roundStatus) {
        setPlayerChoice(choice);
        const randNo = setComputerChoice();

        // Decide the winner of round according to choices
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

        // after choice selection pause the game for 1 second
        roundStatus = false;
        setTimeout(resetChoices, 1000);

        // Make changes to DOM if game is over
        if (playerScore.textContent == 3 || computerScore.textContent == 3) {
            if (playerScore.textContent == 3) {
                gameResultDiv.classList.remove('text-[red]');
                gameResultDiv.classList.add('text-[green]');
                gameResultDiv.textContent = "You Won!!";
            } else {
                gameResultDiv.classList.add('text-[red]');
                gameResultDiv.classList.remove('text-[green]');
                gameResultDiv.textContent = "Computer Won!!";
            }
            // reset scores
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