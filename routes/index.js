/**
 * Created by yangzx on 3/13/2015.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'usermanage');
var UserInfoSchema = require('../models/UserModel.js').userModel;
var UsersModel = db.model('userinfo', UserInfoSchema);
console.log(db.host + db.name);
db.once('open', function callback () {
    UsersModel.find({}, function(error, users) {
        if(error){return res.json({err:error});}

        console.log('open mongodb: Users :' + users.length);
    });

});
//mongodb中的collection 名字是 userinfo
exports.index = function(req, res) {
    res.render('index', {title: '用户管理'});
};

// JSON API for list of Users
exports.list = function(req, res) {
    //var userInfo = new UsersModel({ "UserId":"admin11", "index": "3", "UserName": "Michael", "Age": "28", "Sex": "男", "Email": "forxinly@163.com", "Phone": "1325658212", "Address":"xxx市xx地区" });
    //userInfo.save();
    UsersModel.find({}, function(error, users) {
        if(error){ return res.json({err:error});}
        console.log(users);
        res.json(users);
    });
};
// JSON API for getting a single User
exports.getUserInfo = function(req, res) {
    var userId = req.params.id;
    UsersModel.findById(userId, '', { lean: true },function(){});
}
// JSON API for create a  User
exports.createUserInfo = function(req, res) {
    var reqBody = req.body,
        userObj = reqBody.userInfo;
    var userInfo = new UsersModel(userObj);
    UsersModel.save(function(err, doc) {
        if(err || !doc) {
            throw 'Error' + err;
        } else {
            res.json(doc);
        }
    });
}

// JSON API for update a  User


// JSON API for delete a  User