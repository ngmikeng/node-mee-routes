const Joi = require('joi');

module.exports = {
  getById: {
    params: {
      userId: Joi.string().required()
    }
  },
  createUser: {
    body: {
      username: Joi.string().required(),
      fullName: Joi.string().required()
    }
  },
  createUserByDb: {
    body: {
      username: Joi.string().required(),
      fullName: Joi.string().required()
    },
    query: {
      db: Joi.string().required(),
    }
  }
};