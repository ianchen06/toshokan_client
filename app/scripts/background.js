// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';

chrome.webRequest.onBeforeRequest.addListener(
        function(details) { 
          console.log('[blocked]')
          console.log(JSON.stringify(details))
          if(details.method == "POST"){
            return {cancel: true}; 
          }
        },
        {urls: ["*://*/gogodstl*"]},
        ["blocking","requestBody"]);

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion)
})

chrome.browserAction.setBadgeText({text: '\'Allo'})

console.log('\'Allo \'Allo! Event Page for Browser Action')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.status == 200) {
      chrome.browserAction.setBadgeText ( { text: "done" } );
      setTimeout(function () {
          chrome.browserAction.setBadgeText( { text: "" } );
      }, 1000);
      sendResponse({status: request.status});
    }
  }
);
