import { createServer } from "@graphql-yoga/node";
import fetch from "node-fetch";

const API_URL = `https://yts.torrentbay.to/api/v2/list_movies.json`;

const getMovieData = async (limit, rating) => {
	const url = `${API_URL}?${limit ? "limit=" + limit : ""}&${
		rating ? "minimum_rating=" + rating : ""
	}`;
	const fetchDatas = await fetch(url);
	const MovieDatas = await fetchDatas.json();
	return MovieDatas.data.movies;
};

const getMovieDetail = async (id) => {
	const url = `https://yts.torrentbay.to/api/v2/movie_details.json?movie_id=${id}`;
	const fetchDetail = await fetch(url);
	const detailData = await fetchDetail.json();
	console.log(detailData);
	return detailData.data.movie;
};

const getMovieSuggestion = async (id) => {
	const url = `https://yts.torrentbay.to/api/v2/movie_suggestions.json?movie_id=${id}`;
	const fetchSuggestion = await fetch(url);
	const suggestionData = await fetchSuggestion.json();
	return suggestionData.data.movies;
};

const typeDefs = `
	type Movie { 
		id : Int!
		title : String!
		rating : Float!
		description_full : String!
		language : String!
		medium_cover_image : String
	}
	type Query {
		movies(limit:Int, rating:Float) : [Movie]!
		movie(id:Int!) : Movie!
		suggestion(id:Int!):[Movie]
	}
	`;

const server = createServer({
	schema: {
		typeDefs: typeDefs,
		resolvers: {
			Query: {
				movies: (_, { limit, rating }) => getMovieData(limit, rating),
				movie: (_, { id }) => getMovieDetail(id),
				suggestion: (_, { id }) => getMovieSuggestion(id),
			},
		},
	},
});

server.start();
