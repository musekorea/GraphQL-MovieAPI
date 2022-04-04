import { createServer } from "@graphql-yoga/node";

const familyData = [
	{ id: 1, name: "moya", age: 4 },
	{ id: 2, name: "baozi", age: 5 },
	{ id: 3, name: "nicai", age: 8 },
];

const typeDefs = `
	type Family {
		id : Int!
		name : String!
		age : Int!
	}
	type Query {
		family : [Family]
		member(id:Int) : Family

	}	
`;

const server = createServer({
	schema: {
		typeDefs: typeDefs,
		resolvers: {
			Query: {
				family: () => familyData,
				member: (_, args) => {
					const filtered = familyData.filter((member) => {
						return args.id === member.id;
					});
					return filtered[0];
				},
			},
		},
	},
});

server.start();
