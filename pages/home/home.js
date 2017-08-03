var app = getApp();
var listParam = require("../../model/param/getArticleListParam.js");
var api = require("../../api/getArticleListApi.js");
var pic_api = require("../../api/getCarouselPic.js");
var that;

Page({
  data: {
    list:[],
    imgUrls: [],  
    indicatorDots: true,  
    autoplay: true,  
    interval: 5000,  
    duration: 1000,
    doZanId:null,  
    pageHeight:100,
    hidden:true,
    load:"加载中..."
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad--home')
    that = this
    var param = new listParam.getArticleListParam("0","","");
    //console.log(param);
    api.getArticleList(param,success,fail,complete);
    pic_api.getCarouselList(picSuc,fail,complete);
    //获取屏幕高度
    var wh = app.globalData.windowHeight;
    this.setData({pageHeight:wh});
    //console.log(h);
  },
  articleClick:function(e){
      var id = e.currentTarget.dataset.id;
      console.log(id);
      wx.navigateTo({
        url: '../articleDetail/articleDetail?article_id=' + id,
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
  doZan:function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      doZanId:id,
    })
    api.doZan(id,1,doZanSuc,fail,complete);
  },
  // loadMore:function(e){
  //   console.log("loadMore");
  //   // wx.showToast({
  //   //   title: '载入中',
  //   //   icon: 'waiting',
  //   //   duration: 2000})
  //   this.setData({
  //     hidden:false,
  //   })
  //   var param = new listParam.getArticleListParam("0","",this.data.list.length);
  //   //console.log(param);
  //   api.getArticleList(param,getMoreSuc,fail,complete);
  // },
  onPullDownRefresh: function () {  
    //下拉  
    console.log("下拉");  
  },  
  onReachBottom: function () {  
    //上拉  
      console.log("loadMore");
    // wx.showToast({
    //   title: '载入中',
    //   icon: 'waiting',
    //   duration: 2000})
    this.setData({
      hidden:false,
    })
    var param = new listParam.getArticleListParam("0","",this.data.list.length);
    //console.log(param);
    api.getArticleList(param,getMoreSuc,fail,complete); 
  }

})

function fail(res){
  //console.log(res);
  if(res.data.msg){
       var  str = res.data.msg;
       console.log(str);
  }  
}

function success(res){
  console.log(res.data.data);
  that.setData({
    list:res.data.data.article_list
  })
}

function getMoreSuc(res){
  console.log(res.data.data);
  var oldList = that.data.list;
  if(res.data.data!=null){
    that.setData({
      list:oldList.concat(res.data.data.article_list),
    });
    console.log(oldList);
  }else{
    that.setData({
    load:"没有更多了",
  })
  }

  that.setData({
    hidden:true,
  })
}

function complete(){

}

function picSuc(res){
    console.log(res.data.data);
    if(res.data.data){
      that.setData({
       imgUrls:res.data.data,
      });
    }
}

function doZanSuc(res){
  console.log(res.data.data);
  //这几句代码等价于下面的for循环
  let currentIndex = that.data.list.findIndex(item => item.article_id === that.data.doZanId);
  that.setData({
        ['list['+ currentIndex +'].is_zan']:res.data.data.is_zan,
        ['list['+ currentIndex +'].zan_num']:res.data.data.zan_num_str,
      });
  //找到对应的文章，动态修改点赞状态
  // for(var i=0;i<that.data.list.length;i++){
  //   if(that.data.list[i].article_id === that.data.doZanId){
  //     that.setData({
  //       ['list['+ i +'].is_zan']:res.data.data.is_zan,
  //       ['list['+ i +'].zan_num']:res.data.data.zan_num_str,
  //     });
  //     break;
  //   }
  // }
}


