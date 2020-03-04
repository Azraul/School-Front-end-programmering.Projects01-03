/************************
******  Kristoffer ******
******    Kuvaja   ******
*************************
******  Front End   *****
******  Projekt 2   *****
************************/

/*********************
******   bilder ******
**********************/

// hämta modal
var modal = document.getElementById('myModal');

// Ta bilden och sätt den i modal imagen också så vi får den zoomad i modalen
var img01 = document.getElementById("img01");
var img02 = document.getElementById("img02");
var img03 = document.getElementById("img03");
var modalImg = document.getElementById("imgModal");
var captionText = document.getElementById("caption");
img01.onmouseover = function(){
    modal.style.opacity = 1;
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}
img02.onmouseover = function(){
    modal.style.opacity = 1;
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}
img03.onmouseover = function(){
    modal.style.opacity = 1;
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// eftersom det prompt skulle vara on mouseleave så blev det de, men på modal imagen såklart
modalImg.onmouseout = function fade(element) {
    element = document.getElementById('myModal');
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    if (op == 0){
        modal.style.display = "none";
    }
    }, 50);
}