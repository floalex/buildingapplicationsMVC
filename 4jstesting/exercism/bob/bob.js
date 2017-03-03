var Bob = function() {};

Bob.prototype = {
  replies: {
    neutral: "Whatever.",
    query: "Sure.",
    shout: "Whoa, chill out!",
    blank: "Fine. Be that way!"
  },
  hey: function(input) {
    var statement = "neutral";
    if (input.toUpperCase() === input && /[A-Z]/.test(input)) { statement = "shout"; }
    else if (/\?$/.test(input)) { statement = "query" }
    else if (!input.replace(/\s/g, "")) { statement = "blank"; }
    return this.replies[statement];
  },
};

module.exports = Bob;