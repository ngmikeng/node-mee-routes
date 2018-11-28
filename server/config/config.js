const Joi = require('joi');

// load vars from file .env to process.env
require('dotenv').config();

// env config schema
const envConfigSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: Joi.number()
    .default(5000),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  IS_USE_MONGO: Joi.string().allow(''),
  IS_USE_MYSQL: Joi.string().allow(''),
  MONGODB_URI: Joi.string().default('mongodb://localhost:27017/')
}).unknown().required();

const { error, value: envConfig } = Joi.validate(process.env, envConfigSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envConfig.NODE_ENV,
  port: envConfig.PORT,
  jwtSecret: envConfig.JWT_SECRET,
  isUseMongo: !!envConfig.IS_USE_MONGO,
  isUseMySQL: !!envConfig.IS_USE_MYSQL,
  mongodbUrl: envConfig.MONGODB_URI
};

module.exports = config;
