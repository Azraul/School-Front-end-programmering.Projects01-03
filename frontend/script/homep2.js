/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 2   *****
************************/

/*********************
******    Home  ******
*** Data collecting **
**********************/

//Massa med variabler som sparas så det är enkelt att printa dem strukturerat.
function uppgift1(){
var BrowserCodeNamn = "Browser CodeName: " + navigator.appCodeName;
var BrowserNamn = "Browser Name: " + navigator.appName;
var versionInfo = "Version Info: " + navigator.appVersion;
var versionLanguage = "Language of the browser: " + navigator.language;
var width = window.screen.width * window.devicePixelRatio;
var height = window.screen.height * window.devicePixelRatio;
//Mobil friendly
var widthAva = window.screen.availWidth *  window.devicePixelRatio;
var heightAva = window.screen.availHeight *  window.devicePixelRatio;
//Massor med info printat
document.getElementById("användarData").innerHTML = 
    BrowserCodeNamn+"<br>"+
    BrowserNamn+"<br>"+
    versionInfo+"<br>"+
    versionLanguage+"<br>"+
    "Screen Res (px): "+width+" x "+height+"<br>"+
    "Browser size (px): "+widthAva+" x "+heightAva+"<br>";
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        document.getElementById("geoLo").innerHTML = "Vill man inte veta så vill man inte";
    }
}

function showPosition(position) {
    document.getElementById("geoLo").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}
function getIP(json) {
    document.getElementById("dinIP").innerHTML= "Din IP är: "+ json.ip;
  }