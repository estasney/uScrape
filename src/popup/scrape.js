//scrape.js

document.addEventListener("DOMContentLoaded", function() {
  setupScrape();
});

function setupScrape() {
  $("form").submit(function(evt) {
    evt.preventDefault();
    runScrape();
  });
  var copy_btn = document.querySelector("#copy-results");
  new ClipboardJS(copy_btn);
}

function runScrape() {
  var css_selector = $("#css-selector").val();
  var select_type = $('input[name=single-all]:checked').val();
  var selector = css_selector.replace(/"/g, "'");
  selector = "\"" + selector + "\"";
  scrapeSelector(css_selector, select_type);
}

function displayResults(response) {
  var results = response.results;
  // join via newline
  results = results.join("\n");
  $("#results").val(results);
  $("#results-div").removeClass("hidden");
}



function scrapeSelector(selector, select_type) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "extract", kind: select_type, selector: selector}, function(response) {
        displayResults(response);
      });
    });
}
