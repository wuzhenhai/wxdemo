var net = require("../utils/net.js");
var params = [];
var postParams = {};

function getArticleList(listParam,success,fail,compelet){
    params.push({"api_name":"xiaocao.generalArticle.getArticleList"});
    params.push({"appid":net.appid});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
      params.push({"type":listParam.type});
      params.push({"fetch_num":listParam.fetch_num});
      params.push({"first_row":listParam.first_row});
      var arrayParams = net.sortParams(params)
      //params.push({"token":net.getTokenByArray(params)});
      console.log(arrayParams); 
      postParams = net.getPostParams(arrayParams);
      console.log(postParams); 
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
}
//点赞
function doZan(articleId,type,success,fail,compelet){
    params.push({"api_name":"xiaocao.socialArticle.doZan"});
    params.push({"appid":net.appid});
    params.push({"relation_id":articleId});
    params.push({"type":type});
    postParams = net.getPostParams(net.sortParams(params));
    console.log(postParams); 
    net.request(postParams,success,fail,compelet)
    params = [];
}

//评论
function doZan(articleId,type,success,fail,compelet){
    params.push({"api_name":"xiaocao.socialArticle.doZan"});
    params.push({"appid":net.appid});
    params.push({"relation_id":articleId});
    params.push({"type":type});
    postParams = net.getPostParams(net.sortParams(params));
    console.log(postParams); 
    net.request(postParams,success,fail,compelet)
    params = [];
}

module.exports = {
  getArticleList: getArticleList,
  doZan:doZan,
}