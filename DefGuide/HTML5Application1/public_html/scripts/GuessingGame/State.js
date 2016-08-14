function State() {
    this.n = Math.floor(99 * Math.random()) + 1;
    this.low = 0;
    this.high = 100;
    this.guessNumber = 0;
    this.lastGuess = undefined;
}

State.pop = function (event) {
    if (event.state) {
        var state = event.state;
        return state;
    } else {
        history.replaceState(state, '', '#guess' + state.guessNumber);
    }
};

State.method('handleGuess', function (guess) {
    if ((guess > this.low) && (guess < this.high)) {
        if (guess < this.n) {
            this.low = guess;
        } else if (guess > this.n) {
            this.high = guess;
        }
        this.lastGuess = guess;
        this.guessNumber++;
        this.save();
    } else {
        throw new Error('Please enter a number greater than ' + this.low +
                ' and less than ' + this.high);
    }
});


State.method('save', function () {
    if (!history.pushState) {
        return;
    }
    var url = '#guess' + this.guessNumber;
    history.pushState(this, '', url);
});

