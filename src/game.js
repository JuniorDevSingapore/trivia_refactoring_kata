class Question {
  
}

const Game = function () {
  const players = [];
  const places = new Array(6);
  const purses = new Array(6);
  const inPenaltyBox = new Array(6);

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  const questionsPool = {
    "Pop": [],
    "Science": [],
    "Sports": [],
    "Rock": [],
  }

  const createQuestion = function (type, index) {
    questionsPool[type].push(type + " Question " + index);
  };

  for (let i = 0; i < 50; i++) {
    Object.keys(questionsPool).forEach(k => createQuestion(k, i))
  };

  let currentPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  const didPlayerWin = function () {
    return !(purses[currentPlayer] == 6)
  };

  const currentCategory = function () {
    switch(places[currentPlayer]) {
      case 0:
      case 4:
      case 8:
        return 'Pop';
      case 1:
      case 5:
      case 9:
        return 'Science';
      case 2:
      case 6:
      case 10:
        return 'Sports';
      default:
        return 'Rock';
    }
  };

  

  

  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.add = function (playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function () {
    return players.length;
  };


  const askQuestion = function () {
    if (currentCategory() == 'Pop')
      console.log(questionsPool['Pop'].shift());
    if (currentCategory() == 'Science')
      console.log(questionsPool['Science'].shift());
    if (currentCategory() == 'Sports')
      console.log(questionsPool['Sports'].shift());
    if (currentCategory() == 'Rock')
      console.log(questionsPool['Rock'].shift());
  };

  this.roll = function (roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {

      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function () {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
            purses[currentPlayer] + " Gold Coins.");

        const winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }


    } else {

      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
          purses[currentPlayer] + " Gold Coins.");

      const winner = didPlayerWin();

      currentPlayer += 1;
      if (currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;
    return true;
  };
};

module.exports = Game;