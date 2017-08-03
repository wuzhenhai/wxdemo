// pages/userCenter/userCenter.js
var userApi = require('../../api/getUserInfoApi.js');
var netApi = require('../../utils/net.js');
var app = getApp();
var that = null;
Page({
  data:{
    userInfo:null,
    animationData: null,
    showModalStatus: false,
    nickname:"",
  },
  onLoad:function(options){
    that = this;
    // 页面初始化 options为页面跳转所带来的参数
    //  console.log("getStorageSync:" + wx.getStorageSync("PHPSESSID"));
    //   if(wx.getStorageSync("PHPSESSID")==""){
    //     wx.redirectTo({
    //       url: '../index/index',
    //       success: function(res){
    //         // success
    //       },
    //       fail: function() {
    //         // fail
    //       },
    //       complete: function() {
    //         // complete
    //       }
    //     })
    //   }else{
    //     //console.log(app.userData.userInfo);
    //     // this.setData({
    //     //   userInfo:app.userData.userInfo,
    //     // })
    //     userApi.getUserInfo("headimgurl,nickname",success,fail,complete);
    //   }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
     if(wx.getStorageSync("PHPSESSID")==""){
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
      }else{
        //console.log(app.userData.userInfo);
        // this.setData({
        //   userInfo:app.userData.userInfo,
        // })
        if(this.data.userInfo==null){
          userApi.getUserInfo("headimgurl,nickname,left_money,mobile",success,fail,complete);
        }
      }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  logout:function(){
    wx.removeStorageSync("PHPSESSID");
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
    wx.showToast({
      title: '登出成功',
      icon: 'success',
      duration: 1000
    })
  },
  setHeadImg:function(){
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        // that.setData({
        //  ['userInfo.headimgurl']:res.tempFilePaths,
        // })
        netApi.uploadImage(that,res.tempFilePaths);

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  editUserHeadImg:function(path){
    console.log("path:"+path);
     userApi.editUserInfo("headimgurl",path,changeSuccess,fail,complete);
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  nameInput:function(e){
     this.setData({
      nickname:e.detail.value
    })
  },
  doChange:function(){
    userApi.editUserInfo("nickname",that.data.nickname,nameSuccess,fail,complete);
  }
})


function fail(res){
  if(res.data.msg){
       var  str = res.data.msg;
       console.log(str);
  }  
}

function success(res){
  console.log(res.data.data);
  if(res.data.data){
    that.setData({
          userInfo:res.data.data,
        })

    app.userData.userInfo = res.data.data;
  }

}

function complete(){

}

function changeSuccess(res){
  console.log(res.data);
}

function nameSuccess(res){
  console.log(res.data);
  that.hideModal();
  that.setData({
    ['userInfo.nickname']:that.data.nickname,
  })
}
