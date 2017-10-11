const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true, promiseLibrary: global.Promise});

const Schema = mongoose.Schema

var rsoInformation = new Schema({
  "name": String,
  "description": String,
  "logo": String,
  "type": String,
  "id": String,
  "contact": String,
  "leaders": [{ "role": String, "name": String }]
})

rsoModel = mongoose.model('rsoInformation', rsoInformation, 'rsoInformation');

module.exports = {
  queryRsoInformation (query, cb) {
    rsoModel.find(query).sort('name').exec((err, rsoInfo) => {
      cb(rsoInfo);
    })
  },

  queryRsoTypes (cb) {
    rsoModel.distinct('type').exec((err, rsoTypes) => {
      cb(rsoTypes)
    })
  }
}
