import { createServer } from "@graphql-yoga/node";

const familyData = [
	{ id: 1, name: null, age: 4 },
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
		member(id:Int!) : Family!

	}	
`;

const server = createServer({
	schema: {
		typeDefs: typeDefs,
		resolvers: {
			Query: {
				family: () => familyData,
				member: (_, { id }) => {
					console.log(id);
					const filtered = familyData.filter((member) => {
						return id === member.id;
					});
					return filtered[0];
				},
			},
		},
	},
});

server.start();
