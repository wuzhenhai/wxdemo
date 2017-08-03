// pages/articleDetail/articleDetail.js
var api = require("../../api/getArticleDetailApi.js");
var doCommentParam = require("../../model/param/doCommentParam.js");
// import Promise from 'polyfill';
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var that;

Page({
  data:{
    article_id:'',
    detail:"",
    articleInfo:null,
    hideDialog:false,
    windowHeight:0,
    animationData: null,
    showModalStatus: false,
    contents:'',
    comment_id:"",
    commentList:null,
    btnLoading:false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    that = this;
    new app.WeToast();
      
    // wx.chooseImage({
    //   count: 5, // 默认9
    //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     var tempFilePaths = res.tempFilePaths
    //   }
    // })
    
    this.setData({
      article_id:options.article_id,
      windowHeight:app.globalData.windowHeight,
    });
    //console.log(this.data.windowHeight);
    //获取文章相关资料
    api.getArticleDetail(options.article_id,detailSuc,fail,complete);
    api.getArticleRewardList(options.article_id,"","",success,fail,complete);
    api.getCommentList(options.article_id,"","",success,fail,complete);
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
  cancel:function(){
    this.setData({
      hideDialog:true,
    })
  },
  confirm:function(){
    this.setData({
      hideDialog:!this.hideDialog,
    })
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
  reply:function(){
    this.showModal();
  },
  doReply:function(){
    if(that.data.contents!=""){
      this.setData({
        btnLoading:true,
      });
      var param = new doCommentParam.doCommentParamSet(that.data.article_id,that.data.contents,that.data.comment_id);
      api.doComment(param,comtSuc,fail,complete);
    }else{
      console.log("内容不能为空");
    }
  },
  areaInput:function(e){
     this.setData({
      contents:e.detail.value
    })
  },
  replyComt:function(e){
    var id = e.currentTarget.dataset.comtid;
    //console.log(e);
    this.setData({
      comment_id:id,
    });
 
    this.showModal();
  },
})



function fail(res){
  if(res.data.msg){
       var  str = res.data.msg;
       console.log(str);
        that.wetoast.toast({
            title: str,
            duration: 1000
        });
  }
}

function success(res){
  console.log(res.data);
}

//回复成功
function comtSuc(res){
  console.log(res.data);
  that.hideModal();
   wx.showToast({
      title: '回复成功',
      icon: 'success',
      duration: 1000
    });

  that.setData({
      comment_id:"",
      btnLoading:false,
    })
  api.getCommentList(that.data.article_id,"","",getComtListSuc,fail,complete);
}

function complete(){

}


function getComtListSuc(res){
   console.log(res.data.data);
   that.setData({
     commentList:res.data.data.comment_list,
   });
   console.log(that.data.commentList);
}

//获取详情
function detailSuc(res){
  console.log(res.data.data);
  if(res.data.data.contents){
    var noice = "<!DOCTYPE html>";
    //正则表达式
    var noice2 = /width:auto!important;height:auto!important;/g
    var contents = res.data.data.contents.replace(noice,"");
    contents = contents.replace(noice2,"");
    //console.log(contents);
    // that.setData({
    //     detail:contents,
    //   })
    //去除<style>标签内容
    var style_Pattern=/<style>[\s\S]*?<\/style>/ig;
    var result = contents.match(style_Pattern);
    contents = contents.replace(result,"");
    WxParse.wxParse('detail', 'html', contents, that,0);


    //author_info
        that.setData({
        articleInfo:res.data.data,
        commentList:res.data.data.article_comment_list?res.data.data.article_comment_list.comment_list:null,
      })
  }
}



