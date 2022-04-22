var ul = document.querySelector('ul');
var $li = document.querySelectorAll('li');
var menuButton = document.querySelector('.menu');

function getYearlyData(year) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://ergast.com/api/f1/' + year + '.json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    document.querySelector('.season-header').textContent = xhr.response.MRData.RaceTable.season + ' Season';
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
