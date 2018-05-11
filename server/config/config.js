require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'database_test',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'postgres://pkygpiytzhylqc:ea73f35f464e42d400aefe6be4bc45d4a2f5579fc682a5f34be91d6325be9a93@ec2-107-20-249-68.compute-1.amazonaws.com:5432/d7d5gff5hjp7qe',
    dialect: 'postgres'
  }
};

