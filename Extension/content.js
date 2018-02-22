var API = "http://localhost:55719/V1/";
var LoadTimeout;
var TweetectAction = "<div class=\"ProfileTweet-action--tweetect\">" +
    "<button class=\"\" type=\"button\"><div class=\"IconContainer js-tooltip\" data-original-title=\"TweeTect\"><img class=\"TweetIcon\"></img><span class=\"u-hiddenVisually\">TweeTect</span></div></button>" +
    "</div>";
$(".ProfileTweet-actionList.js-actions .ProfileTweet-action--dm").after(TweetectAction);
IMURL = chrome.extension.getURL("Twitter_Bird.png");
$(".TweetIcon").attr("src", IMURL)
var TweetectModal = "<div id=\"tweetect-tweet-dialog\" class=\"tweetectDialog modal-container\" style=\"\">" +
    "<div class=\"tweetectDialog-modal modal draggable\" id=\"tweetect-tweet-dialog-dialog\" role=\"alertdialog\" aria-labelledby=\"tweetect-tweet-dialog-header\"" +
    "aria-describedby=\"tweetect-tweet-dialog-body\" style=\"top: 20%; left: 616px;\">" +
    "<div class=\"js-first-tabstop\" tabindex=\"0\"></div>" +
    "<div class=\"modal-content\" role=\"document\">" +
    "<div class=\"modal-header\">" +
    "<h2 class=\"modal-title\" id=\"tweetect-tweet-dialog-header\">TweeTect</h2>" +
    "</div>" +
    "<div class=\"modal-body\">" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
$("#retweet-tweet-dialog").after(TweetectModal);
function Report(user, data){
    var report = "<div class=\"tweetect-report\">"+
    "<h4 style=\"font-size:15px\">Bot report for " + user + ":</h4>"+
    "</div>"
    $(".modal-body").append(report);
}
function Evaluate(ths) {
    var search = "<div class=\"tweetect-searching\">" +
        "<div id=\"fountainG\"><div id=\"fountainG_1\" class=\"fountainG\"></div><div id=\"fountainG_2\" class=\"fountainG\"></div><div id=\"fountainG_3\" class=\"fountainG\"></div><div id=\"fountainG_4\" class=\"fountainG\"></div><div id=\"fountainG_5\" class=\"fountainG\"></div><div id=\"fountainG_6\" class=\"fountainG\"></div><div id=\"fountainG_7\" class=\"fountainG\"></div><div id=\"fountainG_8\" class=\"fountainG\"></div></div>" +
        "<h4></h4" +
        "</div>"
    $(".modal-body").append(search);   
    var user = $(ths).parents(".content").first().find(".username b").first().text()
    $("#tweetect-tweet-dialog .tweetect-searching h4").text("Evaluating " + user)
    $.get(API + user, function(){}).done(function(data){
        $(".tweetect-searching").remove();
        Report(user, data);
    });
}
$(".ProfileTweet-action--tweetect").click(function () {
    $("#tweetect-tweet-dialog").css("display", "block");
    var offset = ($(window).width() - $("#tweetect-tweet-dialog-dialog").width()) / 2.0;
    $("#tweetect-tweet-dialog-dialog").css("left", offset.toString() + "px");
    Evaluate(this);  
   
})
$("#tweetect-tweet-dialog").click(function () {
    $("#tweetect-tweet-dialog").css("display", "none");
    clearTimeout(LoadTimeout);
    $("#tweetect-tweet-dialog .modal-body").empty()

})
$(".tweetectDialog-modal").click(function () {
    event.stopPropagation();
})
