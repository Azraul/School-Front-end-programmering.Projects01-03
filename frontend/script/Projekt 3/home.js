/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 3   *****
************************/



$(document).ready(function(){
  $("#personerLista").click(function(){
    jsonFunk()});
    $("#djurLista").click(function(){
      jsonDunk()});

    $("#cookieRedrum").click(function(){
      delCookie()});
    //Användare och cookies                                                             
    $("#nyFRIEND").click(function(){
    checkCookie();
    $("#nyFRIEND").hide();
    $("#FRIEND").show();
    });

  visits();
    $("#hide").click(function(){
      $(this).hide();
      $("#show").show("explode");
    });
    $("#show").click(function(){
        $(this).hide("explode");
        $("#hide").show();
      });
    
    //Fixa fram snö och en fin out animation och ladda AJAX text
    //Uppgift 1 & 5
    $("#julTider").click(function(){
        $(this).fadeOut(1000);
        $.fn.snow();
        loadDoc();
            });
    //Min datepicker på svenska
    $(function(){
        $("#jqDates").datepicker({
            altField: "#alternate",altFormat: "DD, d MM, yy"}, $.datepicker.regional[ "sv" ]);
    });
    /*IT'S RGB TIME - Ändrar på top Navbar backgrundfärg
    *Borde också skriva ut nuvarande färg*/
    $( function() {
        function hexFromRGB(r, g, b) {
          var hex = [
            r.toString( 16 ),
            g.toString( 16 ),
            b.toString( 16 )
          ];
          $.each( hex, function( nr, val ) {
            if ( val.length === 1 ) {
              hex[ nr ] = "0" + val;
            }
          });
          return hex.join( "" ).toUpperCase();
        }
        function refreshTopNav() {
          var red = $( "#rgbRED" ).slider( "value" ),
            green = $( "#rgbGREEN" ).slider( "value" ),
            blue = $( "#rgbBLUE" ).slider( "value" ),
            hex = hexFromRGB( red, green, blue );
          $( "#navbar" ).css( "background-color", "#" + hex );
          $( "#jqHEX" ).text("#"+hex);
        }
     
        $( "#rgbRED, #rgbGREEN, #rgbBLUE" ).slider({
          orientation: "horizontal",
          range: "min",
          max: 255,
          value: 127,
          slide: refreshTopNav,
          change: refreshTopNav
        });
        $( "#rgbRED" ).slider( "value", 50 );
        $( "#rgbGREEN" ).slider( "value", 100 );
        $( "#rgbBLUE" ).slider( "value", 190 );
      } );
    });

  //HTML5 slider som ändrar på en SVGs färg
  function decTillHex() {
    var rDec = document.htmlRGB.rdec.value
    var gDec = document.htmlRGB.gdec.value
    var bDec = document.htmlRGB.bdec.value
    document.getElementById("boxOfRGB").style.fill = "rgb(" +rDec+ ","+gDec+","+bDec+")";
    document.htmlRGB.drod.value = rDec;
    document.htmlRGB.dgreen.value = gDec;
    document.htmlRGB.dblue.value = bDec;
  }
  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        document.getElementById("AJAX").innerHTML = this.responseText;
    };
    xhttp.open("GET", "letitsnowinfo.txt", true);
    xhttp.send();
  }

  //W3 schools - Set das cookie
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  //W3 schools - Get das cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //W3 schools - Check
  //Första gången skriver du in ditt namn och den säger välkommen +dittnamn
  //Om du redan finns med så säger den det andra
  function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
      document.getElementById("FRIEND").innerHTML =("Kul att du titta in igen " + username);
    } else {
      username = prompt("Please enter your name:", "");
      if (username != "" && username != null) {
        setCookie("username", username, 365);
        document.getElementById("FRIEND").innerHTML =("Välkommen " + username);
      }
    }
  } //Sparar datan i en fin liten ruta som säger vem du är som snurrar i CSS.


  //visit counter
  //Modifierad från: https://jsfiddle.net/77N8u/16/
  function visits(){
  if (localStorage.pagecount)
  {
    localStorage.pagecount=Number(localStorage.pagecount) +1;
  }
  else
  {
    localStorage.pagecount=1;
  }
  if (localStorage.pagecount == 1){
  document.getElementById("FRIEND").title =("Du har varit här "+ localStorage.pagecount + " gång.");
  }
  else{
    document.getElementById("FRIEND").title =("Du har varit här "+ localStorage.pagecount + " gånger.");
  }
}
/*Vision var att kunna trycka på olika knappar
*skicka in ett värde i jsonFunk och sen använda
*det värdet som en variable för name eller pets
*för att få EN funktion att ge olika saker
*men jag fick det aldrig att funka så det blev 2 funktioner*/

//Mitt namn
function jsonFunk(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      document.getElementById("jsonSpunk").innerHTML = myObj.name;
    }
  };
  xmlhttp.open("GET", "JSON.txt", true);
  xmlhttp.send();
}
//Mina katter, med en loop ifall jag skaffar fler
function jsonDunk(){
  var i, x = "";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      for (i = 0; i < myObj.pets.length; i++) {
        x += myObj.pets[i].name + "<br>";
      }
      document.getElementById("jsonSpunk").innerHTML = x;
    }
  };
  xmlhttp.open("GET", "JSON.txt", true);
  xmlhttp.send();
}

//Alla vet att människan kom till 1970; hoppas cookien var smaka gott.
function delCookie(){
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.pagecount = 0;
  location.reload();
}