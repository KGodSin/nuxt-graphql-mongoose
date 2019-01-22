import bodyParser from "body-parser";
import session from "express-session";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./graphql/resolvers";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";

const typeDefs = importSchema('./graphql/schema.graphql');
const schema = makeExecutableSchema({typeDefs,resolvers});
const graphql = { 
  path:"/graphql",
  handler: graphqlHTTP({
    schema: schema,
    graphiql: true
  })
};

mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser:true});

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    "bootstrap-vue/nuxt"
  ],
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
 serverMiddleware: [
  // body-parser middleware
  bodyParser.json(),
  // session middleware
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  graphql,
  // Api middleware
  // We add /api/login & /api/logout routes
  '~/api'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
}

