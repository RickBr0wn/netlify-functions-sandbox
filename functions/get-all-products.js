var co = require('co')
var mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()

let conn = null

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@basic-backend-api-nnvyx.mongodb.net/test?retryWrites=true&w=majority`

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false

  run()
    .then(res => {
      callback(null, res)
    })
    .catch(error => callback(error))
}

function run() {
  return co(function*() {
    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0
      })
      conn.model(
        'Product',
        new mongoose.Schema({
          _id: mongoose.Schema.Types.ObjectId,
          name: { type: String, required: true },
          price: { type: Number, required: true },
          productImage: { type: String, required: true }
        })
      )
    }

    const M = conn.model('Product')

    const doc = yield M.find()

    console.log({ doc })

    const response = {
      statusCode: 200,
      body: JSON.stringify(doc)
    }
    return response
  })
}
