const graphql = require('graphql')
const User = require('../models/user')
const { GraphQLSchema, GraphQLObjectType, GraphQLEnumType,GraphQLString,GraphQLNonNull, GraphQLID , GraphQLList, GraphQLInt } = graphql

 const postSchema = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        title: { type: GraphQLString },
        desc:{type:GraphQLString},
        img:{type:GraphQLString},
        views:{type:GraphQLInt},
        category:{type:GraphQLString},
        userEmail:{
            type:userSchema,
            resolve:async(parent,args)=>{
                return await User.findById(parent.userId)
            }
        },
        comments:{
            type:new GraphQLList(commentSchema)
        }
    }
    
)
})

 const commentSchema = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        desc:{type:GraphQLString},
        category:{type:GraphQLString},
        post:{type:postSchema},
        userEmail:{
            type:userSchema,
            resolve:async(parent,args)=>{
                return await User.findById(parent.userEmail)
            }
        },
    }
    
)
})
 const categorySchema = new GraphQLObjectType({
    name: 'Categories',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        desc:{type:GraphQLString},
        img:{type:GraphQLString},
        posts:{type:new GraphQLList(postSchema)},
    } 
)
})


 const userSchema = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        image:{type:GraphQLString},
        posts:{
            type:new GraphQLList(postSchema)
        },
        comments:{
            type:new GraphQLList(commentSchema)
        }
    })
    })
module.exports = {
    userSchema,
    categorySchema,
    postSchema,
    commentSchema
}