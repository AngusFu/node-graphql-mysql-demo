const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User Object',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id
        },
      },
      name: {
        type: GraphQLString,
        resolve(user) {
          return user.name
        },
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email
        },
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(user) {
          return user.getPosts()
        },
      },
    }
  },
})

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a post',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(post) {
          return post.id
        },
      },
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title
        },
      },
      content: {
        type: GraphQLString,
        resolve(post) {
          return post.content
        },
      },
      user: {
        type: User,
        resolve(post) {
          return post.getUser()
        },
      },
    }
  },
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields() {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt,
          },
          email: {
            type: GraphQLString,
          },
        },
        resolve(root, args, ctx) {
          const { db } = ctx
          return db.models.User.findAll({
            where: args,
          })
        },
      },
      posts: {
        type: new GraphQLList(Post),
        args: {
          page: { type: GraphQLInt },
          pageSize: { type: GraphQLInt },
        },
        resolve(root, args, ctx) {
          const { db } = ctx
          const { page, pageSize } = args
          const offset = page && pageSize && (page - 1) * pageSize
          const limit = page && pageSize && pageSize
          return db.models.Post.findAll({ offset, limit })
        },
      },
    }
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields() {
    return {
      addUser: {
        type: User,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(_, args, ctx) {
          const { db } = ctx
          return db.models.user.create(args)
        },
      },
      addPost: {
        type: Post,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString),
          },
          content: {
            type: new GraphQLNonNull(GraphQLString),
          },
          userId: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(_, args, ctx) {
          const { db } = ctx
          return db.models.post.create(args)
        },
      },
    }
  },
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
