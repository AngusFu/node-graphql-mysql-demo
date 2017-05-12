const express = require('express');
const GraphQLHTTP = require('express-graphql');
const Schema = require('./Schema');

const app = express();

app.use('/graphql', GraphQLHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(3000);
