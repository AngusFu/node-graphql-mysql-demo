const Sequelize = require('sequelize')
const Faker = require('faker')
const mysql = require('../config/mysql')

async function dbConnect() {
  const db = new Sequelize(mysql.database, mysql.user, mysql.password, {
    dialect: 'mysql',
    host: mysql.host,
    port: mysql.port,
  })

  const Post = db.define('Post', require('./Post'))
  const User = db.define('User', require('./User'))

  User.hasMany(Post)
  Post.belongsTo(User)

  await db.sync({ force: true }).then(() => {
    Array(10)
      .fill(0)
      .forEach(() => {
        User.create({
          name: Faker.name.lastName(),
          email: Faker.internet.email(),
        }).then(user => {
          return user.createPost({
            title: `Post BY ${user.name}`,
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit laboriosam iure harum impedit minima tempora facilis dignissimos consequatur, iste possimus molestiae, sequi explicabo labore. Praesentium sapiente asperiores omnis est provident.',
          })
        })
      })
  })

  return db
}

module.exports = dbConnect
