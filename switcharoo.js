$.getJSON("https://api.reddit.com/r/switcharoo/new?limit=1").done(function(data) {
  $(".border ~ .buttons .reply-button a").click();
  var editarea = $($(".border").parents()[1].childNodes[3].childNodes[0].childNodes[1]);
  editarea.find("textarea")[0].value = "Ah, the ol' reddit [switcharoo](" + data.data.children[0].data.url + ")! (make this creative/relevant and remove this message, then click save)";
  editarea.find("button.save").click(function() {
    wait()
    function wait() {
      var dataperm = $(".border").parents()[1].childNodes[3].childNodes[0].childNodes[0].attributes.getNamedItem("data-permalink");
      if (!dataperm) {
        setTimeout(wait, 100);
      } else {
        var newroo = "https://www.reddit.com" + dataperm.value;
        var intent = prompt("What was the intended subject?", "");
        var switched = prompt("What was it switched to?", "");
        var context = prompt("How many comments before your switcharoo comment would someone need to read to understand it?", "");
        var submiturl = "https://www.reddit.com/r/switcharoo/submit?url=" + encodeURI(newroo + "?context=" + context) + "&title=" + encodeURI(intent + " vs " + switched);
        if (confirm("Please read the rules on the sidebar of the popup to make sure that your post follows them. If you can't handle that reponsibility, click cancel.")) {
          window.open(submiturl, "_blank");
        }
      }
    }
  });
}).fail(function() {
  alert("Couldn't reach reddit, it may be blocked or down")
});
