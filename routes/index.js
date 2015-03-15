/**
 * Created by yangzx on 3/13/2015.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'usermanage');
var UserInfoSchema = require('../models/UserModel.js').userModel;
var UsersModel = db.model('userinfo', UserInfoSchema);
console.log(db.host + "/"+ db.name);

//mongodb中的collection 是 userinfos
exports.index = function(req, res) {
    res.render('index', {title: '用户管理'});
};

// JSON API for list of Users
exports.list = function(req, res) {
    
    var userId = req.params.id;
    if (userId == "userlist") {
        var paramQ = {};
        if(req.query.userName){
            paramQ.UserName = req.query.userName;
        }
        UsersModel.find(paramQ, function(error, users) {
            if(error){ return res.json({err:error});}
            //console.log(users);
            res.json(users);
        });        
    }else{
        UsersModel.findOne({UserId:userId}, function(error, users) {
            if(error){ return res.json({err:error});}
            //console.log(users);
            res.json(users);
        });
    };

};
// JSON API for getting a single User
exports.getUserInfo = function(req, res) {
    var userId = req.params.id;
    UsersModel.findById(userId, '', { lean: true },function(){});
}
// JSON API for create a  User
exports.createUserInfo = function(req, res) {
    var reqBody = req.body;
    var newUser = {
      UserId: reqBody.UserId
    }
    //var userInfo = new UsersModel({ "UserId":"admin11", "index": "3", "UserName": "Michael", "Age": "28", "Sex": "男", "Email": "forxinly@163.com", "Phone": "1325658212", "Address":"xxx市xx地区" });
    //userInfo.save();
    var userInfo = new UsersModel(newUser);
    userInfo.UserId = reqBody.UserId;
    userInfo.UserName = reqBody.UserName;
    userInfo.PassWord = reqBody.PassWord;
    userInfo.index = reqBody.index;
    userInfo.Sex = reqBody.Sex;
    userInfo.Age = reqBody.Age;
    userInfo.Email = reqBody.Email;
    userInfo.Phone = reqBody.Phone;
    userInfo.Address = reqBody.Address;
    userInfo.save(function(err, doc) {
        console.log('create:'+doc);
        if(err || !doc) {
            throw 'Error' + err;
        } else {
            res.json(doc);
        }
    });
};

// JSON API for update a  User

exports.updateUserInfo = function(req, res) {
    var reqBody = req.body;

    UsersModel.findOne({UserId:req.body.UserId}, function(error, user) {
        if(error){ return res.json({err:error});}

        user.UserId = reqBody.UserId;
        user.UserName = reqBody.UserName;
        user.PassWord = reqBody.PassWord;
        user.index = reqBody.index;
        user.Sex = reqBody.Sex;
        user.Age = reqBody.Age;
        user.Email = reqBody.Email;
        user.Phone = reqBody.Phone;
        user.Address = reqBody.Address;
        user.save(function(err, doc) {
            console.log('update:'+doc);
            if(err || !doc) {
                throw 'Error' + err;
            } else {
                res.json(doc);
            }
        });
    });
    
};

// JSON API for delete a  User

exports.deleteUserInfo = function(req, res) {
    if (req.query.UserId) {
        UsersModel.remove({UserId:req.query.UserId}, function(error) {
            if(error){ return res.json({err:error});}
            res.json('ok');         
        });
    };

    
};