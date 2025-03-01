// const content = require('./b.js')
// const a  = 1;

// console.log(a)
// console.log(content)

const http = require("http");
const express = require("express");
console.log(express)
// 內建模組
/*
http.createServer(function(request,response){
 response.writeHead(200,{"Content-Type":"text/plain; charset=utf-8"});
 console.log('request',request)
 if (request.url === '/video'){
        console.log('首頁')
 } else{
        console.log('其他')
 }
 response.write("<h1>標題</h1>")
 response.end()
}).listen(8080);
*/