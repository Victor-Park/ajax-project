var ul = document.querySelector('ul');
var $li = document.querySelectorAll('li');
var menuButton = document.querySelector('.menu');
var tbody = document.querySelector('tbody');

function getYearlyData(year) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://ergast.com/api/f1/' + year + '.json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    document.querySelector('.season-header').textContent = xhr.response.MRData.RaceTable.season + ' Season';
    var raceDataArr = xhr.response.MRData.RaceTable.Races;
    var thead = document.querySelector('thead');
    thead.textContent = '';
    var trhead = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    var th4 = document.createElement('th');
    var th5 = document.createElement('th');
    th1.textContent = 'Round';
    th2.textContent = 'Grand Prix';
    th3.textContent = 'Date';
    th4.textContent = 'Time';
    th5.textContent = 'Circuit';
    trhead.appendChild(th1);
    trhead.appendChild(th2);
    trhead.appendChild(th3);
    trhead.appendChild(th4);
    trhead.appendChild(th5);
    thead.appendChild(trhead);
    for (var j = 0; j < raceDataArr.length; j++) {
      var tr = document.createElement('tr');
      tr.setAttribute('class', 'trData');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var td5 = document.createElement('td');
      var round = document.createTextNode(raceDataArr[j].round);
      var raceName = document.createTextNode(raceDataArr[j].raceName);
      var date = document.createTextNode(raceDataArr[j].date);
      var utc = raceDataArr[j].time.replace(':00Z', ' UTC');
      var time = document.createTextNode(utc);
      var circuit = document.createTextNode(raceDataArr[j].Circuit.circuitName);
      var anchorGPName = document.createElement('a');
      var anchorCircuit = document.createElement('a');
      anchorGPName.setAttribute('href', raceDataArr[j].url);
      anchorGPName.setAttribute('target', '_blank');
      anchorCircuit.setAttribute('href', raceDataArr[j].Circuit.url);
      anchorCircuit.setAttribute('target', '_blank');
      td1.appendChild(round);
      td2.appendChild(anchorGPName);
      anchorGPName.appendChild(raceName);
      td3.appendChild(date);
      td4.appendChild(time);
      td5.appendChild(anchorCircuit);
      anchorCircuit.appendChild(circuit);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tbody.appendChild(tr);
    }
  });
  xhr.send();
}

function driverStandings(year) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://ergast.com/api/f1/' + year + '/driverStandings.json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    document.querySelector('.season-header').textContent = xhr.response.MRData.StandingsTable.season + ' Season';
    var driverDataArr = xhr.response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    var thead = document.querySelector('thead');
    thead.textContent = '';
    var trhead = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    var th4 = document.createElement('th');
    var th5 = document.createElement('th');
    th1.textContent = 'Position';
    th2.textContent = 'Driver Name';
    th3.textContent = 'Driver Number';
    th4.textContent = 'Team';
    th5.textContent = 'Total Points';
    trhead.appendChild(th1);
    trhead.appendChild(th2);
    trhead.appendChild(th3);
    trhead.appendChild(th4);
    trhead.appendChild(th5);
    thead.appendChild(trhead);
    for (var j = 0; j < driverDataArr.length; j++) {
      var tr = document.createElement('tr');
      tr.setAttribute('class', 'trData');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var td5 = document.createElement('td');
      var position = document.createTextNode(driverDataArr[j].position);
      var driverName = document.createTextNode(driverDataArr[j].Driver.givenName + ' ' + driverDataArr[j].Driver.familyName);
      var driverNumber = document.createTextNode(driverDataArr[j].Driver.permanentNumber);
      var teamName = document.createTextNode(driverDataArr[j].Constructors[0].name);
      var points = document.createTextNode(driverDataArr[j].points);
      var anchorDriver = document.createElement('a');
      anchorDriver.setAttribute('href', driverDataArr[j].Driver.url);
      anchorDriver.setAttribute('target', '_blank');
      td1.appendChild(position);
      td2.appendChild(anchorDriver);
      anchorDriver.appendChild(driverName);
      td3.appendChild(driverNumber);
      td4.appendChild(teamName);
      td5.appendChild(points);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tbody.appendChild(tr);
    }
  });
  xhr.send();
}

function constructorStandings(year) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://ergast.com/api/f1/' + year + '/constructorStandings.json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    document.querySelector('.season-header').textContent = xhr.response.MRData.StandingsTable.season + ' Season';
    var constructorDataArr = xhr.response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    var thead = document.querySelector('thead');
    thead.textContent = '';
    var trhead = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    var th4 = document.createElement('th');
    th1.textContent = 'Position';
    th2.textContent = 'Constructor';
    th3.textContent = 'Total Points';
    th4.textContent = 'Wins';
    trhead.appendChild(th1);
    trhead.appendChild(th2);
    trhead.appendChild(th3);
    trhead.appendChild(th4);
    thead.appendChild(trhead);
    for (var j = 0; j < constructorDataArr.length; j++) {
      var tr = document.createElement('tr');
      tr.setAttribute('class', 'trData');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var position = document.createTextNode(constructorDataArr[j].position);
      var constructor = document.createTextNode(constructorDataArr[j].Constructor.name);
      var points = document.createTextNode(constructorDataArr[j].points);
      var wins = document.createTextNode(constructorDataArr[j].wins);
      var anchorConstructor = document.createElement('a');
      anchorConstructor.setAttribute('href', constructorDataArr[j].Constructor.url);
      anchorConstructor.setAttribute('target', '_blank');
      td1.appendChild(position);
      td2.appendChild(anchorConstructor);
      anchorConstructor.appendChild(constructor);
      td3.appendChild(points);
      td4.appendChild(wins);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tbody.appendChild(tr);
    }
  });
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function (event) {
  getYearlyData('2022');
});

ul.addEventListener('click', function (event) {
  if (event.target.matches('li.year')) {
    for (var i = 0; i < $li.length; i++) {
      $li[i].className = 'year light-gray';
    }
    event.target.className = 'year red';
    var trData = document.querySelectorAll('.trData');
    for (var j = 0; j < trData.length; j++) {
      tbody.removeChild(trData[j]);
    }
    var activeTab = document.querySelector('.active');
    if (activeTab.textContent === 'Races') {
      getYearlyData(event.target.textContent);
    } else if (activeTab.textContent === 'Driver Standings') {
      driverStandings(event.target.textContent);
    } else if (activeTab.textContent === 'Constructor Standings') {
      constructorStandings(event.target.textContent);
    }
  }
});

menuButton.addEventListener('click', function () {
  var sidenavOn = document.querySelector('.sidenav-on');
  var sidenavOff = document.querySelector('.sidenav-off');
  var sidenavHeader = document.querySelector('.menu-header');
  if (sidenavOn) {
    sidenavOn.className = 'sidenav-off';
    sidenavHeader.textContent = '';

  } else {
    sidenavOff.className = 'sidenav-on center-text';
    sidenavHeader.textContent = 'Season';
  }
});

var tabcontainer = document.querySelector('.tab-container');
var tab = document.querySelectorAll('.tab');

tabcontainer.addEventListener('click', function (event) {
  if (event.target.matches('.tab')) {
    for (var i = 0; i < tab.length; i++) {
      if (tab[i] === event.target) {
        tab[i].className = 'tab ' + 'active';
        tbody.textContent = '';
        var year = document.querySelector('li.red').textContent;
        if (tab[i].textContent === 'Driver Standings') {
          driverStandings(year);
        } else if (tab[i].textContent === 'Races') {
          getYearlyData(year);
        } else if (tab[i].textContent === 'Constructor Standings') {
          constructorStandings(year);
        }
      } else {
        tab[i].className = 'tab';
      }
    }
  }
});
