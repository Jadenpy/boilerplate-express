require('dotenv').config()
let express = require('express');   //import express
const req = require('express/lib/request');
let app = express();                //create app
let bodyParser = require('body-parser');

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


// 从客户端获取输入的查询参数   ？  =
// API: GET /name     ?first=firstname&last=lastname
// res: { name: 'firstname lastname'}
// 推荐写法: app.route(path).get(handler).post(handler)

// 使用 body-parser 来解析 POST 请求
// body-parser 已经安装并且在你项目的 package.json 文件中。 
// 在 myApp.js 文件的顶部包含（require）它，并将其存储在名为 bodyParser 的变量中。 
// bodyParser.urlencoded({extended: false}) 返回处理 URL 编码数据的中间件。 
// 将上一个方法调用返回的函数传递给 app.use()。
app.use(bodyParser.urlencoded({extended: false}));
// 像往常一样，中间件必须在所有依赖它的路由之前安装。
// 注意： extended 是一个配置选项, 告诉 body-parser 需要使用哪个解析。 
// 当 extended=false 时，它使用经典编码 querystring 库。 当 extended=true时，它使用 qs 库进行解析。
// 当使用 extended=false 时，值可以只是字符串或数组。 
// 使用 querystring 时返回的对象并不继承的 JavaScript Object，这意味着 hasOwnProperty、toString 等函数将不可用。 
// 拓展版本的数据更加灵活，但稍逊于 JSON。
app.use(bodyParser.json())
// app.post(
//     '',
//     () => {
app.route('/name').get(
    (req, res) => {
        // console.log(
        // 'query语句',req.query
        // );
        let queryName = req.query;
        let name = queryName.first + ' ' + queryName.last
        res.json({ name: name })

    }
).post(
    (req, res) => {
        console.log('req.body的内容:',req.body);
        let {first:firstName, last:lastName} = req.body;
        // console.log('this is the testing')
        // console.log('first:',firstName);
        // console.log('last:', lastName);
        // console.log('name:', `${firstName} ${lastName}`)
        res.json({name: `${firstName} ${lastName}`})
    }
)




//     }
// )






























 module.exports = app;
