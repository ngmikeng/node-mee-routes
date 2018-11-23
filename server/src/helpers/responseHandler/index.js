
module.exports = {
  responseSuccess: responseSuccess,
  responseError: responseError
};

function responseSuccess(data = [], opts = {}) { // eslint-disable-line no-unused-vars
  return {
    data: data,
    success: 1
  };
}

function responseError(error = {}, opts = {}) { // eslint-disable-line no-unused-vars
  return {
    status: error.status,
    message: error.message,
    success: 0,
    stack: process.env.NODE_ENV === 'development' ? error.stack : {}
  };
}
