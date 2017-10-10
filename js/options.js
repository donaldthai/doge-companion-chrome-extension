var default_quotes = "YOOOOOOoooooooooooooooooooooooooooooooooooooooooooooo!\nDOGE\nMuch Wow!\nNOPE!\nSO Amaze!";
var default_enableSmash = true;

// Saves options to chrome.storage
function save_options() {
  var quotes = document.getElementById('dogeQuotes').value;
  var enableSmash = document.getElementById('smashLikeCheckbox').checked;
  chrome.storage.sync.set({
    quotes: quotes,
    enableSmash: enableSmash
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);

    //send update request to content script
    chrome.tabs.query({active: false, currentWindow: true}, function(tabs) {
      for (var i = 0; i < tabs.length; i++){
        chrome.tabs.sendMessage(tabs[i].id, {quotes: quotes, enableSmash: enableSmash});
      }
    });
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    quotes: default_quotes,
    enableSmash: default_enableSmash
  }, function(items) {
    document.getElementById('dogeQuotes').value = items.quotes;
    document.getElementById('smashLikeCheckbox').checked = items.enableSmash;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
