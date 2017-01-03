const keystone = require('keystone');
keystone.init({

  'name': 'My Project',

  'favicon': 'static/favicon.ico',
  'static': ['static'],

  'views': 'templates/views',
  'view engine': 'nunjucks',

  'auto update': true,
  'mongo': process.env.MONGO_URI || "mongodb://mongodb:27017/dev",

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'

});

require('./models');

keystone.set('routes', require('./routes'));

keystone.start();
