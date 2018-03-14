const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const voyager = require('graphql-voyager/middleware').express

const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const dbConnect = require('./models/db')

async function start() {
  const app = express()

  const db = await dbConnect()

  app.use(bodyParser.json(), (req, res, next) => {
    req.db = res.db = db
    next()
  })

  const endpointURL = '/api/gql'

  // GUI
  app.use(endpointURL + '/ide', graphiqlExpress({ endpointURL }))
  app.use(endpointURL + '/gui', voyager({ endpointUrl: endpointURL }))

  // API
  app.use(endpointURL, graphqlHTTP({ schema, graphiql: false }))

  app.listen(5000, () => {
    console.log(`http://localhost:${5000}${endpointURL}/ide`)
    console.log(`http://localhost:${5000}${endpointURL}/gui`)
  })
}

start()
