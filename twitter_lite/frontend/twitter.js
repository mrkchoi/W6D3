let FollowToggle = require("./follow_toggle.js");

$(() => {
  let $followToggleBtns = $(".follow-toggle");
  $followToggleBtns.each(function(i, el) {
    let curBtn = new FollowToggle(el);
    
  });
});