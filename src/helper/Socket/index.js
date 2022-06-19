const socketIo = require('socket.io');
const fs = require('fs');

const initSocket = (server) => {
    const io = socketIo(server,{ 
        cors: {
          origin: 'http://localhost:3000'
        }
    });
    io.on('connection',(socket)=>{
      console.log('client connected: ',socket.id)
      
      socket.join('coin')
    
      socket.on('disconnect',(reason)=>{
        console.log(reason)
      })
    })
    
    setInterval(()=>{
        io.to('coin').emit('list', JSON.parse( fs.readFileSync('./src/data/CointList.json', 'utf8')))
    },1000)
}

module.exports = { 
    initSocket
};//end module.exports