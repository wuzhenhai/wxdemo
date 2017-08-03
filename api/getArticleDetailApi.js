var net = require("../utils/net.js");
var params = [];
var postParams = {};

//获取文章详情
function getArticleDetail(article_id,success,fail,compelet){
    params.push({"api_name":"xiaocao.generalArticle.getArticleDetail"});
    params.push({"appid":net.appid});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
      params.push({"article_id":article_id});
      //var arrayParams = net.sortParams(params)//排序
      postParams = net.getParams(params);
      //console.log(postParams); 
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
  postParams = {};
}

//获取打赏列表
function getArticleRewardList(article_id,first_row,fetch_num,success,fail,compelet){
    params.push({"api_name":"xiaocao.socialArticle.getRewardList"});
    params.push({"appid":net.appid});
    params.push({"first_row":first_row}); 
    params.push({"fetch_num":fetch_num});
    params.push({"article_id":article_id});
    postParams = net.getPostParams(net.sortParams(params));
    net.request(postParams,success,fail,compelet)
    params = [];
    postParams = {};
}

//获取评论列表
function getCommentList(article_id,first_row,fetch_num,success,fail,compelet){
    params.push({"api_name":"xiaocao.socialArticle.getCommentList"});
    params.push({"appid":net.appid});
    params.push({"first_row":first_row}); 
    params.push({"fetch_num":fetch_num});
    params.push({"article_id":article_id});
    postParams = net.getPostParams(net.sortParams(params));
    net.request(postParams,success,fail,compelet)
    params = [];
    postParams = {};
}

//评论
function doComment(param,success,fail,compelet){
    params.push({"api_name":"xiaocao.socialArticle.doComment"});
    params.push({"appid":net.appid});
    params.push({"article_id":param.article_id});
    params.push({"contents":param.contents+""});
    params.push({"comment_id":param.comment_id});
    postParams = net.getPostParams(net.sortParams(params));
    //console.log(postParams); 
    net.request(postParams,success,fail,compelet)
    params = [];
}

module.exports = {
  getArticleDetail: getArticleDetail,
  getArticleRewardList:getArticleRewardList,
  getCommentList:getCommentList,
  doComment:doComment,
}