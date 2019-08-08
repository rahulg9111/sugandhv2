const mongoose = require('mongoose');

const dbHost = require('config').get('db')
const debug = require('debug')('mongo')

mongoose.connect(dbHost,{ useNewUrlParser: true })
.then(()=> debug('Connected to MongoDB'))
.catch(()=> debug('Some Unknown Error'));

module.exports = mongoose;