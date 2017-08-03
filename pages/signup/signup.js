// pages/signup/signup.js
var signParam = require('../../model/signParam.js');
var sign_api = require('../../api/signApi.js');
var that = null;

Page({
  data:{
    password:"",
    mobile:"",
    validCode:"",
    second: 60,
    getVCode:"获取验证码",
    notice:"",
    resend:false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    that = this;
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  userNameInput:function(e){
  this.setData({
      mobile:e.detail.value
  })
  //console.log(this.data.mobile);
 },
 passWdInput:function(e){
  this.setData({
    password:e.detail.value
  })
  //console.log(this.data.password);
 },
 validInput:function(e){
  this.setData({
    validCode:e.detail.value
  })
  //console.log(this.data.password);
 },
  getValidCode:function(){
     if(that.data.mobile!=""){
      //countdown();
      sign_api.getValidCode(this.data.mobile,sendSuc,fail,complete);
     }else{
      that.setData({
        notice:'请输入手机号码',
      })
     }   
  },
  sign:function(){
    var param = new signParam.signParamSet(this.data.mobile,this.data.password,this.data.validCode);
    sign_api.sign(param,success,fail,complete);
  },
})


function fail(res){
  console.log(res); 
  if(res.data.msg){
    that.setData({
      notice:res.data.msg,
    })
  }
}

//注册成功
function success(res){
   console.log(res.data);
   wx.redirectTo({
     url: '../index/index',
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

function complete(res){
  
}

//成功发送验证码
function sendSuc(res){
   console.log(res.data);
   that.setData({
        second: 60
      });

   that.setData({
        resend:true,
      })

   that.setData({
        getVCode:"重发(" + that.data.second + ")",
      });

    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 1000
    })
   countdown();
}


function countdown() {
  var second = that.data.second;
  if (second == 0) {
    // console.log("Time Out...");
    that.setData({
       resend:false,
     })

    that.setData({
      getVCode: "获取验证码" }
    );

    return ;
  }

var time = setTimeout(function(){
  that.setData({
       second: second - 1
     });

  that.setData({
       getVCode:"重发(" + that.data.second + ")",
     });

  countdown(that);
}
,1000)}
