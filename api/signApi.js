var net = require("../utils/net.js");
var params = [];

function sign(signParam,success,fail,compelet){
    params.push({"appid":net.appid});
    params.push({"api_name":"xiaocao.user.signup"});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
    params.push({"mobile":signParam.mobile});
    params.push({"verify_code":signParam.validCode});
    params.push({"password":net.md5.hex_md5(signParam.password)});
    var postParams =net.getPostParams(net.sortParams(params));
    
      console.log(postParams);
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
}

function getValidCode(mobile,success,fail,compelet){
    params.push({"appid":net.appid});
    params.push({"api_name":"xiaocao.user.sendVerifyCode"});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
    params.push({"mobile":mobile});
    var postParams =net.getPostParams(net.sortParams(params));
    
      console.log(postParams);
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
}

module.exports = {
  sign: sign,
  getValidCode:getValidCode,
}