const jsonFilePath = 'data.json'; // Update with your JSON file path

let flashcards = [];
let currentCardIndex = 0;
let score = 0;
let mistakeCount = 0;

const word = document.getElementById('word');
const answerInput = document.getElementById('answerInput');
const checkButton = document.getElementById('check');
const progressElement = document.getElementById('progress');
const scoreElement = document.getElementById('score');
const mistakesElement = document.getElementById('mistakes');
const title = document.getElementById('title');

function loadFlashcardsFromJSON() {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            showCard();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showCard() {
    const currentCard = flashcards[currentCardIndex];
    word.textContent = currentCard.Spanish.charAt(0).toUpperCase() + currentCard.Spanish.slice(1);
    title.textContent = "Spanish";
    answerInput.value = "";
    updateProgress();
}

function markAsKnown() {
    currentCardIndex++;
    if (currentCardIndex >= flashcards.length) {
        currentCardIndex = 0;
    }
    score++;
    updateScore();
    showCard();
}

function goToNextCard() {
    checkButton.disabled = false;
    currentCardIndex++;
    if (currentCardIndex >= flashcards.length) {
        currentCardIndex = 0;
    }
    showCard();
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateProgress() {
    progressElement.textContent = `Progress: ${currentCardIndex + 1} / ${flashcards.length}`;
}

function checkAnswer() {
    const currentCard = flashcards[currentCardIndex];
    const playerAnswer = answerInput.value.trim();


    if (playerAnswer.toLowerCase() === currentCard.English.toLowerCase()) {
        score++;
        updateScore();
    } else {
        mistakeCount++;
        updateMistakes();
    }
    word.textContent =  `The Correct Answer is: ${currentCard.English}`;
    title.textContent = "English";
    checkButton.disabled = true;
    setTimeout(goToNextCard, 3000);
}

function updateMistakes() {
    mistakesElement.textContent = `Mistakes: ${mistakeCount}`;
}

checkButton.addEventListener('click', checkAnswer);


answerInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (answerInput.value.trim() === '') {
        alert('Please enter an answer.');
      } else {
        checkButton.click();
      }
    }
  });  

loadFlashcardsFromJSON();
updateScore();
updateMistakes();
