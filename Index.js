
// Adds the dependencies: one from npm and one to the constructor word.js which in turn calls the letter.js constructor

var Word = require("./word.js");
var inquirer = require("inquirer");


// letters entry
 var letterArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from

var words = ["batter", "pitcher", "catcher", "ball", "outfielder", "shortstop", "bullpen", "lineup", "manager", "pitch", "plate", "steal", "strike", "curveball", "knuckleball","fastball", "doubleheader", "inning", "hardball"];

// Pick Random index from words array
var currentWordIndex = Math.floor(Math.random() * words.length);
var currentWord = words[currentWordIndex];

// Pass random word through Word constructor
selectedWord = new Word(currentWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function gameLogic() {

    // Provides a new word to the Word constructor as needed
    if (requireNewWord) {
        // Selects the word from the words array
        var currentWordIndex = Math.floor(Math.random() * words.length);
        var currentWord = words[currentWordIndex];

        // Passes current word through the Word constructor
        selectedWord = new Word(currentWord);
        
        requireNewWord = false;
    }


    // Create a wordComplete array to test and see if user gets it right
    var wordComplete = [];

    selectedWord.objArray.forEach(completeCheck);
    // console.log("completeCheck has just finished iterating here " + wordComplete);
    
    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    gameLogic();
                } else {

                   
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        gameLogic();
                    } else {

                        // An array to letter guesses to check
                        var wordCheckArray = [];

                        // get the user's input
                        selectedWord.userGuess(input.userinput);

                        // Checks if guess is correct
                        selectedWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        selectedWord.log();

                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function 
                            gameLogic();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }


                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

//    completeCheck checks the keys pushes them to the wordComplete array
    function completeCheck(key) {
        // console.log( "We are in complete check and key is " + key);
        wordComplete.push(key.guessed);
        // console.log("Key guessed is " + key.guessed + " this added to: "+ wordComplete);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                gameLogic();
            } else {
                return
            }
        })
}

gameLogic();