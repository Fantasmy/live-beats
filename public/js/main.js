'use strict';

function main () {
  // -- utility functions

  /* function getBarLocation () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const barPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(barPosition);
        }, () => {
          resolve();
          // console.log('Error in the geolocation service.');
        });
      } else {
        resolve();
        // console.log('Browser does not support geolocation.');
      }
    });
  } */

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

  // -- show searched bars by type music

  function main () {
    console.log('ok');

    const body = {
      musicType: 'pop' // take the input from the select element
    };
    axios.post('/search', body)
      .then((result) => {
        console.log(result);
        document.body.innerHTML += result.data.searchedEvent[0].title;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // -- show all bars on the map
  // axios.get('/bars/json')
  //   .then(response => {
  //     response.data.forEach((bar) => {
  //       const location = {
  //         lat: bar.location.coordinates[1],
  //         lng: bar.location.coordinates[0]
  //       };
  //       addMarker(map, location, bar.barname);
  //     });
  //   });

  /* getBarLocation()
    .then((location) => {
      if (location) {
        addMarker(map, location, 'Ironhack');
      }
    }); */
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
