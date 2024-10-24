// DOM Elements
const playerInput = document.getElementById("playerInput");
const numPlayersInput = document.getElementById("numPlayers");
const playerNamesDiv = document.getElementById("playerNames");
const startGameBtn = document.getElementById("startGameBtn");
const quizSection = document.getElementById("quiz");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const submitAnswerBtn = document.getElementById("submitAnswerBtn");
const currentPlayerText = document.getElementById("currentPlayer");
const resultsSection = document.getElementById("results");
const scoreboardDiv = document.getElementById("scoreboard");
const winnerText = document.getElementById("winner");
const playAgainBtn = document.getElementById("playAgainBtn");

let players = [];
let currentQuestionIndex = 0;
let currentPlayerIndex = 0;
let selectedChords = [];
let scores = [];
let totalQuestions = 0;
let questionsPerPlayer = 0;

// List of 20 chord questions with their notes and options
const chordsQuiz = [
    {
      chord: "Gm",
      correct: "G, Bb, D",
      options: {
        a: "G, B, E",
        b: "G, Bb, E",
        c: "G, A, C",
        d: "G, Bb, D",
      },
    },
    {
      chord: "C Major",
      correct: "C, E, G",
      options: {
        a: "C, Eb, G",
        b: "C, E, G",
        c: "C, D, G",
        d: "C, E, A",
      },
    },
    {
      chord: "A Minor",
      correct: "A, C, E",
      options: {
        a: "A, C#, E",
        b: "A, C, E",
        c: "A, D, F",
        d: "A, B, D",
      },
    },
    {
      chord: "D Major",
      correct: "D, F#, A",
      options: {
        a: "D, F, A",
        b: "D, F#, G",
        c: "D, F#, A",
        d: "D, G, A",
      },
    },
    {
      chord: "E Minor",
      correct: "E, G, B",
      options: {
        a: "E, G#, B",
        b: "E, G, B",
        c: "E, A, C",
        d: "E, G, D",
      },
    },
    {
      chord: "F Major",
      correct: "F, A, C",
      options: {
        a: "F, A, C",
        b: "F, G, C",
        c: "F, A, D",
        d: "F, Ab, C",
      },
    },
    {
      chord: "E Major",
      correct: "E, G#, B",
      options: {
        a: "E, A, C#",
        b: "E, G, B",
        c: "E, G#, B",
        d: "E, F#, B",
      },
    },
    {
      chord: "B Minor",
      correct: "B, D, F#",
      options: {
        a: "B, D, G",
        b: "B, D, F#",
        c: "B, E, F#",
        d: "B, F, G",
      },
    },
    {
      chord: "D Minor",
      correct: "D, F, A",
      options: {
        a: "D, F, G",
        b: "D, F, A",
        c: "D, G, A",
        d: "D, F#, A",
      },
    },
    {
      chord: "A Major",
      correct: "A, C#, E",
      options: {
        a: "A, C, E",
        b: "A, D, F",
        c: "A, C#, E",
        d: "A, B, E",
      },
    },
    {
      chord: "Bb Major",
      correct: "Bb, D, F",
      options: {
        a: "Bb, C#, F",
        b: "Bb, D, F",
        c: "Bb, D, G",
        d: "Bb, F, A",
      },
    },
    {
      chord: "F Minor",
      correct: "F, Ab, C",
      options: {
        a: "F, A, C",
        b: "F, Ab, C",
        c: "F, G#, B",
        d: "F, G, C",
      },
    },
    {
      chord: "G Major",
      correct: "G, B, D",
      options: {
        a: "G, Bb, D",
        b: "G, A, D",
        c: "G, B, D",
        d: "G, C, D",
      },
    },
    {
      chord: "C Minor",
      correct: "C, Eb, G",
      options: {
        a: "C, E, G",
        b: "C, D, G",
        c: "C, Eb, G",
        d: "C, F, G",
      },
    },
    {
      chord: "B Major",
      correct: "B, D#, F#",
      options: {
        a: "B, D, F#",
        b: "B, E, G#",
        c: "B, D#, F#",
        d: "B, D#, A",
      },
    },
    {
      chord: "Eb Major",
      correct: "Eb, G, Bb",
      options: {
        a: "Eb, G, Bb",
        b: "Eb, Ab, C",
        c: "Eb, F, Bb",
        d: "Eb, G, C",
      },
    },
    {
      chord: "F# Minor",
      correct: "F#, A, C#",
      options: {
        a: "F#, A#, C#",
        b: "F#, A, B",
        c: "F#, A, C#",
        d: "F#, G, C",
      },
    },
    {
      chord: "Ab Major",
      correct: "Ab, C, Eb",
      options: {
        a: "Ab, Bb, Eb",
        b: "Ab, C, D",
        c: "Ab, C, F",
        d: "Ab, C, Eb",
      },
    },
    {
      chord: "C# Minor",
      correct: "C#, E, G#",
      options: {
        a: "C#, E, G#",
        b: "C#, F, A",
        c: "C#, D, G",
        d: "C#, E, A",
      },
    },
    {
      chord: "D# Minor",
      correct: "D#, F#, A#",
      options: {
        a: "D#, G, A#",
        b: "D#, F#, B",
        c: "D#, F#, A#",
        d: "D#, F, A#",
      },
    },
  ];

// Shuffle function to randomize questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate player name inputs dynamically based on the number of players
numPlayersInput.addEventListener("input", function () {
    playerNamesDiv.innerHTML = "";
    for (let i = 0; i < numPlayersInput.value; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Player ${i + 1} Name`;
        input.id = `player${i + 1}`;
        playerNamesDiv.appendChild(input);
    }
});

// Start the game
startGameBtn.addEventListener("click", function () {
    players = [];
    for (let i = 0; i < numPlayersInput.value; i++) {
        const playerName = document.getElementById(`player${i + 1}`).value || `Player ${i + 1}`;
        players.push(playerName);
    }
    initializeGame();
});

// Initialize the game
function initializeGame() {
    playerInput.classList.add("hidden");
    quizSection.classList.remove("hidden");
    scores = players.map(() => 0); // Initialize scores to 0 for all players
    selectedChords = shuffle([...chordsQuiz]); // Shuffle the questions
    totalQuestions = selectedChords.length;
    questionsPerPlayer = Math.floor(totalQuestions / players.length);

    currentQuestionIndex = 0;
    currentPlayerIndex = 0;

    showQuestion();
}

// Display a question
function showQuestion() {
    const chord = selectedChords[currentQuestionIndex];
    currentPlayerText.textContent = `${players[currentPlayerIndex]}'s turn!`;
    questionText.textContent = `What are the notes in the ${chord.chord} chord?`;

    // Display answer options
    optionsDiv.innerHTML = "";
    for (let option in chord.options) {
        const div = document.createElement("div");
        div.innerHTML = `<input type="radio" name="answer" value="${option}"> ${chord.options[option]}`;
        optionsDiv.appendChild(div);
    }
}

// Submit an answer
submitAnswerBtn.addEventListener("click", function () {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    const chord = selectedChords[currentQuestionIndex];
    const answer = selectedOption.value;

    // Validate the answer
    if (chord.options[answer] === chord.correct) {
        scores[currentPlayerIndex]++;
        selectedOption.parentElement.classList.add("correct");
    } else {
        selectedOption.parentElement.classList.add("wrong");
    }

    // Move to next player and question
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentQuestionIndex++;

    if (currentQuestionIndex >= totalQuestions) {
        showResults();
    } else {
        setTimeout(showQuestion, 1000); // Wait a second before showing next question
    }
});

// Show the final results
function showResults() {
    quizSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");

    scoreboardDiv.innerHTML = "";
    players.forEach((player, index) => {
        const score = scores[index];
        const div = document.createElement("div");
        div.textContent = `${player}: ${score} / ${questionsPerPlayer}`;
        scoreboardDiv.appendChild(div);
    });

    const maxScore = Math.max(...scores);
    const winners = players.filter((_, index) => scores[index] === maxScore);

    if (winners.length > 1) {
        winnerText.textContent = `It's a tie between: ${winners.join(", ")}!`;
    }
    else {
        winnerText.textContent = `The winner is: ${winners[0]}!`;
    }
}
