const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const user = 'bob123';
const pw = 'Billybob123!'

const app = express();
const port = 3000;

mongoose.connect(`mongodb://${user}:${pw}@ds219191.mlab.com:19191/gqltutorial`);
mongoose.connection.once('open', () => {
    console.log('connected to mlab')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`now listening for requests on port: ${port}`)
})