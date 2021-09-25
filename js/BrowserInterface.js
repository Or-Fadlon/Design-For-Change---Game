(function ($) {
  /************ Start hard coded settings ******************/

  var nonMatchingCardTime = 800; // How long a non matching card is displayed once clicked.
  var cardSize = 0;
  var cardsBuilt = 0;
  const gridSize = [2, 4];

  /************ End hard coded settings ******************/

  // Handle clicking on settings icon
  var settings = document.getElementById("memory--settings-icon");
  var modal = document.getElementById("memory--settings-modal");
  const enableSettings = function () {
    var settings = document.getElementById("memory--settings-icon");
    settings.style.visibility = "inherit";
  };
  const handleOpenSettings = function (event) {
    event.preventDefault();
    modal.classList.toggle("show");
  };
  settings.addEventListener("click", handleOpenSettings);

  // Handle settings form submit
  var aMode = document.getElementById("memory--settings-A");
  var bMode = document.getElementById("memory--settings-B");
  var reset = document.getElementById("memory--settings-reset");
  var reMix = document.getElementById("memory--settings-reMix");
  const handleStart = function (event) {
    enableSettings();
    event.preventDefault();

    var cards = $.initialize(gridSize[0], gridSize[1]);

    if (cards) {
      document
        .getElementById("memory--settings-modal")
        .classList.remove("show");
      document
        .getElementById("memory--end-game-modal")
        .classList.remove("show");
      document.getElementById("memory--end-game-message").innerText = "";
      document.getElementById("memory--end-game-score").innerText = "";
      buildLayout($.cards, $.settings.rows, $.settings.columns);
    }
  };
  const handleModeSelectA = function (event) {
    document.getElementById("memory--Select-Age").classList.remove("show");
    //Aהמקום החשוב ביותר לבחירת מוד
  };
  const handleModeSelectB = function (event) {
    document.getElementById("memory--Select-Age").classList.remove("show");
    //Bהמקום החשוב ביותר לבחירת מוד
  };

  aMode.addEventListener("click", handleModeSelectA);
  bMode.addEventListener("click", handleModeSelectB);
  reset.addEventListener("click", handleStart);
  reMix.addEventListener("click", handleStart);

  // Handle clicking on card
  const handleSelectCard = function (event) {
    event.preventDefault();

    var status = $.play(this.index);
    console.log(status);

    if (status.code != 0) {
      this.classList.toggle("clicked");
    }

    if (status.code == 3) {
      setTimeout(
        function () {
          var childNodes = document.getElementById("memory--cards").childNodes;
          childNodes[status.args[0]].classList.remove("clicked");
          childNodes[status.args[1]].classList.remove("clicked");
        }.bind(status),
        nonMatchingCardTime
      );
    } else if (status.code == 4) {
      var score = parseInt((($.attempts - $.mistakes) / $.attempts) * 100, 10);
      var message = getEndGameMessage(score);

      document
        .getElementById("memory--end-game-modal")
        .classList.toggle("show");
    }
  };

  // end message
  const getEndGameMessage = function (score) {
    var message = "";

    if (score == 100) {
      message = "Amazing job!";
    } else if (score >= 70) {
      message = "Great job!";
    } else if (score >= 50) {
      message = "Great job!";
    } else {
      message = "You can do better.";
    }

    return message;
  };

  // Build grid of cards
  const buildLayout = function (cards, rows, columns) {
    if (!cards.length) {
      return;
    }

    var memoryCards = document.getElementById("memory--cards");
    var index = 0;

    var cardMaxWidth =
      document.getElementById("memory--app-container").offsetWidth / columns;
    var cardHeightForMaxWidth = cardMaxWidth * (2 / 4);

    var cardMaxHeight =
      document.getElementById("memory--app-container").offsetHeight / rows;
    var cardWidthForMaxHeight = cardMaxHeight * (4 / 2);

    // Clean up. Remove all child nodes and card clicking event listeners.
    while (memoryCards.firstChild) {
      memoryCards.firstChild.removeEventListener("click", handleSelectCard);
      memoryCards.removeChild(memoryCards.firstChild);
    }

    cardSize = rows * columns;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        // Use cloneNode(true) otherwise only one node is appended
        memoryCards.appendChild(
          buildCardNode(
            index,
            cards[index],
            100 / columns + "%",
            100 / rows + "%"
          )
        );
        index++;
        cardsBuilt++;
      }
    }

    // Resize cards to fit in viewport
    if (cardMaxHeight > cardHeightForMaxWidth) {
      // Update height
      memoryCards.style.height = cardHeightForMaxWidth * rows + "px";
      memoryCards.style.width =
        document.getElementById("memory--app-container").offsetWidth + "px";
      memoryCards.style.top =
        (cardMaxHeight * rows - cardHeightForMaxWidth * rows) / 2 + "px";
    } else {
      // Update Width
      memoryCards.style.width = cardWidthForMaxHeight * columns + "px";
      memoryCards.style.height =
        document.getElementById("memory--app-container").offsetHeight + "px";
      memoryCards.style.top = 0;
    }
  };

  // Update on resize
  window.addEventListener(
    "resize",
    function () {
      buildLayout($.cards, $.settings.rows, $.settings.columns);
    },
    true
  );

  // Build single card
  const buildCardNode = function (index, card, width, height) {
    var flipContainer = document.createElement("li");
    var flipper = document.createElement("div");
    var front = document.createElement("a");
    var back = document.createElement("a");
    var words = document.createElement("p");
    var textW = card.word;

    flipContainer.index = index;
    flipContainer.style.width = width;
    flipContainer.style.height = height;
    flipContainer.classList.add("flip-container");
    words.classList.add("words-style");
    if (card.isRevealed) {
      flipContainer.classList.add("clicked");
    }

    if (card.isHidden) {
      flipContainer.classList.add("hidden");
    }

    flipper.classList.add("flipper");
    front.classList.add("front");
    if (card.mean.localeCompare("Feel") == 0) {
      front.classList.add("Feel");
      words.appendChild(document.createTextNode(textW));
      front.appendChild(words);
    } else {
      front.classList.add("Do");
      words.appendChild(document.createTextNode(textW));
      front.appendChild(words);
    }
    front.setAttribute("href", "#");
    back.classList.add("back");
    back.classList.add("card-" + card.value);
    if (card.isMatchingCard) {
      back.classList.add("matching");
    }
    back.setAttribute("href", "#");

    flipper.appendChild(front);
    flipper.appendChild(back);
    flipContainer.appendChild(flipper);

    flipContainer.addEventListener("click", handleSelectCard);

    return flipContainer;
  };
})(MemoryGame);
