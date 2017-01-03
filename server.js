const keystone = require('keystone');
const cons = require('consolidate');
const nunjucks = require('nunjucks');

keystone.init({

  'name': 'My Project',


  'static': 'static/bin',

  'views': ['templates/views', 'templates'],
  'view engine': 'html',
  'custom engine': cons.nunjucks,

  'auto update': true,
  'mongo': process.env.MONGO_URI || "mongodb://mongodb:27017/dev",

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'

});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();
