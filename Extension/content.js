
function hsl_col_perc(percent) {
    var a = percent / 100,
        a = 1 - a
    b = (120 - 0) * a,
        c = b + 0;
    return 'hsl(' + c + ', 100%, 50%)';
}
function setCookie(user, data) {
    chrome.runtime.sendMessage({
        type: "setSaved", options: {
            user: user,
            data: data
        }
    });
}

IMURL = chrome.extension.getURL("Twitter_Bird.png");
var API = "https://tweetect.com/V1/";
window.popup = null;
var access_token = null;
var access_secret = null;
var LoadTimeout;
var TweetectAction = "<div class=\"ProfileTweet-action--tweetect\">" +
    "<button class=\"\" type=\"button\"><div class=\"IconContainer js-tooltip\" data-original-title=\"TweeTect\"><img src=\"" + IMURL + "\" class=\"TweetIcon\"></img><span class=\"u-hiddenVisually\">TweeTect</span></div></button>" +
    "</div>";


var TweetectModal = "<div id=\"tweetect-tweet-dialog\" class=\"tweetectDialog modal-container\" style=\"\">" +
    "<div class=\"tweetectDialog-modal modal draggable\" id=\"tweetect-tweet-dialog-dialog\" role=\"alertdialog\" aria-labelledby=\"tweetect-tweet-dialog-header\"" +
    "aria-describedby=\"tweetect-tweet-dialog-body\" style=\"top: 20%; left: 616px;\">" +
    "<div class=\"js-first-tabstop\" tabindex=\"0\"></div>" +
    "<div class=\"modal-content\" role=\"document\">" +
    "<div class=\"modal-header\">" +
    "<h2 class=\"modal-title\" id=\"tweetect-tweet-dialog-header\">Twee-tect</h2>" +
    "</div>" +
    "<div class=\"modal-body\">" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
$("#retweet-tweet-dialog").after(TweetectModal);
function Report(user, data, handle) {
    var Sentiment = (data.Sentiment * 100).toFixed(2);
    var Temporal = (data.Temporal * 100).toFixed(2);
    var Meta = (data.Meta * 100).toFixed(2);
    var Network = (data.Network * 100).toFixed(2);
    var Final = (data.Final * 100).toFixed(2);
    var Lang = data.Lang;



    var report = "<div class=\"tweetect-report\">" +
        "<h4 style=\"font-size:15px;padding-bottom:10px\">Bot report for " + user + ":</h4>" +
        "<div class=\"tweetect-reportoutput\">" +


        "<div class=\"tweetect-featureset\" style=\"width:66%\">" +
        "<div class=\"tweetect-featuresettitle\">" +

        "</div>" +
        "<div class=\"tweetect-features\">" +
        "<div class=\"tweetect-feature\"><div class=\"tweetect-fname\">Sentiment:</div><div class=\"tweetect-percent\">" + Sentiment + "%</div></div>" +
        "<div class=\"tweetect-featuredesc\"><div>The sentiment features of a Twitter account are derived from the adjectives an account uses in their everyday Tweets. The more positive " +
        "a word is, the more positive the polarity of the Tweet's sentiment. This applied conversely for negative words. The TweeTect system looks at the sentiment of an account's " +
        "Tweets and determines features such as the consistency of the sentiment.</div></div>" +
        "<div class=\"tweetect-feature\"><div class=\"tweetect-fname\">Network:</div><div class=\"tweetect-percent\">" + Network + "%</div></div>" +
        "<div class=\"tweetect-featuredesc\"><div>The network features concern themselves with this Twitter account's relationship to other accounts in it's friend network. This includes attributes about each of those friend's in it's network. This also includes features like ratio of following to followers.</div></div>" +
        "<div class=\"tweetect-feature\"><div class=\"tweetect-fname\">Meta:</div><div class=\"tweetect-percent\">" + Meta + "%</div></div>" +
        "<div class=\"tweetect-featuredesc\"><div>The meta features of a Twitter account are the basic attributes of an account such as days since the account was created and categorical features such as is the account geo enabled and does it have default profile settings.</div></div>" +
        "<div class=\"tweetect-feature\"><div class=\"tweetect-fname\">Temporal:</div><div class=\"tweetect-percent\">" + Temporal + "%</div></div>" +
        "<div class=\"tweetect-featuredesc\"><div>Another word for this feature type would be timing. Attributes in this category, for example, are seconds in between Tweets on days with more than one Tweet and average Tweets per day.</div></div>" +
        "</div>" +
        "</div>" +

        "<div class=\"tweetect-featureset\" style=\"width:33%\">" +
        "<div class=\"tweetect-featuresettitle\">" +
        "Total percent rating:" +
        "</div>" +
        "<div class=\"tweetect-features\">" +
        "<div class=\"tweetect-feature\"><div class=\"tweetect-fname\">All features:</div><div class=\"tweetect-percent\">" + Final + "%</div></div>" +
        "<div class=\"tweetect-featuredesc\"></div>" +
        "<div class=\"tweetect-feature\"><div class=\"tweetect-fname\">Language:</div><div class=\"tweetect-percent\">" + Lang + "</div></div>" +
        "<div class=\"tweetect-featuredesc\"></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class=\"tweetect-blockbutton\">" +
        "<button type=\"button\">Block " + user + "</button>" +
        "</div>"
    "</div>"

    $("#tweetect-tweet-dialog .modal-body").append(report);
    var req = {
        handle: handle,
        access_token: access_token,
        access_secret: access_secret
    }
    $(".tweetect-blockbutton > button:not(.tBlocked)").click(function () {
        var but = this;
        if (!$(but).hasClass("tBlocked")) {
            $.get(API + "Block/" + JSON.stringify(req), function () { }).done(function (data) {
                $(but).text("Blocked");
                $(but).addClass("tBlocked");
            });
        }

    });
    $(".tweetect-feature").each(function (index) {
        var perc = $(this).find(".tweetect-percent").first().text()
        perc = perc.substring(0, perc.length - 1);
        perc = parseInt(perc);
        $(this).css('background-color', hsl_col_perc(perc))
    })
    $(".tweetect-feature").click(function () {
        var desc = $(this).next(".tweetect-featuredesc");
        if ($(desc).hasClass("open")) {
            $(desc).removeClass("open");
        }
        else {
            $(desc).addClass("open")
        }

    })



}
function Evaluate(ths, user) {
    var search = "<div class=\"tweetect-searching\">" +
        "<div id=\"fountainG\"><div id=\"fountainG_1\" class=\"fountainG\"></div><div id=\"fountainG_2\" class=\"fountainG\"></div><div id=\"fountainG_3\" class=\"fountainG\"></div><div id=\"fountainG_4\" class=\"fountainG\"></div><div id=\"fountainG_5\" class=\"fountainG\"></div><div id=\"fountainG_6\" class=\"fountainG\"></div><div id=\"fountainG_7\" class=\"fountainG\"></div><div id=\"fountainG_8\" class=\"fountainG\"></div></div>" +
        "<h4></h4>" +
        "</div>"

    $("#tweetect-tweet-dialog .modal-body").append(search);
    $("#tweetect-tweet-dialog .tweetect-searching h4").text("Evaluating " + user)
    var handle = $(ths).parents(".tweet").first().find(".username b").first().text()
    var req = {
        handle: handle,
        access_token: access_token,
        access_secret: access_secret
    }
    $.get(API + "Get/" + JSON.stringify(req), function () { }).done(function (data) {
        $(".tweetect-searching").remove();
        setCookie(user, (data.Final * 100).toFixed(2) + "%");
        Report(user, data, handle);
    });
}

function Filter(ths) {
    var user = $(ths).parents(".tweet").first().find(".FullNameGroup strong").first().text()
    var filter = "<div class=\"tweetect-filtering\">" +
        "<div class=\"tweetect-enterfilter\">" +
        "<div>Filter based on hashtag:</div><input id=\"tweetect-enterhashtag\" placeholder =\"Enter hashtag\" type=\"text\" name=\"hashtag\">" +
        "</div>" +
        "<div class=\"tweetect-hashtags\">" +
        "</div>" +
        "<div class=\"tweetect-evalbutton\">" +
        "<button type=\"button\">Evaluate " + user + "</button>" +
        "</div>" +
        "</div>"
    $("#tweetect-tweet-dialog .modal-body").append(filter);
    $("#tweetect-enterhashtag").on('keyup', function (e) {

        if (e.keyCode == 13) {
            var value = $("#tweetect-enterhashtag").val()
            if (value != "") {
                if (value.charAt(0) != "#") { value = "#" + value }
                var hashtag = "<div class=\"tweetect-hashtag\">" + value +
                    "</div>"
                $(".tweetect-hashtags").append(hashtag);
                $("#tweetect-enterhashtag").val("");
            }
        }
    });

    $(".tweetect-evalbutton > button").click(function () {
        $(".tweetect-filtering").remove();
        Evaluate(ths, user);
    });
}

$("#tweetect-tweet-dialog").click(function () {
    $("#tweetect-tweet-dialog").css("display", "none");
    clearTimeout(LoadTimeout);
    $("#tweetect-tweet-dialog .modal-body").empty()

})
$(".tweetectDialog-modal").click(function () {
    event.stopPropagation();
})

function Start(tc) {
    console.log(tc)
    $("#tweetect-tweet-dialog").css("display", "block");
    var offset = ($(window).width() - $("#tweetect-tweet-dialog-dialog").width()) / 2.0;
    $("#tweetect-tweet-dialog-dialog").css("left", offset.toString() + "px");
    Filter(tc);
}
function onAuth(event){
    if (event.data["Auth"] == "True") {
        chrome.runtime.sendMessage({
            type: "setCookie", options: {
                kType: "key",
                val: event.data["access_token"]
            }
        }, function () {
            chrome.runtime.sendMessage({
                type: "setCookie", options: {
                    kType: "secret",
                    val: event.data["access_secret"]
                }
            }, function () {
                access_token = event.data["access_token"];
                access_secret = event.data["access_secret"];
                Start(window.tc)
            })
        })

    }
}
function checkAuth(key, secret, tc) {
    access_token = key;
    access_secret = secret
    window.tc = tc;
    if (access_token == null || access_secret == null) {
        $.get(API + "TwitterAuth", function () { }).done(function (data) {
            if (window.popup == null || typeof(window.popup) == "undefined" || window.popup.closed == true) {
                window.popup = window.open("about:blank", 'name', 'height=600,width=450,toolbar=0,menubar=0,location=0,left=700');
                var html = data;
                $(window.popup.document.body).html(html);
                window.popup.focus(); 
            }
        });
    }
    else {
        Start(tc)
    }
}
function getAuth(tc) {
    var key = null;
    var secret = null;
    chrome.runtime.sendMessage({
        type: "getCookie", options: {
            kType: "key"
        }
    }, function (resp1) {
        key = resp1;
        chrome.runtime.sendMessage({
            type: "getCookie", options: {
                kType: "secret"
            }
        }, function (resp2) {
            secret = resp2;
            checkAuth(key, secret, tc)
        });
    });
}
window.addEventListener("message", function (event) {
    onAuth(event)
}, false);
window.setInterval(function () {
    var items = $(".ProfileTweet-actionList.js-actions .ProfileTweet-action--dm");
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (!$(item).next().hasClass("ProfileTweet-action--tweetect")) {
            $(item).after(TweetectAction);
            $($(item).next()).click(function () {
                var tc = this;
                getAuth(tc);
            })
        }
    }
}, 2000);