
var temp1 = "<div class=\"popupitem\">" +
    "<div class=\"popupname\">"
var temp2 = "</div>" +
    "<div class=\"popupdata\">"
var temp3 = "</div>" +
    "<div class=\"orangeBox\"><span class=\"x\">X</span></div>" +
    "</div>"
function addSaved() {
    var items = chrome.runtime.sendMessage({
        type: "getSaved", options: {}
    }, function (response) {
        var items = JSON.parse(response.data)
        items.forEach(function (item) {
            $("#pmain").append(temp1 + item['user'] + temp2 + item['data'] + temp3)
        });
        $(".orangeBox").click(function () {
            var par = $(this).parent();
            var name = par.find(".popupname").first().text();
            chrome.runtime.sendMessage({
                type: "removeSaved", options: {name:name}
            });
            $(par).remove();
        })
    });

}
addSaved()