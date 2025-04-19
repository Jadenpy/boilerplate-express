require('dotenv').config()
let express = require('express');   //import express
const req = require('express/lib/request');
let app = express();                //create app

// create a middleware logs
function logs(req, res, next) {
    logInfo = req.method + " " + req.path + " " + "-" + " " + req.ip;    //method path - ip
    console.log(logInfo);
    next();
  }



console.log("Hello World");

// get method  returen string
// app.get("/",function(req, res) {res.send('Hello Express');});

// serve an HTML file
indexPath = __dirname + "/views/index.html";
console.log("indexPath:",indexPath);

cssPath = __dirname +"/public";
console.log("cssPath:",cssPath);

// serve an HTML with css
app.use("/public",express.static(cssPath)); // 使用"/Public"路径下的static中间件"
app.get("/",function(req, res){res.sendFile(indexPath)});

// use middleware logs
app.use(logs)

// serve a json object

// let variable

app.get("/json",function(req, res){
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({message: message.toUpperCase()});
    }else{
        res.json({message: message});
    } 
});

// copy教程中的示例代码
// app.get('/user', function(req, res, next) {
//     req.user = getTheUserSync();  // Hypothetical synchronous operation
//     next();
//   }, function(req, res) {
//     res.send(req.user);
//   });


// 通过链式调用中间件来创建时间服务
// app.get('/now', ...)
// req.time = new Date().toString()
// {time: req.time}
app.get(
    '/now',
    // function(req, res, next){
    //     req.time = new Date().toString();
    //     next();
    // },
    function(req, res, next) {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Shanghai'
        };
        const formatter = new Intl.DateTimeFormat('zh-CN', options);
        req.time = formatter.format(now);
        next();
    },
    function(req,res){
        res.send({time: req.time});
    }
)

// 从客户端获取输入的路由参数
app.get(
    '/:world/echo',
    (req, res) => {
        res.send(
            {echo: req.params.world}
        )
    }
)
































 module.exports = app;
