var StaticServer = require('static-server');

var server = new StaticServer({
  //set path
  rootPath: './public/',
  //what port
  port: 3000
});

server.start(function (){
  console.log('server started on port' + server.port);
});
