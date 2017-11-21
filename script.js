$(document).ready(function() {
  var strict = false;
  function State() {

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
    this.sounds = {
      0: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
      3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    }
    this.strict = strict
  }
  var game = null;
  var playSequence = null;

  function lightUpSquare() {
    var currentPiece = game.sequence[game.counter]

    var currentColor = $(`.${currentPiece}`).css('background-color')
    $(`.${currentPiece}`).css('background-color', 'rgba(255, 255, 255, 1)')
    game.sounds[currentPiece].play()

    setTimeout(function() {
      $(`.${currentPiece}`).css('background-color', currentColor)
    }, 500)

    game.counter++
      if (game.counter === game.round) {
        game.counter = 0
        //$("#counter").text(game.counter)
        clearInterval(playSequence)
      }
  }

  $("#start").on("click", function() {
    game = new State()
    playSequence = setInterval(lightUpSquare, 1000)
    $("#start").hide();
    // hide start button at start of game
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
        $("#counter").text(game.round)
    }
    // stops game if incorrect answer AND strict mode is on
    else if (userAnswer !== correctAnswer && game.strict === true) {
      alert('GAME OVER!')
      game = null;
      playSequence = null;
      $("#counter").text("0");
      $('#start').show();
    }
    // display an alert if the answer is wrong AND NOT in strict mode
    else if (userAnswer != correctAnswer && game.strict === false) {
      // check if game.strict is true or not and handle as needed
      alert('WRONG, TRY AGAIN')
      game.counter = 0
      playSequence = setInterval(lightUpSquare, 1000)
    }
    if(game.round == game.sequence){
      alert("Congratulations")
    }

    // If we successfully recalled all numbers in getCurrentSequence, move to next round
    if (game.counter === game.round) {
      game.counter = 0
      game.round++
        game.getCurrentSequence = game.sequence.slice(0, game.round)
      playSequence = setInterval(lightUpSquare, 1000)
    }

  })


  $('.checkmark').on('click', function() {
    strict = !strict
    if (strict === true) {
      $(this).addClass('checked')
    } else {
      $(this).removeClass('checked')
    }
  })
})
