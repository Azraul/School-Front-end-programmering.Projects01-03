/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 2   *****
************************/

/*********************
******  memory  ******
**********************/

//Skapa en array med kort

var memorykorten = [{
    'name': 'rarity',
    'img': '../media/memory/rarity.png',
  },
  {
    'name': 'rainbow',
    'img': '../media/memory/rainbow.png',
  },
  {
    'name': 'pinkie',
    'img': '../media/memory/pinkie.png',
  },
  {
    'name': 'apple',
    'img': '../media/memory/apple.png',
  },
  {
    'name': 'twilight',
    'img': '../media/memory/twilight.png',
  },
  {
    'name': 'flutter',
    'img': '../media/memory/fluttershy.png',
  },
];

//Vi gör dubletter av bilderna genom att duplicera arrayen
//Super duper awesome random så man kan refresh spamma!
var gameGrid = memorykorten.concat(memorykorten).sort(function () {
  return 0.5 - Math.random();
});

//Variabler:
//Dina val
var kortEtt = '';
var kortTva = '';
//Hur många kort du har tryckt (memory = 2)
var count = 0;
//En variabel som vi använder så att man inte kan trycka på samma kort 2 gånger efter varann
var previousTarget = null;
//vår fina vänta variable så vi hinner animera saker
var delay = 1200;

//Hämta diven för spelet
var memory = document.getElementById('memory');

//skapa en grid att ha korten i
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');

//Sätt griden i spelet, annars blir den sist på sidan
memory.appendChild(grid);

//Sätt in arrayen i griden som divar och sätter bilden till bakgrund
gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;

    //styla dem och ge den nya diven namnet från arrayen
  var kort = document.createElement('div');
  kort.classList.add('kort');
  kort.dataset.name = name;

    //Gör en div som är kortets "framsida"
  var upp = document.createElement('div');
  upp.classList.add('upp');

    //Div som är baksidan, alltså den som är vänd ner i början
  var ner = document.createElement('div');
  ner.classList.add('ner');
  ner.style.backgroundImage = 'url(' + img + ')';
    //Sätt dina nya fina divar i griden
  grid.appendChild(kort);
  kort.appendChild(upp);
  kort.appendChild(ner);
});

//Logiken om du väljer rätt
var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (kort) {
    kort.classList.add('match');
  });
};

//När man valt 2 kort börjar vi om med denna funktion
var resetGuesses = function resetGuesses() {
  kortEtt = '';
  kortTva = '';
  count = 0;
  previousTarget = null;

  //Måste också tabort selected klassen annars har vi snart valt alla kort
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (kort) {
    kort.classList.remove('selected');
  });
};

//Function när du trycker på korten
grid.addEventListener('click', function (event) {

  var clicked = event.target;

 //men bara om du trycker på korten
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  //Lägg till klassen som vänder att du valt det kortet
  if (count < 2) {
    count++;
    if (count === 1) {
      kortEtt = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      kortTva = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (kortEtt && kortTva) {
      if (kortEtt === kortTva) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});