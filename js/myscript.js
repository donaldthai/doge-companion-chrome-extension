var html = '<div id="liker">' +
  '<img title="SMASH THIS DOGE LIKE BUTTON!" ></img>'+
'</div>';
var url = chrome.extension.getURL("images/doge.png");
//grab the quotes from stroage
var quotes;
chrome.storage.sync.get({
  quotes: "YOOOOOOoooooooooooooooooooooooooooooooooooooooooooooo!\nDOGE\nMuch Wow!\nNOPE!\nSO Amaze!"
}, function(items) {
  quotes = items.quotes.split("\n");
});
//if storage is updated, update quotes
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (!request.quotes)
    {
      var defaultQuotes = "YOOOOOOoooooooooooooooooooooooooooooooooooooooooooooo!\nDOGE\nMuch Wow!\nNOPE!\nSO Amaze!";
      quotes = defaultQuotes.split("\n");
    } else {
      quotes = request.quotes.split("\n");
    }
  });

$("body").append(html);

var $liker = $("#liker");
var $img = $("#liker > img");
$img.attr("src", url);

//enable popovers
$liker.popover({ placement: "top" });

//set jquery events
$img.off("click");
$img.on("click", function() {
  var $postsToLike = $("button.like > i.d-icon-heart");
  if ($postsToLike.length > 0) {
    $postsToLike.trigger("click");
    $liker.attr("data-content", "+" + $postsToLike.length);
  } else {
    //show doge quotes
    //grab data from settings
    var quote = quotes[generateRand(0, quotes.length - 1)];
    $liker.attr("data-content", quote)
  }

  $liker.popover("show");
  $liker.off("shown.bs.popover");
  $liker.on("shown.bs.popover", function() {
    //dismiss popover after 1 sec
    setTimeout(function(){
      $liker.popover("hide");
    }, 1000);
  });
});

function generateRand(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};
