/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 2   *****
************************/

/*********************
***** tidtagare ******
**********************/

//tänk va lätt att va en AI, beföre bara milisekunder dom....
var hours = 0 ;
var minutes = 0 ;
var seconds = 0 ;
var milliseconds = 0 ;

//Vår "bool" om du har tryckt eller inte, börjar att du inte har tryckt
running = false;

//Om du trycker
document.addEventListener('click', function(){
    if (running == false){
        startTimer();
    }
    else{
        stopTimer()
    }
});

//Efter många om och men, preventDefault <3 StackOverflow!!!
//Nu kan man högreclicka och den spammar inte right click menu!
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    if (running == true){
        setLaps();
    }
    else{
        resetTimer();
    }
 }, true); 

//Starttimer funktionen
//När du är mindre än 59 så får du fortsätta räkna på den du är

function startTimer() {
    millisecInt = setInterval(function(){
        milliseconds = ( milliseconds > 1000 ) ? 1 : ( milliseconds + 1 ) ;
        setTimeToHTML(hours, minutes, seconds, milliseconds);
    },1);
    secondsInt = setInterval(function() {
        seconds = ( seconds > 59 ) ? 1 : ( seconds + 1 ) ;
    },1000);
    minutesInt = setInterval(function(){
        minutes = (minutes > 59 ) ? 1 : ( minutes + 1 ) ;
    }, 1000 * 60);
    hoursInt = setInterval(function(){
        hours = ( hours > 59 ) ? 1 : ( hours + 1 ) ;
    },1000 * 60 * 60);
    running = true;
}


//Clear interval stop funktion
function stopTimer() {
    clearInterval(millisecInt); clearInterval(secondsInt); clearInterval(minutesInt); clearInterval(hoursInt);
    running = false;
}

//Reset
function resetTimer() {
    stopTimer();
    hours = 0 ; minutes = 0 ; seconds = 0 ; milliseconds = 0 ;
    setTimeToHTML(hours, minutes, seconds, milliseconds);
    document.getElementById("laps").innerHTML = "";
}

//Lap funktion
function setLaps() {
    var p = document.createElement("p") ;
    var timer = document.getElementById("hours").innerText + " : " + document.getElementById("minutes").innerText + " : " + document.getElementById("seconds").innerText + " : " + document.getElementById("milliseconds").innerText ;
    var ptext = document.createTextNode(timer);
    p.appendChild(ptext);
    var laps = document.getElementById("laps");
    laps.appendChild(p);
}
//Funktionen som printar till html
var setTimeToHTML = function(hours, minutes, seconds, milliseconds) {
    document.getElementById("hours").innerText = (hours.toString().length == 1) ? ("0" + hours) : hours ;
    document.getElementById("minutes").innerText = (minutes.toString().length == 1) ? ("0" + minutes) : minutes ;
    document.getElementById("seconds").innerText = (seconds.toString().length == 1) ? ("0" + seconds) : seconds ;
    document.getElementById("milliseconds").innerText = milliseconds;
}