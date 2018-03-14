let mysql = {
  database: 'oneclass',
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
}

switch (process.env.NODE_ENV) {
  case 'production':
    mysql = { ...mysql }
    break
  case 'test':
    mysql = { ...mysql }
    break
  default:
    mysql = {
      ...mysql,
      database: 'oneclass',
      user: 'root',
      password: 'root',
      host: 'localhost',
      port: 3306,
    }
}

console.log('process.env.NODE_ENV:::::::', process.env.NODE_ENV || 'default')

module.exports = mysql
