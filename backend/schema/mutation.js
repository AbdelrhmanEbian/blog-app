const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType } = require ('graphql')
const Post = require ('../models/post')
const Category = require ('../models/category')
const { categorySchema, postSchema, commentSchema, userSchema } = require ('./types')
const user = require('../models/user')
const Comment = require('../models/comment')
const mutaion = new GraphQLObjectType({
    name:"mutaion",
    fields:{
        createPost:{
            name:"createPost",
            type:postSchema,
            args:{
                title:{type:new GraphQLNonNull(GraphQLString)},
                desc:{type:new GraphQLNonNull(GraphQLString)},
                img:{type:new GraphQLNonNull(GraphQLString)},
                category:{type:new GraphQLNonNull(GraphQLString)},
                userEmail:{type: new  GraphQLNonNull(GraphQLString)}
            },
            resolve:async(parent,args)=>{
                const post = await Post.create(args) 
                const category = await Category.findOne({title:args.category})
                category.posts.push(post.id)
                await category.save()
                return post
            }
    },
    addComment:{
        name:"addComment",
        type:commentSchema,
        args:{
            comment:{type:new GraphQLNonNull(GraphQLString)},
            user:{type:new GraphQLNonNull(GraphQLString)},
            post:{type:new GraphQLNonNull(GraphQLID)},
        },
        resolve:async(parent,args)=>{
            const comment = await Comment.create({
                desc:args.comment,
                userEmail:args.user,
                post:args.post
            }) 
            const post = await Post.findById(args.post)
            post.commentsNumber += 1
            post.save()
            return comment
        }
    },
    addView:{
        name:"addView",
        type:postSchema,
        args:{
            postId:{type:new GraphQLNonNull(GraphQLID)},
        },
        resolve:async(parent,args)=>{
            const post = await Post.findById(args.postId) 
            post.views = post.views ? post.views + 1 : 1
            post.save()
            return post
        }
    },
    createCategory:{
        name:"createCategory",
        type:categorySchema,
        args:{
            title:{type:new GraphQLNonNull(GraphQLString)},
            desc:{type:new GraphQLNonNull(GraphQLString)},
            img:{type:new GraphQLNonNull(GraphQLString)},
        },
        resolve:async(parent,args)=>{
            return await Category.create(args) 
        }
}
    }
})
module.exports = mutaion;