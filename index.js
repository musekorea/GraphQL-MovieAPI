import { createServer } from "@graphql-yoga/node";

const server = createServer({
	schema: {
		typeDefs,
		resolvers,
	},
});

server.start();
