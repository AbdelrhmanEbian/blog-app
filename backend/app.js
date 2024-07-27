const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const graphql = require('graphql')
const query = require('./schema/query')
const mutation = require('./schema/mutation')
const mongoose = require('mongoose')
const post = require('./models/post')
const user = require('./models/user')
require('dotenv').config()
const { GraphQLSchema } = graphql
const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://blog-app-puce-eta.vercel.app'); // Replace '*' with specific origins if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow cookies and authentication headers

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
const schema = new GraphQLSchema({ query , mutation})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))
const port = 4000
const start =async()=>{
    await mongoose.connect(process.env.URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    app.listen(port, () => {
        console.log('running')
    })
    
}
start()