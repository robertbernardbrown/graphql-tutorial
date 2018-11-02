const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
    {name: 'book1', genre: 'fantasy', id: '1'},
    {name: 'book2', genre: 'horror', id: '2'},
    {name: 'book3', genre: 'comedy', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parents, args){
                return _.find(books, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});