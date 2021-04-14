//const { request, response } = require('express');
const express = require("express")
const server = express()
const routes = require("./routes")

server.set('view engine', 'ejs')

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))
//server.get('/',(request,response) => {
//    return response.sendFile(__dirname +"/views/index.html")
//})
server.use(routes)

server.listen(3000, () => console.log('rodando'))
