function PlayingCard(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

PlayingCard.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4});
PlayingCard.Rank = enumeration({
    Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9,
    Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14
});

PlayingCard.extend({
    orderByRank: function (a, b) {
        return a.compareTo(b);
    },
    orderBySuit: function (a, b) {
        return a.compareAsInBridge(b);
    }
});

PlayingCard.extendPrototype({
    compareAsInBridge: function(that){
        return this.suit - that.suit || this.rank - that.rank;
    },
    compareTo: function (that) {
        return this.rank - that.rank;
    },
    toString: function () {
        return this.rank.toString() + ' of ' + this.suit.toString();
    }
});