var ul = document.querySelector('ul');
var $li = document.querySelectorAll('li');
var menuButton = document.querySelector('.menu');

function getYearlyData(year) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://ergast.com/api/f1/' + year + '.json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    document.querySelector('.season-header').textContent = xhr.response.MRData.RaceTable.season + ' Season';
    var raceDataArr = xhr.response.MRData.RaceTable.Races;
    for (var i = 0; i < raceDataArr.length; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < raceDataArr.length; j++) {
        var tbody = document.querySelector('tbody');
        var td = document.createElement('td');
        var round = document.createTextNode(raceDataArr[i].round);
        var raceName = document.createTextNode(raceDataArr[i].raceName);
        var date = document.createTextNode(raceDataArr[i].date);
        var time = document.createTextNode(raceDataArr[i].time);
        var circuit = document.createTextNode(raceDataArr[i].circuitName);
        td.appendChild(round);
        td.appendChild(raceName);
        td.appendChild(date);
        td.appendChild(time);
        td.appendChild(circuit);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  });
  xhr.send();
}

ul.addEventListener('click', function (event) {
  if (event.target.matches('li.year')) {
    for (var i = 0; i < $li.length; i++) {
      $li[i].className = 'year light-gray';
    }
    event.target.className = 'year red';
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
