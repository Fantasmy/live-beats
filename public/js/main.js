'use strict';

function main () {
  // -- build the map and select the default location to be displayed
  const defaultLocation = {
    lat: 41.3977381,
    lng: 2.190471916
  };
  const container = document.getElementById('map');
  const options = {
    zoom: 15,
    center: defaultLocation
  };
  const map = new google.maps.Map(container, options);

  // -- add marker
  function addMarker (map, location, barname) {
    const markerOptions = {
      position: location,
      title: barname
    };
    const marker = new google.maps.Marker(markerOptions);
    marker.setMap(map);
    return marker;
  }

  // -- show all bars on the map
  /* axios.get('/bars/json')
    .then(response => {
      response.data.forEach((bar) => {
        const location = {
          lat: bar.location.coordinates[1],
          lng: bar.location.coordinates[0]
        };
        addMarker(map, location, bar.barname);
      });
    }); */

  function getEvents () {
    const musicType = document.getElementById('selectpicker').value;
    const musicFilter = {
      musicType: musicType
    };

    axios.post('/search', musicFilter)
      .then((result) => {
        result.data.events.forEach((event) => {
          const location = {
            lat: event.bar.location.coordinates[1],
            lng: event.bar.location.coordinates[0]
          };
          addMarker(map, location, event.bar.barname);
        });
      });
  }

  const buttonElement = document.querySelector('#btn-search');
  buttonElement.addEventListener('click', getEvents);
}

window.addEventListener('load', main);

// function main () {
//   console.log('ok');

//   const body = {
//     musicType: 'pop' // take the input from the select element
//   };
//   axios.post('/search', body)
//     .then((result) => {
//       console.log(result);
//       document.body.innerHTML += result.data.searchedEvent[0].title;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// window.addEventListener('load', main);
