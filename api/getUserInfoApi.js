var net = require("../utils/net.js");
var params = [];
var postParams = {};

function getUserInfo(fields,success,fail,compelet){
    params.push({"api_name":"xiaocao.user.getUserInfo"});
    params.push({"appid":net.appid});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
      params.push({"fields":fields});
      var arrayParams = net.sortParams(params)
      //params.push({"token":net.getTokenByArray(params)});
      //console.log(arrayParams); 
      postParams = net.getPostParams(arrayParams);
      console.log(postParams); 
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
}

function editUserInfo(fields,values,success,fail,compelet){
    params.push({"api_name":"xiaocao.user.editUserInfo"});
    params.push({"appid":net.appid});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
      params.push({"field":fields});
      params.push({"value":values})
      var arrayParams = net.sortParams(params)
      //params.push({"token":net.getTokenByArray(params)});
      //console.log(arrayParams); 
      postParams = net.getPostParams(arrayParams);
      console.log(postParams); 
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
}

module.exports = {
  getUserInfo: getUserInfo,
  editUserInfo:editUserInfo,
}