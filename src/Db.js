// https://www.youtube.com/watch?v=DNPVqK_woRQ
const Sequelize = require('sequelize');
const Faker = require('faker');

const Conn = new Sequelize('yywl', 'root', 'yyzl', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({ force: true }).then(() => {
  Array(10).fill(0).forEach(() => {
    Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then((person) => {
      return person.createPost({
        title: `Post BY ${person.firstName}`,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit laboriosam iure harum impedit minima tempora facilis dignissimos consequatur, iste possimus molestiae, sequi explicabo labore. Praesentium sapiente asperiores omnis est provident.'
      });
    });
  });
});

module.exports = Conn;
