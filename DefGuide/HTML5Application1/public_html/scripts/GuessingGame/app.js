/* global State, eventHelper */

(function () {
    var state;
    var ui;

    function newGame(playAgain) {
        state = new State();

        ui = new UI(state);
        ui.display();
        ui.input.onchange = function () {
            try {
                state.handleGuess(parseInt(ui.input.value));
                ui.display();
            } catch (e) {
                alert(e);
            }
        };
        ui.playAgain.onclick = function () {
            newGame(true);
        };

        if (playAgain) {
            state.save();
        }
    }

    window.onload = newGame;
    window.onpopstate = function (event) {
        ui.state = state = State.pop(event);
        ui.display();
    };
}());
