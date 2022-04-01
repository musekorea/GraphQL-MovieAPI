import { createServer } from "@graphql-yoga/node";
const server = createServer({});

server.start(() => {
	console.log("GraphQL Server is Running");
});
