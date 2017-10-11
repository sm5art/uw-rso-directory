
export function queryData(query, cb){
  fetch('/api/getRsoData.json', { qs: query })
    .then(function (response) {
      response.json().then(function(data) {
        cb(data);
      })
    })
}

export function queryTypes(cb) {
  fetch('/api/getRsoTypes.json')
    .then((response) => {
      response.json().then((data) => {
        cb(data);
      })
    })
}
