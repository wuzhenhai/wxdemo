//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js');
var loginParam = require('../../model/loginParam.js');
var login_api = require('../../api/loginApi.js');
var flag = true;
var color2 = "";
var content = "";
var that;
var user_id = "who";

//var post_url = 'http://xiaocao.beyondin.com/?m=api&a=api'
var postData = {'api_name':'xiaocao.user.signin','appid':'xiaocaoandroidappid@U*NDd8vK1^2pKh'};
var md5_str = "";

Page({
  data: {
    motto: '',
    userInfo2: {},
    color:'pink',
    md5:'',
    username:'',
    password:'',
    show:true,
  },
  //事件处理函数
  bindViewTap: function() {
    app.user_id = user_id;
    wx.navigateTo({
      url: '../home/home'
    })
  },
 userNameInput:function(e){
  this.setData({
      username:e.detail.value
  })
  //console.log(this.data.username);
 },
 passWdInput:function(e){
  this.setData({
    password:e.detail.value
  })
  //console.log(this.data.password);
 },
 hclick:function(){
   content = util.formatTime(new Date());
     console.log('click');
     if(flag){
       color2 = "red_click";
       flag = false;
     }else{
       color2 = "red";
       flag = true;
     }

    this.setData({
         color:color2,
         motto:content
       });
  },
  //登录
  login:function(){
  //获取加密后的md5码
    var param = new loginParam.loginParamSet(this.data.username,this.data.password);
     console.log(param);
    login_api.login(param,seccess,fail,complete);
    
  },
  onLoad: function () {
    console.log('onLoad')
    that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo2:userInfo
      })
    })
  },

  onShow: function(){
     console.log('onShow');
  },

  //跳转到注册页面
  goSign:function(){
      wx.navigateTo({
        url: '../signup/signup',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  //返回文章列表页面
  goHome:function(){
      wx.switchTab({
          url: '../home/home',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
  }
})


function fail(res){
  if(res.data.msg){
       var  str = res.data.msg;
        that.setData({
          motto:str
        });
  }  
}

//登录请求成功
function seccess(res){

  if(res.data!=null){
  console.log(res.data);
  var str = "";
  if(res.data.data!=null)
    str += "userid =" + res.data.data.user_id;
    app.user_id = res.data.data.user_id;
    wx.setStorageSync('PHPSESSID', res.data.data.phpsessid);
    //app.userData.userInfo = res.data.data;
  }
  that.setData({
    motto:str
  });

  
//跳转到个人中心
  wx.switchTab({
         url: '../userCenter/userCenter',
         success: function(res){
           // success
         },
         fail: function() {
           // fail
         },
         complete: function() {
           // complete
         }
       })

  wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1000
    })

}

function complete(){

}



