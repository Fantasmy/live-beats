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

window.addEventListener('load', main);
