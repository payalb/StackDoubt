const express = require("express");
const { ApolloServer, gql,AuthenticationError } = require('apollo-server-express');
const EasygraphqlFormatError = require('easygraphql-format-error')
const db = require('./models');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const fs = require('fs')
const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const bodyParser = require('body-parser');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const { merge } = require("lodash");
var cors = require('cors');
//User Resolvers
const userTypeDefs = require('./schema/userschema')
const userResolvers = require('./resolvers/userresolver')

const typeDefs = merge([userTypeDefs]);
const resolvers=merge([userResolvers]);


async function startApolloServer(typeDefs, resolvers) {
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
app.use(cors(),express.json({ limit: '50mb' }));
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers});
       await server.start();
    server.applyMiddleware({ app, path: '/', playgroundPath: '/plantd-playground'});
    httpServer.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    
);
    }
    startApolloServer(typeDefs, resolvers);
