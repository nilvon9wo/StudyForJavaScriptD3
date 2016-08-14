function UI(state) {
    var self = this;
    ['heading', 'prompt', 'input', 'low', 'mid', 'high', 'playAgain'].forEach(function (id) {
        self[id] = document.getElementById(id);
    });

    this.state = state;
    this.playAgain.style.visibility = 'hidden';
}

UI.method('display', function () {
    this.heading.innerHTML = document.title =
            'I\'m thinking of a number between ' +
            this.state.low + ' and ' + this.state.high + '.';

    this.low.style.width = this.state.low + '%';
    this.mid.style.width = (this.state.high - this.state.low) + '%';
    this.high.style.width = (100 - this.state.high) + '%';

    this.input.style.visibility = 'visible';
    this.input.value = '';
    this.input.focus();

    this.updatePrompt();
});

UI.method('updatePrompt', function () {
    if (!this.state.lastGuess && this.state.lastGuess !== 0) {
        this.prompt.innerHTML = 'Type your guess and hit Enter: ';
    } else if (this.state.lastGuess < this.state.n) {
        this.prompt.innerHTML = this.state.lastGuess + ' is too low.  Guess again: ';
    } else if (this.state.lastGuess > this.state.n) {
        this.prompt.innerHTML = this.state.lastGuess + ' is too high.  Guess again: ';
    } else {
        this.input.style.visibility = 'hidden';
        this.heading.innerHTML = document.title = this.state.lastGuess + ' is correct! ';
        this.prompt.innerHTML = 'You Win!';
        this.playAgain.style.visibility = 'visible';
    }
});