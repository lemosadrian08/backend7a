const express = require('express');
const path =require('path');

/* const apiRoutes = require('./routers/app.routers');
const ProductsApi = require ('./models/productsContainer');
const productsApi = new ProductsApi('./models/products.json') */

const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const PORT = process.env.PORT || 8080;


const dbConfig =require('./db/config')
const SQLCient = require('./db/Products/sql.products');
const SQLCientChat = require('./db/Products/sql.messages');
const sqlClientProducts = new SQLCient(dbConfig.mariaDB, "products")
const sqlClientMessages = new SQLCientChat(dbConfig.sqlite, "chat")


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));


//Listen
const connectedServer = httpServer.listen(PORT, ()=>{
  console.log("Server is up and running on port ", PORT);
});

connectedServer.on('error', (error) => {
  console.error('Error: ', error);
})

/* 
// Socket Events
//Products
io.on('connection', async (socket)=>{
  console.log("New Clien conection");
  
  socket.emit("products", await sqlClientProducts.getAllDB())

  socket.on("new-product", async (newProduct)=>{
    await sqlClientProducts.saveDB(newProduct)
    io.sockets.emit("products", await sqlClientProducts.getAllDB()) 
  })

 
}) */

//Chat
io.on("connection",async (socket) => {
    console.log("There is a new client in the chat");
    
    socket.emit("messages", await sqlClientMessages.traer());
  
    socket.on("new-message", async (data) => {
       await sqlClientMessages.guardar(data)
      io.sockets.emit("messages", await sqlClientMessages.traer()); 
    });
  });