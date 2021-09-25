/**
 * @namespace The main application object
 */
const cardsDataList = [
  {
    feel: "קושי בקריאת תפריט",
    do: "הפקת תפריט קולי",
    link: "ZHJeKr5CWJ0",
  },
  {
    feel: "חוסר הבנה של בעיות המתבגרים",
    do: "הפקת הצגה",
    link: "enEzeZnyAVg",
  },
  {
    feel: "בזבוז מזון",
    do: "שימוש בשאריות מזון לקומפוסט",
    link: "EL8TRhZACyc",
  },
  {
    feel: "חשש מהעדר תעסוקה",
    do: "סדנאות להגשמת חלומות",
    link: "x1goC5TbKe4",
  },
  {
    feel: 'ילדים באים בלי חשק לביה"ס',
    do: "ספר מתכונים",
    link: "xI_JqHSbMMY",
  },
  {
    feel: "צורך לנטרל סטיגמות על זקנים",
    do: "אימוץ ותיקי העיר בבית הספר",
    link: "p48hLkJZ7kE",
  },
  {
    feel: "חוסר שוויון מגדרי",
    do: "הקמת קבוצת כדורגל ",
    link: "mZeeiJ1_dkw",
  },
  {
    feel: "חוסר ידע על אתרי הכפר",
    do: "שילוט רחובות",
    link: "HyIb1vTciQk",
  },
  {
    feel: 'קשיי המעבר בין הגן לביה"ס',
    do: "הפסקה פעילה",
    link: "4Bq7cVX9gw4",
  },
  {
    feel: "כלבים עם נכויות לבעלים חסרי אמצעים",
    do: "גיוס כספים לרכישת מדפסת תלת מימד",
    link: "VVsfgHLAr2c",
  },
  {
    feel: "בדידות בהפסקות",
    do: "הקמת תחנת חברות ",
    link: "FbGUFJEy_F8",
  },
  {
    feel: 'תלמידים מפחדים להגיע לביה"ס',
    do: "הטמעת תכנית בטיחות בדרכים ",
    link: "1xWgPMgaf_E",
  },
  {
    feel: "תנאי מחייה של חיות המשק",
    do: "חלב חופש",
    link: "Tv8lKHBtX2I",
  },
  {
    feel: "קושי של זקנים עם טכנולוגיה",
    do: "קו חם לבעיות טכנולוגיות",
    link: "qF48FTmaX10",
  },
  {
    feel: "כובד תיקי בית ספר",
    do: "בניית מערכת לשיעורים דיגיטליים",
    link: "7OyPdjEOLiE",
  },
  {
    feel: "תחושת בדידות חברתית ",
    do: 'הקמת תנועת הנוער "צליל מיוחד"',
    link: "4J_Km0TD9q8",
  },
  {
    feel: "חסר מקום נעים לקריאה בהפסקה",
    do: "בניית ספריה על גלגלים",
    link: "HhCXn_dJoDI",
  },
  {
    feel: "חוסר רצון לבוא ללימודים",
    do: "ארגון פעילויות חברתיות כיתתיות",
    link: "E5KaYHFxj2M",
  },
  {
    feel: "חוסר מודעות לתחרות הטניס לנכים",
    do: "הפקת מסע פרסום ",
    link: "BagLuOaThIc",
  },
  {
    feel: "יחס לא נעים בין תלמידים",
    do: "תחנות בבי'ס לעידוד מפגשים",
    link: "yPIlcdiwPIg",
  },
];

var MemoryGame = {
  settings: {
    rows: 2,
    columns: 4,
  },

  // Properties that indicate state
  cards: [], // Array of MemoryGame.Card objects
  attempts: 0, // How many pairs of cards were flipped before completing game
  mistakes: 0, // How many pairs of cards were flipped before completing game
  isGameOver: false,

  /**
   * Modify default settings to start a new game.
   * Both parameters need integers greater than one, and
   * at least one them needs to be an even number.
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
              cardsDataList[this.cards[cardSelection[0]].arrayIndex].link
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
