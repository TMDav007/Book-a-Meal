
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

/* eslint-disable import/no-dynamic-require */
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
sequelize = new Sequelize('postgres://pkygpiytzhylqc:ea73f35f464e42d400aefe6be4bc45d4a2f5579fc682a5f34be91d6325be9a93@ec2-107-20-249-68.compute-1.amazonaws.com:5432/d7d5gff5hjp7qe', {
  dialect: 'postgres',
  ssl: true
});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
