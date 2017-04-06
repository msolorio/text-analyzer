// ??? When calculating average word length
// is this the average for unique words or total words?

(function() {

  var textAnalyzer = {

    // returns string of inputted text
    getInput: function() {
      return $('.js-inputText').val();
    },

    // receives a string
    // returns an array of words from input
    // TODO: filter out numbers in regex
    getWordsArray: function(inputValue) {
      // splitting between non-word characters
      var wordsArray = inputValue.split(/\W+/);
      // removes empty string at end for punctuation
      return wordsArray.filter(function(word) {
        return word !== '';
      });
    },

    // receives an array of words
    // returns the total word count
    getWordCount: function(wordsArray) {
      return wordsArray.length;
    },

    getUniqueWordCount: function(wordsArray) {
      var uniqueWordsArray = wordsArray.filter(function(word, index) {
        // returns true if word is unique
        // returns false if duplicate
        return wordsArray.indexOf(word) === index;
      });
      return uniqueWordsArray.length;
    },

    // receives an array of words
    // returns the average word length rounded to 2 decimal places
    getAverageWordLength: function(wordsArray) {
      var totalCharLength = wordsArray.reduce(function(sum, word) {
        return sum + word.length;
      }, 0);
      var average = totalCharLength / wordsArray.length;
      return Math.round(average * 100) / 100;
    },

    // inserts data into html
    insertHtml: function(wordCount, uniqueWordCount, averageWordLength) {
      $('.js-textReport').removeClass('hidden');

      $('.js-wordCount').text(wordCount);
      $('.js-uniqueWordCount').text(uniqueWordCount);
      $('.js-averageWordLength').text(averageWordLength);
    },

    handleButtonClick: function() {
      $('.js-submit').click(function(event) {

        event.preventDefault();
        var inputValue = this.getInput().trim();
        var wordsArray = this.getWordsArray(inputValue);

        // analytics
        var wordCount = this.getWordCount(wordsArray);
        var uniqueWordCount = this.getUniqueWordCount(wordsArray);
        var averageWordLength = this.getAverageWordLength(wordsArray);
        this.insertHtml(wordCount, uniqueWordCount, averageWordLength);

      }.bind(this));
    }

  }

  $(textAnalyzer.handleButtonClick.bind(textAnalyzer));

}());
