'use strict';
(function(){
//zmienne
var twojWybor;
var kam = document.getElementById("kamien");
var pap = document.getElementById("papier");
var noz = document.getElementById("nozyce");
var out = document.getElementById("score");
var stat = document.getElementById("status");
var tab = document.getElementById("table");
//var kompWynik = 0;
//var czloWynik = 0;
var points = document.getElementById("result");
var gameNew = document.getElementById("startGame");
var gamesNum = 0;
var gamesMax = 0;
var params = {
  kompWynik: 0,
  czloWynik: 0,
  runda : 0,
  progres: []
  //gamesNum: 0,
 // gamesMax: 0,
}
//var move;
//var NewGame = false;//do ukrywania przycisków
//kamien=1 remis 1 wygrana 3 porazka 2
//paiper=2 remis 2 wygrana 1 porazka 3
//nozyce=3 remis 3 wygrana 2 porazka 1
 
//ukrycie przycisków po załadowaniu strony reczne
//game(); 
//nie działa przez funkcje
      kam.style.visibility = 'hidden';
      pap.style.visibility = 'hidden';
      noz.style.visibility = 'hidden';
//funkcja porownujaca ruch gracza i komputera
//
var playerMove = function (move){
  var move = event.target.getAttribute("data-move");
 /*  if(x=='rock'){
    move = 'Kamień';
  }
  else if(x=='paper') {
          move = 'Papier';
          }
  else if (x=='scissors') {
    move = 'Nożyczki';
  } */
  var cpmove = compMove();
  if((move=='rock' && cpmove=='rock')||(move=='paper' && cpmove=='paper')||(move=='scissors' && cpmove=='scissors')){
 //remis 
    write(move, cpmove, 'REMIS!');
    var i = params.runda;
    params.progres.push({
      "gra": i,
      "comp": cpmove,
      "man": move,
      "res": "REMIS",
      "wyn": params.kompWynik+'-'+params.czloWynik
    });
    params.runda++;
    //NewGame = false;
    //game(gamesNum, gamesMax);
  }
  else if((move=='rock' && cpmove=='scissors')||(move=='paper' && cpmove=='rock')||(move=='scissors' && cpmove=='paper')){
    //wygrana gracza
    params.czloWynik++;//zmienna do zliczania wygranych gier
    write(move, cpmove, 'WYGRANA!');
   // NewGame = false;
    game(params.czloWynik, gamesMax);
    var i = params.runda;
    params.progres.push({
      "gra": i,
      "comp": cpmove,
      "man": move,
      "res": "Wygrana",
      "wyn": params.kompWynik+'-'+params.czloWynik
    });
    params.runda++;
  }
   else if((move=='rock' && cpmove=='paper')||(move=='paper' && cpmove=='scissors')||(move=='scissors' && cpmove=='rock')){
     //wygrana komputera
     params.kompWynik++;
     write(move, cpmove, 'PORAŻKA!');
  //  NewGame = false;
    game(params.kompWynik, gamesMax);
     var i = params.runda;
     params.progres.push({
       "gra": i,
       "comp": cpmove,
       "man": move,
       "res": "PORAŻKA",
       "wyn": params.kompWynik+'-'+params.czloWynik
     });
     params.runda++;
    
   
  }
}
//funkcja losująca ruch komputera i przypisująca ruch do wylosowanej liczby
var compMove = function(){
  var move = Math.random();
  move = move * 2 +1;//sprawdzic czy szansa wylosowania każdej liczby jest jednakowa
  move = Math.round(move);
  if(move==1){
    return 'rock';
  }
   if(move==2){
    return 'paper';
  }
   if(move==3){
    return 'scissors';
  }
}
//funkcja wypisująca 
var write = function(czlowiek, komputer, wynik){
  out.insertAdjacentHTML('afterbegin', wynik+ ' wybrałeś '+czlowiek+' komputer wybrał '+komputer+'<br>');
  //wypisuje wyniki cp vs czlowiek i do ilu gramy
  points.innerHTML = +params.kompWynik+' -- '+params.czloWynik+'<br>Grasz do '+gamesMax+' zwycięstw<br>';
  //out.insertAdjacentHTML('afterbegin', params.runda+ ' bbbb <br>');
}
//funkcja która ukrywa i pokazuje przyciski gry
//czy można jakoś prościej zapisać?
var game = function(gamesNum, gamesMax){
  if(gamesNum<gamesMax) {
    kam.style.visibility = 'visible';
    pap.style.visibility = 'visible';
    noz.style.visibility = 'visible';
  }
  else {
    //chciałem ukrywać przyciski wywołaniem tej funkcji ale nie działa
    //if(!NewGame){
      kam.style.visibility = 'hidden';
      pap.style.visibility = 'hidden';
      noz.style.visibility = 'hidden';
      if(params.kompWynik>params.czloWynik){
      stat.innerHTML = 'KONIEC GRY! <br> PRZEGRAŁEŚ!';
      tab.innerHTML = '<tr><td>NumerRundy</td><td>RuchKomputera</td><td>RuchGracza</td><td>Wynik</td><td>Wynik po rundzie</td></tr><br>';
      var arLen = params.progres.length;
        for(var i=0; i < arLen; i++){
          tab.insertAdjacentHTML('beforeend', '<tr><td>'+params.progres[i].gra+'</td><td>'+params.progres[i].comp+'</td><td>'+params.progres[i].man+'</td><td>'+params.progres[i].res+'</td><td>'+params.progres[i].wyn+'</td></tr><br>');
        }
      }
      else {
      stat.innerHTML = 'KONIEC GRY! <br> WYGRAŁEŚ!';
      tab.innerHTML = '<tr><td>NumerRundy</td><td>RuchKomputera</td><td>RuchGracza</td><td>Wynik</td><td>Wynik po rundzie</td></tr><br>';

      var arLen = params.progres.length;
        for(var i=0; i < arLen; i++){
          tab.insertAdjacentHTML('beforeend', '<tr><td>'+params.progres[i].gra+'</td><td>'+params.progres[i].comp+'</td><td>'+params.progres[i].man+'</td><td>'+params.progres[i].res+'</td><td>'+params.progres[i].wyn+'</td></tr><br>');

        }
      }
      showModal();
    //}
  }
} 
//write();
//nasłuch przycisków gry
var guziki = document.querySelectorAll('.player-move');
for(var i = 0; i < guziki.length; i++){
		guziki[i].addEventListener('click', playerMove);
	}
// stara wersja
/*
stone.addEventListener('click', function(){
  playerMove('Kamień');
});
paper.addEventListener('click', function(){
  playerMove('Papier');
});
scirsors.addEventListener('click', function(){
  playerMove('Nożyczki');
});*/
//przycisk nowej gry
gameNew.addEventListener('click', function(){
  gamesMax = window.prompt('Do ilu wygranych rund chcesz grać?');
  //zerowanie zmiennych
  params.kompWynik = 0;
  params.czloWynik = 0;
  tab.innerHTML = '';
 // NewGame = true;
  write(0, 0); //zerowanie wyniku
  game(params.kompWynik, gamesMax);//wywołanie funkcji pokazującej przyciski
  out.innerHTML = ' '//czysczenie ekranu rozgrywki
});


//dlaczego nie działa w ten sposób??
//stone.addEventListener('click', playerMove(1)); 
//paper.addEventListener('click', playerMove(2)); 
//scirsors.addEventListener('click', playerMove(3));
//wypisanie wyboru użytkownika


var showModal = function(){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');
};

// Mimo, że obecnie mamy tylko jeden link, stosujemy kod dla wielu linków. W ten sposób nie będzie trzeba go zmieniać, kiedy zechcemy mieć więcej linków lub guzików otwierających modale

var modalLinks = document.querySelectorAll('.show-modal');

for(var i = 0; i < modalLinks.length; i++){
  modalLinks[i].addEventListener('click', showModal);
}

// Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

// Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

// Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 

var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}

/* I to wszystko - mamy już działający modal! 

ĆWICZENIE: 
Zmień funkcję showModal tak, aby w momencie wyświetlania była zmieniana treść nagłówka na dowolną inną, np. "Modal header". 
*/

})(); 


 