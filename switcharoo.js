// ==Bookmarklet==
// @name Switcharoo Bookmarklet
// @author coolreader18
// ==/Bookmarklet==

if ($(".border").length) {
  $.getJSON("https://api.reddit.com/r/switcharoo/new?limit=1").done(data => {
    $(".border ~ .buttons .reply-button a").click();
    var editarea = $(".border").parents().eq(1).find(".usertext-edit");
    editarea.find("textarea").val(`Ah, the ol' reddit [switcharoo](${data.data.children[0].data.url})!

(make this creative/relevant and remove this message, then click save`);
    editarea.find("button.save").click(() => {
      var intrvl = setInterval(() => {
        var perm = $(".border").parents().find(".child").children().eq(0).children().eq(0).data("permalink");
        if (!perm) {
          clearInterval(intrvl);
        } else {
          var newroo = `https://www.reddit.com${perm}`,
          intent = prompt("What was the intended subject?"),
          switched = prompt("What was it switched to?"),
          context = prompt("How many comments before your switcharoo comment would someone need to read to understand it?"),
          submiturl = new URL("https://www.reddit.com/r/switcharoo/submit"),
          search = submiturl.searchParams;
          search.append("url", newroo);
          search.append("context", context);
          search.append("title", `${intent} vs ${switched}`);
          if (prompt("Please read the rules on the sidebar of the popup to make sure that your post follows them. To confirm that you can handle that reponsibility, type in \"switcharoo\".") == "switcharoo") {
            window.open(submiturl.toString(), "_blank");
          } else {
            alert("Just be responsible next time");
          }
        }
      }, 10);
    });
  }).fail(() => {
    alert(new Error("Couldn't reach reddit, it may be blocked or down"))
  });
} else {
  alert(new Error("Couldn't find the permalinked comment, please click the \"permalink\" button underneath the comment that switches the subjects"));
}
