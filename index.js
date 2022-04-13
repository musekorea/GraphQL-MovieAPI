import { createServer } from "@graphql-yoga/node";
import fetch from "node-fetch";

const API_URL = "https://yts.torrentbay.to/api/v2/list_movies.json";

const getMovieData = async (limit, rating, sort_by) => {
	const temp_sort = "peers";
	const url = `${API_URL}?${limit ? "limit=" + limit : ""}${
		rating ? "&minimum_rating=" + rating : ""
	}${sort_by ? "&sort_by=" + sort_by : ""}&order_by=desc`;
	try {
		const fetchDatas = await fetch(url);
		const movieDatas = await fetchDatas.json();
		const movieLists = movieDatas.data.movies;
		console.log(url);
		console.log(movieLists[0].year);
		return movieLists;
	} catch (error) {
		console.log(error);
	}
};

const getMovieDetail = async (id) => {
	const url = `https://yts.torrentbay.to/api/v2/movie_details.json?movie_id=${id}`;
	const fetchDetail = await fetch(url);
	const detailData = await fetchDetail.json();
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
		medium_cover_image : String!
		background_image : String!
		year : Int!


	}
	type Query {
		movies(limit:Int, rating:Float, sort_by:String) : [Movie]!
		movie(id:Int!) : Movie!
		suggestion(id:Int!):[Movie]
	}
	`;

const server = createServer({
	schema: {
		typeDefs: typeDefs,
		resolvers: {
			Query: {
				movies: (_, { limit, rating, sort_by }) =>
					getMovieData(limit, rating, sort_by),
				movie: (_, { id }) => getMovieDetail(id),
				suggestion: (_, { id }) => getMovieSuggestion(id),
			},
		},
	},
});

server.start();
