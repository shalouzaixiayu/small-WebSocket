// open 
// error
// close 
// connection
// message
const WebSocket  = require('ws');
const ws =  new WebSocket.Server({
  port: 3001,
})

ws.on("open", (e) => {
  console.log('123')
})


ws.on("connection", (_ws) => {

  _ws.on("message", (msg) => {
    console.log(msg)
    // 通过客户端轮询发送回去
    ws.clients.forEach(c => c.send(msg, (err) => console.log(err)))
    console.log(_ws)
  })
  
  // 通过服务器向客户端发送请求 
  _ws.send(JSON.stringify({
    username:"管理员",
    date:Date.now(),
    msg:"你好啊， 这里是简易的聊天室！"
  }))
})




