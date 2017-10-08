
export function queryData(q){
  fetch('/api/getRsoData.json')
    .then(function (response) {
      response.json().then(function(data) {
        console.log(data);
      })
    })
}
