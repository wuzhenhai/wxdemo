var app = getApp();

Page({
  data: {
    motto: 'Setting page',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.setData({
      motto:app.user_id
    })
   
  },

})