'use strict';
//zmienne
var twojWybor;
var stone = document.getElementById("kamien");
var paper = document.getElementById("papier");
var scirsors = document.getElementById("nozyce");
var out = document.getElementById("score");
var stat = document.getElementById("status");
var kompWynik = 0;
var czloWynik = 0;
var points = document.getElementById("result");
var gameNew = document.getElementById("startGame");
var gamesNum = 0;
var gamesMax = 0;
//var NewGame = false;//do ukrywania przycisków
//kamien=1 remis 1 wygrana 3 porazka 2
//paiper=2 remis 2 wygrana 1 porazka 3
//nozyce=3 remis 3 wygrana 2 porazka 1
 
//ukrycie przycisków po załadowaniu strony reczne
//game(); 
//nie działa przez funkcje
      stone.style.visibility = 'hidden';
      paper.style.visibility = 'hidden';
      scirsors.style.visibility = 'hidden';
//funkcja porownujaca ruch gracza i komputera
//
var playerMove = function (move){
  var cpmove = compMove();
  if((move=='Kamień' && cpmove=='Kamień')||(move=='Papier' && cpmove=='Papier')||(move=='Nożyczki' && cpmove=='Nożyczki')){
 //remis 
    write(move, cpmove, 'REMIS!');
    //NewGame = false;
    //game(gamesNum, gamesMax);
  }
  else if((move=='Kamień' && cpmove=='Nożyczki')||(move=='Papier' && cpmove=='Kamień')||(move=='Nożyczki' && cpmove=='Papier')){
    //wygrana gracza
    czloWynik++;//zmienna do zliczania wygranych gier
    write(move, cpmove, 'WYGRANA!');
   // NewGame = false;
    game(czloWynik, gamesMax);
  }
   else if((move=='Kamień' && cpmove=='Papier')||(move=='Papier' && cpmove=='Nożyczki')||(move=='Nożyczki' && cpmove=='Kamień')){
     //wygrana komputera
    kompWynik++;
    write(move, cpmove, 'PORAŻKA!');
  //  NewGame = false;
    game(kompWynik, gamesMax);
  }
}
//funkcja losująca ruch komputera i przypisująca ruch do wylosowanej liczby
var compMove = function(){
  var move = Math.random();
  move = move * 2 +1;//sprawdzic czy szansa wylosowania każdej liczby jest jednakowa
  move = Math.round(move);
  if(move==1){
    return 'Kamień';
  }
   if(move==2){
    return 'Papier';
  }
   if(move==3){
    return 'Nożyczki';
  }
}
//funkcja wypisująca 
var write = function(czlowiek, komputer, wynik){
  out.insertAdjacentHTML('afterbegin', wynik+ ' wybrałeś '+czlowiek+' komputer wybrał '+komputer+'<br>');
  //wypisuje wyniki cp vs czlowiek i do ilu gramy
  points.innerHTML = +kompWynik+' -- '+czloWynik+'<br>Grasz do '+gamesMax+' zwycięstw<br>';
}
//funkcja która ukrywa i pokazuje przyciski gry
//czy można jakoś prościej zapisać?
var game = function(gamesNum, gamesMax){
  if(gamesNum<gamesMax) {
    stone.style.visibility = 'visible';
    paper.style.visibility = 'visible';
    scirsors.style.visibility = 'visible';
  }
  else {
    //chciałem ukrywać przyciski wywołaniem tej funkcji ale nie działa
    //if(!NewGame){
      stone.style.visibility = 'hidden';
      paper.style.visibility = 'hidden';
      scirsors.style.visibility = 'hidden';
      if(kompWynik>czloWynik){
      stat.innerHTML = 'KONIEC GRY! <br> PRZEGRAŁEŚ!'
      }
      else {
      stat.innerHTML = 'KONIEC GRY! <br> WYGRAŁEŚ!'
      }
    //}
  }
} 
//write();
//nasłuch przycisków gry
stone.addEventListener('click', function(){
  playerMove('Kamień');
});
paper.addEventListener('click', function(){
  playerMove('Papier');
});
scirsors.addEventListener('click', function(){
  playerMove('Nożyczki');
});
//przycisk nowej gry
gameNew.addEventListener('click', function(){
  gamesMax = window.prompt('Do ilu wygranych rund chcesz grać?');
  //zerowanie zmiennych
  kompWynik = 0;
  czloWynik = 0;
 // NewGame = true;
  write(0, 0); //zerowanie wyniku
  game(kompWynik, gamesMax);//wywołanie funkcji pokazującej przyciski
  out.innerHTML = ' '//czysczenie ekranu rozgrywki
});


//dlaczego nie działa w ten sposób??
//stone.addEventListener('click', playerMove(1)); 
//paper.addEventListener('click', playerMove(2)); 
//scirsors.addEventListener('click', playerMove(3));
//wypisanie wyboru użytkownika