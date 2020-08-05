const { ApolloServer, gql } = require("apollo-server-lambda");
const jokes = require("../jokes.json");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    jokes: [String!]!
    feelingLucky: String!
    search(term: String!): [String!]!
  }

  type Mutation {
    addJoke(joke: String!): [String!]!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    jokes: () => jokes,
    feelingLucky: () => jokes[Math.floor(Math.random() * jokes.length)],
    search: (_, { term }) =>
      jokes.filter((joke) => joke.toLowerCase().includes(term.toLowerCase())),
  },
  Mutation: {
    addJoke: (_, { joke }) => {
      jokes.push(joke);
      return jokes;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
