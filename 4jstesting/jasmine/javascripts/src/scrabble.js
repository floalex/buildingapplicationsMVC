var scores = {
  1: ["a", "e", "i", "o", "u", "l", "n", "r", "s", "t"],
  2: ["d", "g"],
  3: ["b", "c", "m", "p"],
  4: ["f", "h", "v", "w", "y"],
  5: ["k"],
  8: ["j", "x"],
  10: ["q", "z"]
};

function Scrabble(word) {
  if (!word) { return 0; }
  var score = 0;
  var letters = word.toLowerCase().split("");
  
  letters.forEach(function(letter) {
    for (var key in scores) {
      if (scores[key].indexOf(letter) !== -1) {
        score += Number(key);
      }
    }
  });
  
  return score;
}