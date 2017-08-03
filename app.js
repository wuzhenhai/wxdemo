//app.js
let {WeToast} = require('weToast/wetoast.js'); //用于自定义Toast
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        that.globalData.windowHeight = res.windowHeight;
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
             
              console.log(that.globalData.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    //微信用户信息
    userInfo:null,
    windowHeight:200
  },
  userData:{
    //用于登录后的用户信息保存
    userInfo:null,
  },
  WeToast,
})