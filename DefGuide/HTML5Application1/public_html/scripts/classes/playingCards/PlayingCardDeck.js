/* global PlayingCard */

function PlayingCardDeck() {
    var cards = this.cards = [];
    PlayingCard.Suit.forEach(function (suit) {
        PlayingCard.Rank.forEach(function (rank) {
            cards.push(new PlayingCard(suit, rank));
        });
    });
}

PlayingCardDeck.extendPrototype({
    createNewDeck: function(){
        return (new PlayingCardDeck()).shuffle();
    },
    deal: function(n){
        if (this.cards.length < n){
            throw new Error ("Out of cards");
        }
        return this.cards.splice(this.cards.length - n, n);
    },
    dealBridgeHand: function(deck){
        return deck.deal(13).sort(PlayingCard.orderBySuit);
    },
    shuffle : function(){
        var deck = this.cards;
        var length = deck.length;
        for (var index = length - index; index > 0; index--){
            var randomCard = Math.floor(Math.random() * (index + 1));
            var swappedCard = deck[index];
            deck[index] = deck[randomCard];
            deck[randomCard] = swappedCard;
        }
        return this;
    }
});