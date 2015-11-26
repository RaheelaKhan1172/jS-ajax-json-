'use strict';

function getData(file) {
  
  var promise = new Promise(function (resolve,reject) {
    var request = new XMLHttpRequest();
    request.open('GET',file);
    request.send(); //send request to server/ GET requests don't include body so parens are empty
    request.onreadystatechange = function() {       /// check to see if request is complete 
      if(request.readyState === 4 && request.status === 200) {
        resolve(request.responseText);
      } else {
        var reason = file + ":" + request.status + '-' + request.statusText;
        reject(reason);
      }
    };
  });
  return promise;
}

function displayResult(jsonString) {
  var jsonObj = JSON.parse(jsonString);
  console.log(jsonString,"Fsdfs");
  var info = "";
  for(var prop in jsonObj) {
    info += '<p>' + prop + ':' + jsonObj[prop] + '<p>';
  }
  console.log(jsonObj);
  document.getElementById('description').innerHTML = info + "Bafsdfsdffsfs";
}    

function displayError(reason) {
  document.getElementById('description').innerHTML = reason;
}

function startPromise(event) {
  var file = '../data/' + event.target.id + '.json'; 
  
  var promised = getData(file); 

 promised.then(displayResult).catch (displayError); 
}

document.getElementById('galaxy').addEventListener('click',startPromise,false);
