/* @legume
 * @name switcharoo
 * @author coolreader18
 * @require npm:jquery as $
 */

$("ul.flat-list.buttons").append(
  $("<li>").append(
    $('<a href="javascript:void(0)">switcharoo</a>').click(click)
  )
);
function click() {
  $.getJSON("https://api.reddit.com/r/switcharoo/new?limit=1")
    .done(data => {
      $(this)
        .parents(".buttons")
        .find(".reply-button a")
        .click();
      var editarea = $(this)
        .parents(".thing")
        .find(".usertext-edit");

      editarea.find("textarea").val(`Ah, the ol' reddit [switcharoo](${
        data.data.children[0].data.url
      })!

(make the above creative/relevant to the thread and remove this message, then click save)`);
      editarea.find("button.save").click(() => {
        const prevPerm = $(this)
          .parents(".thing")
          .find(".child .thing")
          .data("permalink");
        const intrvl = setInterval(() => {
          const perm = $(this)
            .parents(".thing")
            .find(".child .thing")
            .data("permalink");
          if (perm != prevPerm) {
            clearInterval(intrvl);
            const roourl = new URL("https://www.reddit.com");
            roourl.pathname = perm;
            const submitUrl = new URL(
              "https://www.reddit.com/r/switcharoo/submit"
            );
            Object.entries({
              url: roourl,
              context: prompt(
                "How many comments before your switcharoo comment would someone need to read to understand it?"
              ),
              title: `${prompt("What was the intended subject?")} vs ${prompt(
                "What was it switched to?"
              )}`
            }).forEach(cur => submitUrl.searchParams.append(...cur));
            if (
              prompt(
                "Please read the rules on the sidebar of the popup to make sure that your post follows them. " +
                  "If you do not, your post will likely be removed very quickly. " +
                  'To confirm that you can handle that reponsibility, type in "switcharoo".'
              ).toLowerCase() == "switcharoo"
            ) {
              window.open(submitUrl);
            } else {
              alert("Just be responsible next time");
            }
          }
        }, 10);
      });
    })
    .fail(() => {
      alert(new Error("Couldn't reach reddit, it may be blocked or down"));
    });
}
