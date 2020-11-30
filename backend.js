class chatbot {
  constructor (){}
  levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    for (var i = 0; i < b.length; i++) {
      matrix[i] = [i];
    }

    for (var j = 0; j < a.length; j++) {
      matrix[0][j] = j;
    }


    for (i = 1; i < b.length; i++) {
      for (j = 1; j < a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[b.length - 1][a.length - 1]
  }
  
  findSimilar(message) {
    let rightAnswers = new Map([
      ["when is the next meeting", "Every Tuesday, in Masuoka."],
      ["who do I contact", "You can contact us through our google form, or speak to any of our members, which you can find on our website."],
      ["where are the meetings", "In Masuoka, in senior school."],
      ["who can I contact", "You can contact us through our google form, or speak to any of our members, which you can find on our website."],
      ["who is in charge", "You can contact any of our members through our website, or through our google form."],
      ["how do I join", "You can contact us through our google form, or speak to any of our members, which you can find on our website."],
      ["where is the meeting", "In the room Masuoka, in senior school."],
      ["what do you do", "We use our technical knowledge and interest to help other individuals and clubs around the school with technological needs."],
      ["what do we do", "We use our technical knowledge and interest to help other individuals and clubs around the school with technological needs."],
      ["what have we done", "You can see some of our projects on our website."],
      ["what are some projects", "You can see some of our projects on our website. "],
      ["who is the leader", "En Yu Yap is the leader of the design council, and the teachers in charge are Dr. Collett, Mrs. Rodriguez and Ms. Maz. You can find their contact details on our website, along with any other information that you may need."]
    ]);
    var bestInt = 10
    var bestMessage = "Sorry, we do not understand what you are saying. Please try to rephrase the sentence, or contact one of our team through our website."

    rightAnswers.forEach(function(v, k) {
      distance = levenshtein(message, k);

      if (distance < bestInt) {
        bestInt = distance;
        bestMessage = v;
      }
    });
    return bestMessage;
  }
  response(message) {
    return findSimilar(message);
  }
}
