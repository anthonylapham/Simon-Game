$(document).ready(function() {
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
    this.sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
  }
  var game = new State()

  var playSequence = setInterval(lightUpSquare, 1000)

  $('#start').on('click', function() {
    function lightUpSquare() {
      var currentPiece = game.sequence[game.counter].toString()

      var currentColor = $(`.${currentPiece}`).css('background-color')
      $(`.${currentPiece}`).css('background-color', 'rgba(255, 255, 255, 1)')
      game.sound.play()

      setTimeout(function() {
        $(`.${currentPiece}`).css('background-color', currentColor)
      }, 1000)

      game.counter++
        if (game.counter === 20) {
          clearInterval(playSequence)
        }
    }

  });

})
