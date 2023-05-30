const Author = require('./models/Author')
const Book = require('./models/Book')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
          if(args.author){
            const author = await Author.findOne({ name: args.author })
            return await Book.find({ author: author.id }).populate("author")
          }
          if(args.genre){            
             return Book.find({ genres: { $in: [args.genre] } }).populate("author")
          }
          return await Book.find({}).populate("author")
      },
      allAuthors: async (root, args) => {
        return Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      },
    },
    Author: {
      bookCount:  async (root) => {
        const author = await Book.find({ author: root.id })
        return author.length
      }
  },
   
    Mutation: {
      addBook: async (root, args, context) => {
        let author = await Author.findOne({ name: args.author })
        const currentUser = context.currentUser
        if(!currentUser){
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        if (!author) {
          author = await new Author({ name: args.author }).save()
        }                
        const book = new Book({ 
          title: args.title,
          published: args.published,
          author,
          genres: args.genres 
        })
  
        try{        
          await book.save()
        }
        catch(error){
          throw new GraphQLError('saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      editAuthor: async (root, args, context) => {
        const author = await Author.findOne({ name: args.name })
        const currentUser = context.currentUser
        if(!currentUser){
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        try{
        await author.save()
        }
        catch(error){
          throw new GraphQLError('updating year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        return author
      },

      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        return user.save()
        .catch(error => {
            throw new GraphQLError('Creating user failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.username,
                    error
                }
            })
        })
      },

      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if(!user || args.password !== 'secret'){
            throw new GraphQLError('wrong credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT'
                }
            })
        }
        const userForToken = {
            username: user.username,
            id: user._id,
        }

        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },

    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

module.exports = resolvers