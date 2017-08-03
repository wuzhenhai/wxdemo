var net = require("../utils/net.js");
var params = [];

function login(loginParam,success,fail,compelet){
    params.push({"appid":net.appid});
    params.push({"api_name":"xiaocao.user.signin"});
  //if(typeof success == "function"&& typeof fail == "function"&&typeof compelet == "function"){
    params.push({"mobile":loginParam.mobile});
    params.push({"password":net.md5.hex_md5(loginParam.password)});
    var postParams =net.getPostParams(net.sortParams(params));
    
      console.log(postParams);
      net.request(postParams,success,fail,compelet)
  //}

  params = [];
}


module.exports = {
  login: login,
}