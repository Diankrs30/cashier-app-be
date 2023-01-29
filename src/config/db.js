require('dotenv').config(); // this is important!
require('pg')
module.exports = {
"development": {
    "username": process.env.UNAME,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "port": process.env.PORTDB,
    "dialect": "postgres",
    "ssl": true,
    "dialectOptions": {
        ssl: {
            require: true,
            rejectUnauthorized: false 
          },
            host: process.env.HOST,
            user: process.env.UNAME,
            password: process.env.PASS,
            database: process.env.DB,
            connectTimeout: 20000
      },
},
"test": {
    "username": process.env.UNAME,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "port": process.env.PORTDB,
    "dialect": "postgres",
    "ssl": true,
    "dialectOptions": {
        ssl: {
            require: true,
            rejectUnauthorized: false 
          },
            host: process.env.HOST,
            user: process.env.UNAME,
            password: process.env.PASS,
            database: process.env.DB,
            connectTimeout: 20000
      },
},
"production": {
    "username": process.env.UNAME,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "port": process.env.PORTDB,
    "dialect": "postgres",
    "ssl": true,
    "dialectOptions": {
        ssl: {
            require: true,
            rejectUnauthorized: false 
          },
            host: process.env.HOST,
            user: process.env.UNAME,
            password: process.env.PASS,
            database: process.env.DB,
            connectTimeout: 20000
      },
},
};