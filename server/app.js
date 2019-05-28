var mongoose = require('mongoose');
var todos = require('./models/todo').Todo; 
mongoose.connect('mongodb://localhost:27017/todolist'); 
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.get('/getlist',function(reg, res) {
    todos.find(function(err,docs){    
        res.send(docs)
    });
})
app.get('/add',function(reg, res) {
    console.log(reg.query.name)
    var demo = new todos({name:reg.query.name})
    demo.save((err,doc)=>res.send(doc))
})
app.get('/del',function(reg, res) {
    todos.remove({_id:mongoose.Types.ObjectId(reg.query.id)},(err,doc)=>res.send(doc))
})
app.get('/update',function(reg, res) {
    todos.update({_id:mongoose.Types.ObjectId(reg.query.id)},{name:reg.query.oldname},(err,doc)=>res.send(doc))
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log(`应用实例，访问地址为 http://${host}:${port}`);
})