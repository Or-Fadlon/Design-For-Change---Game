/**
 * @namespace Card object
 */
MemoryGame.Card = function (value, isMatchingCard, mean, word, arrayIndex) {
  this.value = value;
  this.isRevealed = false;
  this.isHidden = false;
  this.mean = mean;
  this.word = word;
  this.arrayIndex = arrayIndex;

  if (isMatchingCard) {
    this.isMatchingCard = true;
  }

  this.reveal = function () {
    this.isRevealed = true;
  };

  this.conceal = function () {
    this.isRevealed = false;
  };

  this.match = function () {
    this.isHidden = true;
  };
};
