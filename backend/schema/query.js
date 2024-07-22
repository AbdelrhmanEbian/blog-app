const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLEnumType, GraphQLInt } = require("graphql");
const Post = require("../models/post");
const Category = require("../models/category");
const category = require("../models/category");
const { postSchema, categorySchema, commentSchema } = require("./types");
const Comment = require("../models/comment");
const user = require("../models/user");

const getAllPostsType = new GraphQLObjectType({
    name: 'getAllPostsType',
    fields: {
        posts: { type: new GraphQLList(postSchema) }, 
        currentPage: { type: GraphQLInt }, 
        numberOfPages: { type: GraphQLInt }
    }
})
const query = new GraphQLObjectType({
    name: "Query",
    fields: {
        getAllPosts: {
            name: "getPosts",
            type: getAllPostsType ,
            args: { category: { type: GraphQLString }, popular: { type: GraphQLBoolean }, page: { type: GraphQLInt }, userEmail : {type:GraphQLString} },
            resolve: async (parent, args) => {
                let query = {};
                if (args.category) {
                    query.category = args.category;
                } else if (args.userEmail) {
                    query.userEmail = args.userEmail;
                }
                const postsCount = await Post.countDocuments(query);
                const postsPerPage = 3;
                const totalPages = Math.ceil(postsCount / postsPerPage);
                const currentPage = args.page || 1;
                let posts;
                if (args.popular) {
                    posts = await Post.find(query).sort('-commentsNumber').limit(3);
                } else {
                    posts = await Post.find(query)
                        .sort('-createdAt')
                        .skip((currentPage - 1) * postsPerPage)
                        .limit(postsPerPage);
                }
                return {
                    posts,
                    currentPage,
                    numberOfPages: totalPages,
                };
            },
        },

        getAllCategories: {
            name: "getCategories",
            type: new GraphQLList(categorySchema),
            resolve: async (parent, args) => {
                return await category.find()
            }
        },
        getAllComments: {
            name: "getAllComments",
            type: new GraphQLList(commentSchema),
            args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args) => {
                const comments = await Comment.find({ post: args.postId })
                console.log(comments)
                return comments
            }
        },
        getCategory: {
            name: "getCategory",
            type: new GraphQLList(postSchema),
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (parent, args) => {
                const category = await category.findById(args.id)
                const posts = await Post.find({ category: category.name })
                category.posts = posts
                return category
            }
        },
        getPost: {
            name: "getPost",
            type: postSchema,
            args: { id: { type: GraphQLID } , popular : {type: GraphQLBoolean}},
            resolve: async (parent, args) => {
                let post;
                if (args.popular) {
                    post = await Post.find().sort('-views').limit(1)
                    console.log(post)
                    return post[0]
                }
                post = await Post.findById(args.id)
                return post
            }
        },
    }
})
module.exports = query;