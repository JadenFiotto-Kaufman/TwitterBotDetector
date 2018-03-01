window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
  
    return t;
  }(document, "script", "twitter-wjs"));

function hsl_col_perc(percent) {
    var a = percent / 100,
        b = (120 - 0) * a,
            c = b + 0;

    // Return a CSS HSL string
    return 'hsl('+c+', 100%, 50%)';
}


var API = "https://tweetect.com/V1/";
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
    "<h2 class=\"modal-title\" id=\"tweetect-tweet-dialog-header\">Twee-tect</h2>" +
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
    "<div class=\"tweetect-reportoutput\">" +

    "<div class=\"tweetect-featureset\">" +
    "<div class=\"tweetect-featuresettitle\">" + 
    "English-specific features" + 
    "</div>" +
    "<div class=\"tweetect-features\">" +
    "<div class=\"tweetect-feature\"><div>Content:</div><div class=\"tweetect-percent\">44%</div></div>" +
    "<div class=\"tweetect-feature\"><div>Sentiment:</div><div class=\"tweetect-percent\">40%</div></div>" +
    "</div>" +
    "</div>" +

    "<div class=\"tweetect-featureset\">" +
    "<div class=\"tweetect-featuresettitle\">" + 
    "Language-independent features" +
    "</div>" +
    "<div class=\"tweetect-features\">" +
    "<div class=\"tweetect-feature\"><div>Friend:</div><div class=\"tweetect-percent\">48%</div></div>" +
    "<div class=\"tweetect-feature\"><div>Network:</div><div class=\"tweetect-percent\">63%</div></div>" +
    "<div class=\"tweetect-feature\"><div>User:</div><div class=\"tweetect-percent\">44%</div></div>" +
    "<div class=\"tweetect-feature\"><div>Temporal:</div><div class=\"tweetect-percent\">34%</div></div>" +
    "</div>" +
    "</div>" +

    "<div class=\"tweetect-featureset\">" +
    "<div class=\"tweetect-featuresettitle\">" + 
    "Bot score based on" +
    "</div>" +
    "<div class=\"tweetect-features\">" +
    "<div class=\"tweetect-feature\"><div>All features:</div><div class=\"tweetect-percent\">47%</div></div>" +
    "<div class=\"tweetect-feature\"><div>Language-Independant:</div><div class=\"tweetect-percent\">44%</div></div>" +
    "<div class=\"tweetect-feature\"><div>Language:</div><div class=\"tweetect-percent\">en</div></div>" +
    "</div>" +
    "</div>" +
    "</div>" + 
    "</div>"
    $("#tweetect-tweet-dialog .modal-body").append(report);
    $(".tweetect-feature").each(function(index){
        var perc = $(this).find(".tweetect-percent").first().text()
        perc = perc.substring(0, perc.length - 1);

        perc = parseInt(perc);
        $(this).css('background-color', hsl_col_perc(perc))
    })
    
    
    
}
function Evaluate(ths, user) {
    var search = "<div class=\"tweetect-searching\">" +
        "<div id=\"fountainG\"><div id=\"fountainG_1\" class=\"fountainG\"></div><div id=\"fountainG_2\" class=\"fountainG\"></div><div id=\"fountainG_3\" class=\"fountainG\"></div><div id=\"fountainG_4\" class=\"fountainG\"></div><div id=\"fountainG_5\" class=\"fountainG\"></div><div id=\"fountainG_6\" class=\"fountainG\"></div><div id=\"fountainG_7\" class=\"fountainG\"></div><div id=\"fountainG_8\" class=\"fountainG\"></div></div>" +
        "<h4></h4>" +
        "</div>"
        
    $("#tweetect-tweet-dialog .modal-body").append(search);   
    $("#tweetect-tweet-dialog .tweetect-searching h4").text("Evaluating " + user)
    var handle = $(ths).parents(".content").first().find(".username b").first().text()
    $.get(API + handle, function(){}).done(function(data){
        $(".tweetect-searching").remove();
        Report(user, data);
    });
}

function Filter(ths){
    var user = $(ths).parents(".content").first().find(".FullNameGroup strong").first().text()
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
    $("#tweetect-enterhashtag").on('keyup',function(e){

        if(e.keyCode == 13)
        {
            var value = $("#tweetect-enterhashtag").val()
            if (value != ""){
                if (value.charAt(0) != "#"){value = "#" + value}
                var hashtag = "<div class=\"tweetect-hashtag\">" + value +
                    "</div>"
                $(".tweetect-hashtags").append(hashtag);
                $("#tweetect-enterhashtag").val("");
            }
        }
    });
    
    $(".tweetect-evalbutton > button").click(function(){
        $(".tweetect-filtering").remove();
        Evaluate(ths, user);
    });
}
$(".ProfileTweet-action--tweetect").click(function () {
    $("#tweetect-tweet-dialog").css("display", "block");
    var offset = ($(window).width() - $("#tweetect-tweet-dialog-dialog").width()) / 2.0;
    $("#tweetect-tweet-dialog-dialog").css("left", offset.toString() + "px");
    Filter(this);  
   
})
$("#tweetect-tweet-dialog").click(function () {
    $("#tweetect-tweet-dialog").css("display", "none");
    clearTimeout(LoadTimeout);
    $("#tweetect-tweet-dialog .modal-body").empty()

})
$(".tweetectDialog-modal").click(function () {
    event.stopPropagation();
})
