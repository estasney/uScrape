function fetchElements(request, callback){
  var results = [];
  var elements;
  if (request.kind == "all") {
    elements = document.querySelectorAll(request.selector);
  } else {
    elements = [document.querySelector(request.selector)];
  }
  elements.forEach(function(row) {
    results.push(row.textContent);
  });
  callback({results: results});
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "extract"){
    fetchElements(request, sendResponse);
  }
});
