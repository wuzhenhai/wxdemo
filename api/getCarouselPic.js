//获取轮播图

var net = require("../utils/net.js");
var params = [];
var postParams = {};

function getCarouselList(success,fail,compelet){
    params.push({"api_name":"xiaocao.other.getFlashList"});
    params.push({"appid":net.appid});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
      postParams = net.getPostParams(net.sortParams(params));
      console.log(postParams); 
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
}

module.exports = {
  getCarouselList: getCarouselList,
}