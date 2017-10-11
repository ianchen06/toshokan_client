console.log('\'Allo \'Allo! Content script')
var params = JSON.stringify({body: '<!DOCTYPE HTML>' + '\n' + document.documentElement.outerHTML,
url: window.location.href})
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        chrome.runtime.sendMessage({status: xmlhttp.status}, function(response) {
          console.log("[contentscript]" + response);
        });
        if (xmlhttp.status == 200) {
            console.log("[contentscript]" + xmlhttp.responseText);
        }
        else if (xmlhttp.status == 400) {
            //alert('There was an error 400');
        }
        else {
            //alert('something else other than 200 was returned');
        }
    }
};

xmlhttp.open("POST", "https://localhost:5000/view", true);
xmlhttp.setRequestHeader("Content-type", "application/json");
xmlhttp.send(params);
