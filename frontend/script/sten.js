/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 2   *****
************************/

/*********************
*****  Sten, Sax *****
******    Påse  ******
**********************/
    
    

function SSP(){
    var p1 = document.stensaxpåseForm.player1.value;
    var p2 = document.stensaxpåseForm.player2.value;
    if (p1 == ""){
        p1 = "Spelare 1";
    }
    if (p2 == ""){
        p2 = "Spelare 2";
    }
    var spelare1 = prompt(p1 +" skriv in ditt val: Sten, Sax eller Påse");
    var spelare2 = prompt(p2 +" skriv in ditt val: Sten, Sax eller Påse");
    spelare1 = spelare1.toLocaleLowerCase();
    spelare2 = spelare2.toLocaleLowerCase();
    if ((spelare1=="sten"||spelare1=="sax"||spelare1=="påse") && (spelare2=="sten"||spelare2=="sax"||spelare2=="påse")){
    victor(spelare1, spelare2,p1,p2);
    }
    else{
        alert("Något gick fel, prova igen");
    }
}
function resetResultat(){
    document.getElementById('resultatLista').innerHTML = "";
}
function resultat(medd){
    var nyttResultat = document.getElementById('resultatLista');
    nyttResultat.innerHTML += "<li>"+medd+"</li>";
}
function victor(spelare1,spelare2,p1,p2){
    if (spelare1 == spelare2){
        resultat("Ingen van.");
    }
    else if (spelare1 == "sten" && spelare2 == "sax"){
        resultat(p1 +" van.");
        }
    else if (spelare1 == "sten" && spelare2 == "påse"){
        resultat(p2 +" van.");
        }
    else if (spelare1 == "sax" && spelare2 == "sten"){
        resultat(p2 +" van.");
        }
    else if (spelare1 == "sax" && spelare2 == "påse"){
        resultat(p1 +" van.");
        }
    else if (spelare1 == "påse" && spelare2 == "sten"){
        resultat(p1 +" van.");
        }
    else if (spelare1 == "påse" && spelare2 == "sax"){
        resultat(p2 +" van.");
        }
}       

/* Switch kunde bara ta emot 1 parameter i taget och vi måste jämnföra 2
    därför användes else if istället
        switch (spelare1){
            
            case "sten" && spelare2 =="sax":
            resultat(p1 +" van.");
            break;

            case "sten" && spelare2 =="påse":
            resultat (p2 +" van.");
            break;

            case "sax" && spelare2 =="sten":
            resultat(p2 +" van.");
            break;

            case "sax" && spelare2 =="påse":
            resultat(p1+" van.");
            break;

            case "påse" && spelare2 =="sten":
            resultat(p1+" van.");
            break;

            case "påse" && spelare2 =="sax":
            resultat(p2+" van.");
            break;

            default: alert("Något gick fel, prova igen");*/