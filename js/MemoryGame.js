/**
 * @namespace The main application object
 */
const cardsDataList = [
  {
    feel: "רצינו דשא סינתטי למגרש המשחקים",
    do: "קמפיין חיסכון מים וחשמל",
    link: "ASRb4pgbB0M",
  },
  {
    feel: "אנשים שקופים",
    do: "עיצוב חלוק עבודה",
    link: "2x66mDMtko8",
  },
  {
    feel: "חוסר שיוון מגדרי",
    do: "הקמת קבוצת כדורגל תחרותית",
    link: "mZeeiJ1_dkw",
  },
  {
    feel: "כלבים משוטטים",
    do: "הקמת פינת ליטוף",
    link: "Wk5SEbaUq5s",
  },
  {
    feel: "מי מכין את הכריכים הנמצאים מידי בוקר על דלת בית הספר?",
    do: "גידול ירקות כתרומה לעמותה",
    link: "1j674KlPTSc",
  },
  {
    feel: "אין נגישות לממתקים מתי שרוצים",
    do: "הקמת בוסתן קהילתי",
    link: "WoXJHHcy9ZE",
  },
  {
    feel: "קשיי המעבר בין הגן לבית הספר",
    do: "הפסקה פעילה",
    link: "4Bq7cVX9gw4",
  },
  {
    feel: "בזבוז מזון ואכילה לא בריאה",
    do: "ניצול יעיל של שאריות מזון כקומפוסט",
    link: "EL8TRhZACyc",
  },
  {
    feel: "ילדים באים בלי מצב רוח לבית הספר",
    do: "ספר מתכונים",
    link: "xI_JqHSbMMY",
  },
  {
    feel: "לא נעים לטייל בפארק סביב האגם",
    do: "עיצוב פחי אשפה",
    link: "KTRPCeScVhU",
  },
  {
    feel: "בעיית תקשורת עם סבתי החרשת",
    do: "לומדים ומלמדים שפה חדשה",
    link: "UDa5Dts2efc",
  },
  {
    feel: "לא קוראים ספרים",
    do: "הפיכה לספרייה",
    link: "F3rfy-A0XLA",
  },
  {
    feel: "סבל התרנגולות",
    do: "גיוס רשתות שיווק גדולות לשיווק המוצר שלהם",
    link: "XXnKdEXKJj0",
  },
  {
    feel: "כובד תיקי בית ספר",
    do: "בניית מערכת שיעורי בית דיגיטליים",
    link: "7OyPdjEOLiE",
  },
  {
    feel: "רחובות לא נגישים לבעלי נכויות",
    do: "הקמת סיירת נגישות",
    link: "zF02oaBOJrI",
  },
  {
    feel: "בדידות בהפסקות",
    do: "הקמת תחנת חברות",
    link: "FbGUFJEy_F8",
  },
  {
    feel: "קושי להסתגל לכתה א",
    do: "עיצוב מרחב שלם בבית הספר",
    link: "T18aHQZM-Dc",
  },
];

var MemoryGame = {
  settings: {
    rows: 2,
    columns: 3,
  },

  // Properties that indicate state
  cards: [], // Array of MemoryGame.Card objects
  attempts: 0, // How many pairs of cards were flipped before completing game
  mistakes: 0, // How many pairs of cards were flipped before completing game
  isGameOver: false,

  /**
   * Modify default settings to start a new game.
   * Both parameters need integers greater than one, and
   * at least one them  needs to be an even number.
   *
   * @param {number} columns
   * @param {number} rows
   * @return {array} shuffled cards
   */
  initialize: function (rows, columns) {
    var validOptions = true;

    // Validate arguments
    if (
      !(typeof columns === "number" && columns % 1 === 0 && columns > 1) ||
      (!(typeof rows === "number" && rows % 1 === 0) && rows > 1)
    ) {
      validOptions = false;
      throw {
        name: "invalidInteger",
        message: "Both rows and columns need to be integers greater than 1.",
      };
    }

    if ((columns * rows) % 2 !== 0) {
      validOptions = false;
      throw {
        name: "oddNumber",
        message: "Either rows or columns needs to be an even number.",
      };
    }

    if (validOptions) {
      this.settings.rows = rows;
      this.settings.columns = columns;
      this.attempts = 0;
      this.mistakes = 0;
      this.isGameOver = false;
      this.createCards().shuffleCards();
    }

    return this.cards;
  },

  /**
   * Create an array of sorted cards
   * @return Reference to self object
   */
  createCards: function () {
    var cards = [];
    var num;

    var wasWord = [];
    var randAgain = false;
    var count = 0;
    var maxValue = (this.settings.columns * this.settings.rows) / 2;
    while (count < maxValue) {
      do {
        num = Math.floor(Math.random() * cardsDataList.length);
        for (var i = 0; i < wasWord.length; i++)
          if (num == wasWord[i]) {
            randAgain = true;
            break;
          } else randAgain = false;
      } while (randAgain);

      wasWord.push(num);

      // Card A
      cards[2 * count] = new this.Card(
        count + 1,
        false,
        "Feel",
        cardsDataList[num].feel.toString(),
        num
      );
      // Card B (matching card)
      cards[2 * count + 1] = new this.Card(
        count + 1,
        true,
        "Do",
        cardsDataList[num].do.toString(),
        num
      );
      count++;
    }

    this.cards = cards;

    return this;
  },

  /**
   * Rearrange elements in cards array
   * @return Reference to self object
   */
  shuffleCards: function () {
    var cards = this.cards;
    var shuffledCards = [];
    var randomIndex = 0;
    var Yindex = 0;
    var Xindex = 1;

    while (shuffledCards.length < cards.length / 2) {
      // Random value between 0 and cards.length - 1
      randomIndex = Math.floor(Math.random() * cards.length);

      // If element isn't false, add element to shuffled deck
      if (cards[randomIndex] && randomIndex % 2 == 0) {
        // Add new element to shuffle deck
        shuffledCards.push(cards[randomIndex]);

        // Set element to false to avoid being reused
        cards[randomIndex] = false;
      }
    }

    // Shuffle cards
    while (shuffledCards.length < cards.length) {
      // Random value between 0 and cards.length - 1
      randomIndex = Math.floor(Math.random() * cards.length);

      // If element isn't false, add element to shuffled deck
      if (cards[randomIndex] && randomIndex % 2 != 0) {
        // Add new element to shuffle deck
        shuffledCards.push(cards[randomIndex]);

        // Set element to false to avoid being reused
        cards[randomIndex] = false;
      }
    }

    this.cards = shuffledCards;

    return this;
  },

  /**
   * A player gets to flip two cards. This function returns information
   * about what happens when a card is selected
   *
   * @param {number} Index of card selected by player
   * @return {object} {code: number, message: string, args: array or number}
   */
  play: (function () {
    var cardSelection = [];
    var revealedCards = 0;
    var revealedValues = [];

    return function (index) {
      var status = {};
      var value = this.cards[index].value;

      if (!this.cards[index].isRevealed) {
        this.cards[index].reveal();
        cardSelection.push(index);
        if (cardSelection.length == 2) {
          this.attempts++;
          if (
            this.cards[cardSelection[0]].value !=
            this.cards[cardSelection[1]].value
          ) {
            // No match
            this.cards[cardSelection[0]].conceal();
            this.cards[cardSelection[1]].conceal();
            /**
             * Algorithm to determine a mistake.
             * Check if the pair of at least
             * one card has been revealed before
             *
             * indexOf return -1 if value is not found
             */
            var isMistake = false;

            if (
              revealedValues.indexOf(this.cards[cardSelection[0]].value) === -1
            ) {
              revealedValues.push(this.cards[cardSelection[0]].value);
            } else {
              isMistake = true;
            }

            if (
              revealedValues.indexOf(this.cards[cardSelection[1]].value) === -1
            ) {
              revealedValues.push(this.cards[cardSelection[1]].value);
            }

            if (isMistake) {
              this.mistakes++;
            }

            revealedValues.push(this.cards[cardSelection[0]].value);

            (status.code = 3), (status.message = "No Match. Conceal cards.");
            status.args = cardSelection;
          } else {
            revealedCards += 2;
            //hide element when match
            this.cards[cardSelection[0]].isHidden = true;
            this.cards[cardSelection[1]].isHidden = true;
            var x = document.getElementsByClassName(
              "card-" + this.cards[cardSelection[0]].value.toString()
            );
            x[0].parentElement.parentElement.classList.add("hidden");
            x[1].parentElement.parentElement.classList.add("hidden");

            //pop up model video
            var modal = document.getElementById("myModal");
            changeSrc(
              cardsDataList[this.cards[cardSelection[0]].arrVideo].link
            );
            modal.style.display = "block";

            if (revealedCards == this.cards.length) {
              // Game over
              this.isGameOver = true;
              revealedCards = 0;
              revealedValues = [];
              (status.code = 4),
                (status.message =
                  "GAME OVER! Attempts: " +
                  this.attempts +
                  ", Mistakes: " +
                  this.mistakes);
            } else {
              (status.code = 2), (status.message = "Match.");
            }
          }
          cardSelection = [];
        } else {
          (status.code = 1), (status.message = "Flip first card.");
        }
      } else {
        (status.code = 0), (status.message = "Card is already facing up.");
      }

      return status;
    };
  })(),
};
