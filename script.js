$(document).ready(function(){
//generate an array of 20 numbers
//put game parameters in global variable/function
//in game variable set count to zero
//in game variable set current game as []
//in game variable set player as []
//make new game function that correlates to default game function
//creat click event for start button that starts game and auto increments count to 1
//

});

// var sequence = [];
// for (var i = 0; i < 20; i++) {
//   sequence.push(Math.floor(Math.random() * 4))
// }
// console.log(sequence);
var sequence2 = _.times(20, _.random(0, 3));
console.log(sequence2);

$('red').on('click', function(){
  var audio = [];
  audio["red"] = new Audio();
  audio["red"].src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  audio["red"].addEventListener('load', function () {
      audio["red"].play();
});
    });


//finish pseudo code
//change buttons to divs
//have sound and flash for all 20 numbers in sequence
//flash lasts 1 full second or 1000 miliseconds
//pause between should be half a second or 500 miliseconds
