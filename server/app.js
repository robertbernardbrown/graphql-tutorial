const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const port = 4000;

app.use('/graphql'.graphqlHTTP({
    schema
}))

app.listen(port, () => {
    console.log(`now listening for requests on port: ${port}`)
})