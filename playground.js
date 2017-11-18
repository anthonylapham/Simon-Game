$(document).ready(function() {
  function State(strict) {

    function generateSequence() {
      var sequence = []
      for (var i = 1; i <= 20; i++) {
        sequence.push(_.random(0, 3))
      }
      return sequence
    }
    this.sequence = generateSequence()
    this.counter = 0
    this.round = 1
    this.getCurrentSequence = this.sequence.slice(0, this.round)
    this.sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
    this.strict = strict
  }
  var game = null;
  var playSequence = null;

  function lightUpSquare() {
    var currentPiece = game.sequence[game.counter]

    var currentColor = $(`.${currentPiece}`).css('background-color')
    $(`.${currentPiece}`).css('background-color', 'rgba(255, 255, 255, 1)')
    game.sound.play()

    setTimeout(function() {
      $(`.${currentPiece}`).css('background-color', currentColor)
    }, 500)

    game.counter++
      if (game.counter === game.round) {
        game.counter = 0
        $("#counter").text(game.counter)
        clearInterval(playSequence)
      }
  }

  $("#start").on("click", function() {
    var strict = // get the value from jQuery checkbox
      game = new State(strict)
    playSequence = setInterval(lightUpSquare, 1000)
    $("#start").hide();
    // hide start button and checkbox
  });

  $('.btn').on('click', function() {
    var userAnswer = $(this).data('value')
    var correctAnswer = game.getCurrentSequence[game.counter]

    console.log('USER ANSWER:', userAnswer)
    console.log('CORRECT ANSWER', correctAnswer)
    console.log('CURRENT SEQUENCE', game.getCurrentSequence)
    console.log('\n')
    console.log(game.counter)

    // If round isn't over and correct answer, increment counter and await another player input
    if (userAnswer == correctAnswer && game.counter < game.round) {
      game.counter++
    }
    // display an alert if the answer is wrong
    else if (userAnswer != correctAnswer) {
      // check if game.strict is true or not and handle as needed
      alert('WRONG, TRY AGAIN')
      game.counter = 0
      playSequence = setInterval(lightUpSquare, 1000)
    }

    // If we successfully recalled all numbers in getCurrentSequence, move to next round
    if (game.counter === game.round) {
      game.counter = 0
      game.round++
        game.getCurrentSequence = game.sequence.slice(0, game.round)
      playSequence = setInterval(lightUpSquare, 1000)
    }
  })
})
