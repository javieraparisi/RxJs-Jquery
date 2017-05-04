$(function() {

  var input = $('#input');
  var results = $('#results');


  Rx.Observable.fromEvent(input, 'keyup')
    .pluck('target', 'value')
    .filter(function(text) {
      return text.length > 2;
    })
    .debounce(250)
    .distinctUntilChanged()
    .flatMapLatest(searchWikipedia)
    .forEach(showResults)



  function searchWikipedia(term) {
    return $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: term
      }
    }).promise();
  }
  
  function showResults(data) {
    results
      .empty()
      .append ($.map(data[1], function (value) {
        return $('<li>').text(value);
      }));
  }

});