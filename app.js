var express = require('express')
    , path = require('path')
    , routes = require('./routes/index')
    , ejs = require('ejs')
    , app = express()
    , http = require('http');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3001);
// view engine setup
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));


app.get('/userlist/:id', routes.list);
app.get('/userInfo/:id', routes.getUserInfo);
app.post('/userInfo', routes.createUserInfo);
app.post('/userInfo/:id', routes.updateUserInfo);
app.delete('/deleteUser', routes.deleteUserInfo);

// catch 404 and forward to error handler

// error handlers
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//创建一个server
var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// angular启动页
app.get('/', function (req, res) {
    res.sendfile('app/index.html');
});


module.exports = app;
