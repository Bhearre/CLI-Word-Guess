// Letter Constructor

function Letter(value) {
    this.letter = value;
    this.guessed = false;
    this.toString = function () {
        
        // console.log("Letter constructor: this letter is " + this.letter);
        if (this.letter === " ") {
            this.guessed = true;
            // console.log("Letter Constructor if this.letter === ' ' ");
            return " ";

        } else {
            if (this.guessed === false) {
                // console.log("Letter Constructor if this.guessed is false");

                return "_";

            } else {
                // console.log("In Letter Constructor and guess is correct");
                return this.letter;

            }
        }
    };
    
    this.guess = function (guess) {
        if (guess === this.letter) {
            this.guessed = true;
            console.log("");
            // console.log("in Letter constructor this.guess and this.guessed is true");

        }
    }
}


module.exports = Letter;