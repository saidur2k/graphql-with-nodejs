const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');
let {movies, directors} = require('./data.js');

// Define Movie Type
const movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        year: { type: GraphQLInt },
        directorId: { type: GraphQLID }

    }
});

//Define Director Type
const directorType = new GraphQLObjectType({
    name: 'Director',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },

        //When the director endpoint is called we have to 
        //return the director details, as well as all the movies
        //the director has directed.
        movies: {
            type: new GraphQLList(movieType),
            //For this, we have a resolve function inside the movies field.
            //The inputs to this resolve function are source and args.
            resolve(source, args) {
                const data = movies.filter(movie => movie.directorId === source.id)
                return data
            }

        }

    }
});

exports.movieType = movieType;
exports.directorType = directorType;