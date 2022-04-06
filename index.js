import { createServer } from "@graphql-yoga/node";
import fetch from "node-fetch";

const API_URL = `https://yts.torrentbay.to/api/v2/list_movies.json`;

const getMovieData = async (limit, rating) => {
	console.log(limit, rating);
	const url = `${API_URL}?${limit ? "limit=" + limit : ""}&${
		rating ? "minimum_rating=" + rating : ""
	}`;
	console.log(url);
	const fetchDatas = await fetch(url);
	const MovieDatas = await fetchDatas.json();
	return MovieDatas.data.movies;
};

const typeDefs = `
	type Movie { 
		id : Int!
		title : String!
		rating : Float!
		summary : String!
		language : String!
		medium_cover_image : String
	}
	type Query {
		movies(limit:Int, rating:Float) : [Movie]!
	}
	`;

const server = createServer({
	schema: {
		typeDefs: typeDefs,
		resolvers: {
			Query: {
				movies: (_, { limit, rating }) => getMovieData(limit, rating),
			},
		},
	},
});

server.start();
