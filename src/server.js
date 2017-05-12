const express = require('express');
const GraphQLHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('graphql-server-express');
const Schema = require('./Schema');

const app = express();

app.use('/graphql', GraphQLHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.use('/api', bodyParser.json(), graphqlExpress({ schema: Schema }));

app.listen(3000);
