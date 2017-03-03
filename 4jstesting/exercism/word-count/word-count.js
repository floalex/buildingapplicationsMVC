function Words() {}

Words.prototype.count = function(phrase) {
  var word_counts = {};
  var word_list = phrase.toLowerCase()
                        .replace(/[,."\/!&@$%\^\*;:{}()¡¿?]/g, ' ')
                        .replace(/\s'(\w+)'\s/, ' '+'$1'+' ')
                        .match(/\S+/g);  // need to use non-whitespace since we have \'
  
  word_list.forEach(function(word) {
    // word_counts[word] = word_counts.hasOwnProperty(word) ? word_counts[word] + 1 : 1;
    if (typeof word_counts[word] !== "number") { word_counts[word] = 0; }
    word_counts[word]++;
  });
  
  return word_counts;
};

module.exports = Words;