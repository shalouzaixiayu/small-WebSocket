const webSocket = require('ws');

const server = new webSocket.Server({
  port: 3001
})


server.on("open" , (e) => {
  console.log("opening the socked");
})

server.on("connection", (_ws) => {
  // _ws 是本地的客户端

  // 先返回一些信息回去
  _ws.send(JSON.stringify({
    id: parseInt(Date.now() * Math.random()),
    username: "管理员",
    msg: "欢迎来到这里",
    date: Date.now(),
  }))

  _ws.on("message", function (msg){
    // server 是全部的客户端集群
    
    server.clients.forEach(c => {
      c.send(msg);
    })
  })
})