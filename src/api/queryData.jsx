
export function queryData(cb){
  fetch('/api/getRsoData.json')
    .then(function (response) {
      response.json().then(function(data) {
        cb(data);
      })
    })
}
