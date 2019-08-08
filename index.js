const express = require('express')
const cors = require('cors')

const debug = require('debug')('startup')
const app = new express()

const mongo = require('./db/mongo')

const word = require('./routes/word')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(express.static(__dirname+'/public'));

app.use('/api/word',word);

const port = process.env.PORT || 3000
const server = app.listen(port,()=>{
	debug('Listening to Port: '+ port)
})

const io = require('socket.io')(server)

io.on('connection',(socket)=>{
    socket.on('random',(sock)=>{
        io.sockets.emit('new_random',sock);
    })
})