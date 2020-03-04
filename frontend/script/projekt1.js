
/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 1   *****
************************/

/*********************
******  Uppg 1  ******
******          ******
**********************/

//Spara namnet i a och b, combinera dem och gör första bokstaven STOR och de andra små
function generateName(){
    var a = document.lånetagare.lastName.value;
    var b = document.lånetagare.firstName.value;
    var fullName = a.charAt(0).toUpperCase()+a.slice(1).toLowerCase() +" " + b.charAt(0).toUpperCase()+b.slice(1).toLowerCase();
    document.querySelector("#fullName").innerHTML = fullName;
}

/*********************
******  Uppg 2  ******
******          ******
**********************/
function convertToManyThings(){
    var userNumber = document.talsystem.walletSize.value;
    //Gör så att alla , blir till .
    userNumber = userNumber.replace(',','.');
    //Tar heltalet till senare
    var userHelTal = Math.floor(userNumber);
    //Testa så att det är ett tal
    if (isNaN(userNumber)){
        //Felmeddelande spam
        document.querySelector("#sqrtTal").innerHTML = "#N/A";
        document.querySelector("#squareTal").innerHTML = "#N/A";
        document.querySelector("#invertTal").innerHTML = "#N/A";
        document.querySelector("#helTal").innerHTML = "#N/A";
        document.querySelector("#binaryTal").innerHTML = "#N/A";
        document.querySelector("#oktaTal").innerHTML = "#N/A";
        document.querySelector("#hexaTal").innerHTML = "#N/A";
    }
    else {
        //Alla uträkningar
        document.querySelector("#sqrtTal").innerHTML = Math.sqrt(userNumber);
        document.querySelector("#squareTal").innerHTML = userNumber*userNumber;
        document.querySelector("#invertTal").innerHTML = 1/userNumber;
        document.querySelector("#helTal").innerHTML = userHelTal;
        document.querySelector("#binaryTal").innerHTML = userHelTal.toString(2);
        document.querySelector("#oktaTal").innerHTML = userHelTal.toString(8);
        document.querySelector("#hexaTal").innerHTML = userHelTal.toString(16);

        }
    }

/*********************
******  Uppg 3  ******
******          ******
**********************/

function superEasyLoan(){
    //Variabler och uträkningar, source:
    //https://sv.wikipedia.org/wiki/Annuitetsl%C3%A5n
    var S = document.loanKalken.userLoan.value;
    var p = document.loanKalken.userTax.value/12/100;
    var n = document.loanKalken.userLoanLength.value*12;
    var paymentLoan = S*((p*Math.pow((1+p),n))/(Math.pow((1+p),n)-1));
    console.log(paymentLoan);
    //Heltalsvärden
    document.querySelector("#monthlyPay").innerHTML = Math.floor(paymentLoan) +"€";
    document.querySelector("#totalPay").innerHTML = Math.floor(paymentLoan*n) +"€";
}
/*********************
******  Uppg 4  ******
**********************
*** Ett fält       ***
*** En färgsättare ***
*** Massa med kod  ***
**********************/

//Ett fält, en färgsättare, massa med kod.
function superRGB(){
    var color = document.RGBmonster.userRGB.value.toLowerCase();
    console.log(color+" orginal värdet");
    
    //Kollar om användaren skrev hexadecimal kod och sätter den i lådan
    if (color.charAt(0)=="#" && color.length==7){
        var hexa = color;
        //Sätt färgen
        document.getElementById("boxOfRGB").setAttribute("style", "fill:"+hexa);
        
        //Ta endast koden
        var hexatorgb  = hexa.slice(1);

        //Dela upp koden i r, g, b
        var red = hexatorgb.charAt(0)+hexatorgb.charAt(1);
        var green = hexatorgb.charAt(2)+hexatorgb.charAt(3);
        var blue = hexatorgb.charAt(4)+hexatorgb.charAt(5);

        //Sätt ihop allt samtidigt som hexa talen omvandlas till decimaltal
        hexatorgb = "rgb("+parseInt(red,16)+","+parseInt(green,16)+","+parseInt(blue,16)+")"

        //Skriv ut dem
        document.querySelector("#userRGB").innerHTML = hexatorgb;
        document.querySelector("#userHexa").innerHTML = hexa;
    }

    //Kollar om användaren skrev en rgb kod som börjar med 'rgb(' och slutar med ')'
    else if (color.charAt(0)=="r" && color.charAt(1)=="g" && color.charAt(2)=="b" && color.charAt(3)=="(" && color.charAt(color.length-1)==")"){
        //Hittar '(' Tar allt som kommer fram till ')'
        var rgbNumbers = color.split("(")[1].split(")")[0];

        //Delar upp det som blev över till en array
        rgbNumbers = rgbNumbers.split(",");

        //Gör varje array del till hexadecimal
        var rgbtohex = rgbNumbers.map(function(x){
            x = parseInt(x).toString(16);
            return (x.length==1) ? "0"+x :x;})

        //Sätter tillbaka arrayn till en string
            rgbtohex = "#"+rgbtohex.join("");

        //Kollar om användarens RGB blev en giltig hexadecimal kod och sätter den i lådan
        if (rgbtohex.length==7){
            document.querySelector("#boxOfRGB").setAttribute("style", "fill:"+rgbtohex);
            document.querySelector("#userRGB").innerHTML = color;
            document.querySelector("#userHexa").innerHTML = rgbtohex;
        }
        else {
            document.querySelector("#userRGB").innerHTML = "#N/A";
            document.querySelector("#userHexa").innerHTML = "#N/A";
        }
    }
    //Om ingen kod var giltig
    else {
        document.querySelector("#userRGB").innerHTML = "#N/A";
        document.querySelector("#userHexa").innerHTML = "#N/A";
    }
}
/*********************
******  Uppg 5  ******
******          ******
**********************/

function UsersExtreme(){
    //Ifall man vill ha nya namn, kanske namnen vart oönskliga?
    document.querySelector("#users").innerHTML ="";
    document.querySelector("#varden").innerHTML ="";
    //Variabler
    var randomuser="";
    var randomNumbers="";
    //På hittade namn
    var firstNames=["Bertil","Sune","Börje", "Olaf", "Sven", "Sture", "Kalle", "Erik","Stina", "Olga","Helga", "Freja", "Ylva", "Frig", "Hera", "Lagerta", "Alva", "Elsa","Agda", "Harald", "Ragnar", "Sven-olaf", "Rune", "Otto"];
    var lastNames=["Björksson", "Sunesson", "Sågsson", "Olafsson", "Svensson", "Eriksson", "Haraldsson", "Ragnarsson", "Haraldsson", "Runesson", "Ottosson", "Kallesson", "Mårdsson", "Rövardotter", "Bergavik", "Skogsdal", "Högberg", "Fjärdsson", "Strömsson"];

    //Random loopen, valde att göra 10 av varje så att de kan va i samma loop.
    for (var i = 0; i<10; i++){
        randomuser = firstNames[Math.floor(Math.random()*firstNames.length)] +" " +lastNames[Math.floor(Math.random()*lastNames.length)];
        randomNumbers = Math.floor(Math.random()*100000);
        document.querySelector("#users").innerHTML +="<li>"+randomuser+"</li>";
        document.querySelector("#varden").innerHTML +="<li>"+randomNumbers+"</li>";
    }    
}
//Loop som sortera användarna "users" i alfabetisk ordning
function UserSorter2018(){
    var list, i, sortera, b, borSortera;
    list = document.getElementById("users");
    sortera = true;

    while (sortera) {
          sortera = false;
          b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            borSortera = false;

            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
              borSortera = true;
              break;
            }

        }
        if (borSortera) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            sortera = true;
        }
    }
}
//Funktion som sortera siffror i sjunkande ordning
function VardenSorter2018(){
            var list, i, sortera, b, borSortera;
        list = document.getElementById("varden");
        sortera = true;
    while (sortera) {
          sortera = false;
          b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            borSortera = false;            
            if (Number(b[i].innerHTML) < Number(b[i + 1].innerHTML)) {
              borSortera = true;
              break;
            }
        }
          if (borSortera) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            sortera = true;
            }
    }
}
/*********************
******  Uppg 6  ******
******          ******
**********************/

//Skriver dagens datum eftersom det troligen är användbart
document.addEventListener('DOMContentLoaded', function() {
    var a = new Date();
    console.log(a);
    document.querySelector("#dagensDatum").innerHTML = a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear();
})
//Lägg till en ny egenskap i Date med otroliga prototype
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
//Skapa ett datum
var date = new Date();

//Vecko-array
//Den kom ju fint med i uppgift 8 sen också
var veckodagar = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];

function whenToPay(){
    //Tvinga den till en siffra med parseInt
    var userWish = parseInt(document.betalaDatum.userDateToPay.value);
    //
    var d = date.addDays(userWish);

    /* Troubleshooting 2018
    console.log("Datum: "+d.getDate());
    console.log("Dag: "+d.getDay());
    */

    //Om lördag (6), gå 2 dagar framåt
    //Printa med datum variabln a från tidigare
    if (d.getDay() == 6){
    a = date.addDays(userWish+2);
    document.querySelector("#userForfallodag").innerHTML = a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear();
    document.querySelector("#dayofpayment").innerHTML = "Det är en " +veckodagar[a.getDay()]+".";
    }
    //Om söndag (0), gå 1 dag framåt
    else if (d.getDay() == 0) {
        a = date.addDays(userWish+1);
    document.querySelector("#userForfallodag").innerHTML = a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear();
    document.querySelector("#dayofpayment").innerHTML = "Det är en " +veckodagar[a.getDay()]+".";
    }
    else {
        a = date.addDays(userWish);
        document.querySelector("#userForfallodag").innerHTML = a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear();
        document.querySelector("#dayofpayment").innerHTML = "Det är en " +veckodagar[a.getDay()]+".";
    }
}

/*********************
******  Uppg 7  ******
******          ******
**********************/

/* Hittar inte den internationell guiden du nämner i uppgiften?
** efter en stunds sökande använder jag mig av följande dokument:
** https://www.finanssiala.fi/maksujenvalitys/dokumentit/Gireringsguide.pdf
** Paragraf 7b) RF-referens
** Hitta inget angående kontrollnummer där, lägger till det iallafall
*/

function referens(){
    //array med 1, 3, 7, max storlek 19
    var ettTreSju = [1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
    var refnummer = [];
    var kontroll = 0;
    //Nya nummer varje gång du trycker på knappen
    document.querySelector("#finsktNummer").innerHTML ="";
    document.querySelector("#internationelltNummer").innerHTML ="RFXX ";
    //Mitt refernsnummret ska vara 13 siffror långt så vi behöver 12 siffror + kontrollsiffra
    for (var i=0; i<12; i++){
    refnummer[i] = Math.floor(Math.random()*9+1);
    
    //Check att det stämmer
    console.log(refnummer[i]);

    kontroll += (ettTreSju[i]*refnummer[i]);
    document.querySelector("#finsktNummer").innerHTML += refnummer[i];
    document.querySelector("#internationelltNummer").innerHTML += refnummer[i];

    //En while loop som addar mellanrum upp till max antalet för referensnummer
    // --- Bonus! Chrome går sönder om du glömmer break; ¯\_(ツ)_/¯ --- 
        while (i == 4 || i == 9 || i == 13 || i == 18){
            document.querySelector("#finsktNummer").innerHTML += " ";
            break;
        }
        while (i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23){
            document.querySelector("#internationelltNummer").innerHTML += " ";
            break;
        }
    }
    //Dubblecheck
    console.log(kontroll);
    console.log(Math.ceil((kontroll+1)/10)*10);
    //Dags för sista siffran
    var kontrollSiffran = (Math.ceil((kontroll+1)/10)*10)-kontroll;
    //Lägg till sista (ifall det är 10 tar den 0) siffran från variablen kontrollSiffran
    document.querySelector("#finsktNummer").innerHTML += (Math.abs(kontrollSiffran)% 10);
    document.querySelector("#internationelltNummer").innerHTML += (Math.abs(kontrollSiffran)% 10);
}
    

/*********************
******  Uppg 8  ******
******          ******
**********************/

//En fin teckenlista
var signumSecret = ["0","1","2","3","4","5","6","7","8","9",
                    "A","B","C","D","E","F","H","J","K","L",
                    "M","N","P","R","S","T","U","V","W","X","Y"];

function robot(){
    //Hämta användarens input
    var signumCheck = document.signum.userSignum.value;
    //Skapa en variable utan bokstäverna
    var signumCalculation = signumCheck.replace(/[^0-9\.]+/g, "");
    var birthdayDate = signumCalculation.slice(0,6);

    //För att få rätt århundrade
    if (signumCheck.charAt(6).toUpperCase() == "A"){
        birthdayDate += "20";
    }
    else if (signumCheck.charAt(6) == "-"){
        birthdayDate += "19";
    }
    else if (signumCheck.charAt(6) == "+"){
        birthdayDate += "18";
    }
    //Slå ihop datumet till inbyggda Date; Snyggt -- kappa
    var itsMyBirthday = new Date(   
        birthdayDate.charAt(6)+birthdayDate.charAt(7)+birthdayDate.charAt(4)+birthdayDate.charAt(5),
        (birthdayDate.charAt(2)+birthdayDate.charAt(3)-1),
        birthdayDate.charAt(0)+birthdayDate.charAt(1));

    //Tillbaka till kontrollen av användaren; Finska systemet med 31, vad blir resten?
    signumCalculation = signumCalculation % 31;

    //Nu eller aldrig, kontrollen om du är en finne!
    if (signumCheck.charAt(signumCheck.length-1).toUpperCase() == signumSecret[signumCalculation]){
        document.querySelector("#birthday").innerHTML = "Grattis du är en finne som föddes på en "+ veckodagar[itsMyBirthday.getDay()]+", ";
        
        //Pojke eller flicka
        if (signumCheck.charAt(9) % 2 == 1){
            document.querySelector("#birthday").innerHTML += "som en pojke!"
        }
        else if (signumCheck.charAt(9) % 2 == 0){
            document.querySelector("#birthday").innerHTML += "som en flicka!"
        }
    }
    else {
    document.querySelector("#birthday").innerHTML = "Du skrev fel eller... kanske du är svensk?"
    }
}