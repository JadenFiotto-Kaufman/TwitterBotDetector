var savedCookie = {
  url:"https://twitter.com",
  name:"TweetectSaved"
}
var keyCookie = {
  url:"https://twitter.com",
  name:"TweetectKey"
}
var secretCookie = {
  url:"https://twitter.com",
  name:"TweetectSecret"
}
function getCookie(name, sendResponse){
  var cook;
  if (name == "key"){
    cook = Object.assign({}, keyCookie); 
  }
  else if (name =="secret"){
    cook = Object.assign({}, secretCookie); 
  }
  chrome.cookies.get(cook,function(cookie){
    sendResponse(cookie != null ? cookie.value: null)
  })
}
function setCookie(name, val,sendResponse){
  var cook;
  if (name == "key"){
    cook = Object.assign({}, keyCookie); 
  }
  else if (name =="secret"){
    cook = Object.assign({}, secretCookie); 
  }
  cook.value = val;
  chrome.cookies.set(cook)
  sendResponse()
}
function removeSaved(name){
  
  chrome.cookies.get(savedCookie,function(cookie){
    var cook
    if (cookie == null){
     cook = []
    }
    else{
      cook = JSON.parse(cookie.value);
    }
    for (var i = 0; i < cook.length; i++){
      var itt = cook[i];
      if (itt["user"] == name){
        cook.splice(i,1);
        break;
      }
    }
    var newObj = Object.assign({}, savedCookie); 
    newObj.value = JSON.stringify(cook)
    chrome.cookies.set(newObj)
  })
}


function setSaved(user, data){
  var item = {
    user:user,
    data:data
  }
  chrome.cookies.get(savedCookie,function(cookie){
    var cook
    if (cookie == null){
     cook = []
    }
    else{
      cook = JSON.parse(cookie.value);
    }
    cook.push(item)
    var newObj = Object.assign({}, savedCookie); 
    newObj.value = JSON.stringify(cook)
    chrome.cookies.set(newObj)
  })
}
function getSaved(sendResponse){
  chrome.cookies.get(savedCookie,function(cookie){
    var cook
    if (cookie == null){
     cook = "[]"
    }
    else{
      cook = cookie.value;
    }
    sendResponse({data:cook})
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.type == "setSaved"){
    setSaved(request.options['user'], request.options['data'])
  }
  else if (request.type == "removeSaved"){
    removeSaved(request.options["name"])
  }
  else if(request.type == "getSaved"){
    getSaved(sendResponse);
  }
  else if (request.type == "getCookie"){
    getCookie(request.options["kType"], sendResponse)
  }
  else if (request.type == "setCookie"){
    setCookie(request.options["kType"], request.options["val"],sendResponse);
  }
  return true;
  /* if (request.type == "worktimer-notification")
    chrome.notifications.create('worktimer-notification', request.options, function() { });

  sendResponse(); */
});