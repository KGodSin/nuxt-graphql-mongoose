import express from "express";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../graphql/resolvers";
import graphqlHTTP from "express-graphql";

const typeDefs = importSchema('./graphql/schema.graphql');

const schema = makeExecutableSchema({typeDefs,resolvers});

const router = express.Router();

router.use("/graphql",graphqlHTTP({
    schema: schema,
    graphiql: true
}));

export default router;

