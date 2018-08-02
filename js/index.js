'use strict';
(function() {
    //zmienne
    var guziki = document.querySelectorAll('.player-move');
    var kam = document.getElementById("kamien");
    var pap = document.getElementById("papier");
    var noz = document.getElementById("nozyce");
    var out = document.getElementById("score");
    var stat = document.getElementById("status");
    var tab = document.getElementById("table");
    var points = document.getElementById("result");
    var gameNew = document.getElementById("startGame");
    var gamesNum = 0;
    var gamesMax = 0;
    var params = {
        result,
        kompWynik: 0,
        czloWynik: 0,
        runda: 0,
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
    for (var i = 0; i < guziki.length; i++) {
        guziki[i].style.visibility = 'hidden';
    }

    //funkcja porownujaca ruch gracza i komputera
    //
    var playerMove = function(move) {
        var move = event.target.getAttribute("data-move");
        var cpmove = compMove();
        if ((move == 'rock' && cpmove == 'rock') 
        || (move == 'paper' && cpmove == 'paper') 
        || (move == 'scissors' && cpmove == 'scissors')) 
        {
            //remis 
            params.result = 'REMIS';
        } else if ((move == 'rock' && cpmove == 'scissors') 
        || (move == 'paper' && cpmove == 'rock') 
        || (move == 'scissors' && cpmove == 'paper')) 
        {
            //wygrana gracza
            params.result = 'WYGRANA';
            params.czloWynik++; //zmienna do zliczania wygranych gier
        } else if ((move == 'rock' && cpmove == 'paper') 
        || (move == 'paper' && cpmove == 'scissors') 
        || (move == 'scissors' && cpmove == 'rock')) 
        {
            //wygrana komputera
            params.result = 'PORAŻKA';
            params.kompWynik++;
        }
        params.progres.push({
            "gra": params.runda,
            "comp": cpmove,
            "man": move,
            "res": params.result,
            "wyn": params.kompWynik + '-' + params.czloWynik
        });
        write(move, cpmove, params.result);
        game(Math.max(params.kompWynik, params.czloWynik), gamesMax);
        params.runda++;
    }
    //funkcja losująca ruch komputera i przypisująca ruch do wylosowanej liczby
    var compMove = function() {
        var move = Math.random();
        move = move * 10 % 3 + 1;
        move = Math.round(move);
        switch (move) {
            case 1:
                return 'rock';

            case 2:
                return 'paper';

            default:
                return 'scissors';
        }
    }
    //funkcja wypisująca 
    var write = function(czlowiek, komputer, wynik) {
        out.insertAdjacentHTML('afterbegin', wynik + ' wybrałeś ' + czlowiek + ' komputer wybrał ' + komputer + '<br>');
        //wypisuje wyniki cp vs czlowiek i do ilu gramy
        points.innerHTML = +params.kompWynik + ' -- ' + params.czloWynik + '<br>Grasz do ' + gamesMax + ' zwycięstw<br>';
          }
    //funkcja która ukrywa i pokazuje przyciski gry
    //czy można jakoś prościej zapisać?
    var game = function(gamesNum, gamesMax) {
        if (gamesNum < gamesMax) {
            for (var i = 0; i < guziki.length; i++) {
                guziki[i].style.visibility = 'visible';
            }
        } else {
            for (var i = 0; i < guziki.length; i++) {
                guziki[i].style.visibility = 'hidden';
            }
            if (params.kompWynik > params.czloWynik) {
                stat.innerHTML = 'KONIEC GRY! <br> PRZEGRAŁEŚ!';
                tab.innerHTML = '<tr><td>NumerRundy</td><td>RuchKomputera</td><td>RuchGracza</td><td>Wynik</td><td>Wynik po rundzie</td></tr><br>';
                var arLen = params.progres.length;
                for (var i = 0; i < arLen; i++) {
                    tab.insertAdjacentHTML('beforeend', '<tr><td>' + params.progres[i].gra + '</td><td>' + params.progres[i].comp + '</td><td>' + params.progres[i].man + '</td><td>' + params.progres[i].res + '</td><td>' + params.progres[i].wyn + '</td></tr><br>');
                }
            } else {
                stat.innerHTML = 'KONIEC GRY! <br> WYGRAŁEŚ!';
                tab.innerHTML = '<tr><td>NumerRundy</td><td>RuchKomputera</td><td>RuchGracza</td><td>Wynik</td><td>Wynik po rundzie</td></tr><br>';

                var arLen = params.progres.length;
                for (var i = 0; i < arLen; i++) {
                    tab.insertAdjacentHTML('beforeend', '<tr><td>' + params.progres[i].gra + '</td><td>' + params.progres[i].comp + '</td><td>' + params.progres[i].man + '</td><td>' + params.progres[i].res + '</td><td>' + params.progres[i].wyn + '</td></tr><br>');

                }
            }
            showModal();
            //}
        }
    }

    //nasłuch przycisków gry

    for (var i = 0; i < guziki.length; i++) {
        guziki[i].addEventListener('click', playerMove);
    }

    gameNew.addEventListener('click', function() {
        gamesMax = window.prompt('Do ilu wygranych rund chcesz grać?');
        //zerowanie zmiennych
        params.kompWynik = 0;
        params.czloWynik = 0;
        tab.innerHTML = ' ';
        params.progres = [];
        params.runda = 0;
        write(0, 0); //zerowanie wyniku
        game(params.kompWynik, gamesMax); //wywołanie funkcji pokazującej przyciski
        out.innerHTML = ' '; //czysczenie ekranu rozgrywki
    });

    var showModal = function() {
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.add('show');
    };


    var modalLinks = document.querySelectorAll('.show-modal');

    for (var i = 0; i < modalLinks.length; i++) {
        modalLinks[i].addEventListener('click', showModal);
    }


    var hideModal = function(event) {
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
    };

    var closeButtons = document.querySelectorAll('.modal .close');

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }


    document.querySelector('#modal-overlay').addEventListener('click', hideModal);


    var modals = document.querySelectorAll('.modal');

    for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }


})();