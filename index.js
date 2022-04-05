import { createServer } from "@graphql-yoga/node";
//import movies from "./db";

let movies = [
	{
		id: 0,
		name: "Star Wars - The new one",
		score: 1,
	},
	{
		id: 1,
		name: "Avengers - The new one",
		score: 8,
	},
	{
		id: 2,
		name: "The Godfather I",
		score: 99,
	},
	{
		id: 3,
		name: "Logan",
		score: 2,
	},
];

const typeDefs = `
	type Movie {
		id : Int!
		name : String!
		score : Int!
	}
	type Query {
		movies : [Movie]!
		movie(id:Int!) : Movie!
	}	
	type Mutation {
		addMovie(name:String!, score:Int!): Movie!
		delMovie(id:Int!):Boolean!
	}
`;

const server = createServer({
	schema: {
		typeDefs: typeDefs,
		resolvers: {
			Query: {
				movies: () => movies,
				movie: (_, { id }) => {
					const filtered = movies.filter((movie) => {
						return id === movie.id;
					});
					return filtered[0];
				},
			},
			Mutation: {
				addMovie: (_, { name, score }) => {
					const id = movies.length;
					const newMovie = { id, name, score };
					movies.push(newMovie);
					return newMovie;
				},
				delMovie: (_, { id }) => {
					const deleteMovie = movies.filter((movie) => id !== movie.id);
					if (deleteMovie.length === movies.length) {
						console.log("안지웠음");
						return false;
					} else {
						console.log("지웠음");
						movies = deleteMovie;
						return true;
					}
				},
			},
		},
	},
});

server.start();
