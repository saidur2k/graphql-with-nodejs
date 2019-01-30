const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

const {movieType, directorType} = require('./types.js');
let {movies, directors} = require('./data.js');

//Define the Query
//queryType is created as a GraphQLObjectType and given the name Query.
const queryType = new GraphQLObjectType({
    name: 'Query',
    //fields are where we specify the various endpoints.
    fields: {
        hello: {
            // hello has a type of GraphQLString which means this endpoint 
            // has a return type of String. 
            // The type is GraphQLString instead of String since this a 
            // GraphQL schema. So directly using String will not work.
            type: GraphQLString,

            // resolve function indicates the action to be done when 
            // the endpoint is called. Here the action is to return 
            // a String “Hello World”.

            // http://localhost:5000/graphql
            //query {
            //    hello
            //  }

            // returns 
            // {
            //    "data": {
            //        "hello": "Hello World"
            //    }
            //    }

            resolve: function () {
                return "Hello World";
            }
        },

        movie: {
            type: movieType,

            //args parameter is used to indicate the input to 
            // the movie endpoint. The input to this endpoint is 
            //id which is of type GraphQLInt.
            args: {
                id: { type: GraphQLInt }
            },

            //resolve function returns the movie corresponding to the id,
            // from the movies list. find is a function from lodash
            //library used to find an element in a list.
            resolve: function (source, args) {
                console.log('movies', movies);
                console.log('args', args)
                const data = movies.filter(movie => movie.id === args.id)
                return data[0]
            }
        },

        director: {
            type: directorType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: function (source, args) {
                const data = directors.filter(director => director.id === args.id)
                return data[0]
            }
        }
    }
});

module.exports = {
    queryType
}