const graphql = require('graphql');
const _ = require('lodash');
// const Book = require('../models/book');
// const Author = require('../models/author');

const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt
} = graphql;

//dummy data
var books = [
    {name: 'book1', genre: 'fantasy', id: '1', authorId: '1'},
    {name: 'book2', genre: 'horror', id: '2', authorId: '2'},
    {name: 'book3', genre: 'comedy', id: '3', authorId: '3'}
];

var authors = [
    {name: 'Patrick', age: 44, id:'1'},
    {name: 'Terry', age: 39, id: '2'},
    {name: 'Carrie', age: 22, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args){
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args){
                return _.find(authors, { id: args.id })
            }
        }
    }
});

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: GraphQLString },
//                 age: { type: GraphQLInt }
//             },
//             resolve(parent, args){
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 });
//                 author.save();
//             }
//         }
//     }
// })

module.exports = new GraphQLSchema({
    query: RootQuery
});