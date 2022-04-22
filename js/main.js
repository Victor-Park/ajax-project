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
      var time = document.createTextNode(raceDataArr[j].time);
      var circuit = document.createTextNode(raceDataArr[j].Circuit.circuitName);
      td1.appendChild(round);
      td2.appendChild(raceName);
      td3.appendChild(date);
      td4.appendChild(time);
      td5.appendChild(circuit);
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
    getYearlyData(event.target.textContent);
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
