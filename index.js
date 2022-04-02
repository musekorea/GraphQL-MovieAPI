import { createServer } from "@graphql-yoga/node";

const server = createServer({
	schema: {
		typeDefs: `type Query {
      name: String
    }
    `,
		resolvers: {
			Query: {
				name: () => "Moya",
			},
		},
	},
});

server.start();
