const path = require('path');

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          include: path.resolve('node_modules', 'bootstrap-vue'),
          sideEffects: false
        }
      ]
    }
  }
};