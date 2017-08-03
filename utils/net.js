var md5 = require('/md5.js');
//post 请求
function request(postData, doSuccess, doFail, doComplete) {
  //需要服务端返回sessionid 本地做储存
  var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
  if (session_id != "" && session_id != null) {
    var header = { 'content-type': 'application/x-www-form-urlencoded;', 'Cookie': 'PHPSESSID=' + session_id }
  } else {
    var header = { 'content-type': 'application/x-www-form-urlencoded;' }
  }
  //console.log(header);

  wx.request({
    url: post_url,
    data: postData,
    header: header,
    method: 'POST',
    success: function (res) {
      if (typeof doSuccess == "function") {
        //console.log(res.data);
        if (res.data.code == 0) {
          doSuccess(res);
        } else {
          doFail(res)
        }
      }
    },
    fail: function () {
      if (typeof doFail == "function") {
        doFail();
      }
    },
    complete: function () {
      if (typeof doComplete == "function") {
        doComplete();
      }
    }
  });
}

//上传图片
function uploadImage(page,path){
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: UPLOAD_BASE_URL,
      filePath: path[0], 
      name: UPFILE_NAME,
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        // 'session_token': wx.getStorageSync('session_token')
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) { 
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        var data = JSON.parse(res.data);//字符串转转JSON
        var imgUrl = data.data;
        //data是服务器返回的信息，头像的话话，就是头像的地址
        // console.log(data);
        page.setData({  //上传成功修改显示头像
          ['userInfo.headimgurl']: path[0],
        })

        page.editUserHeadImg(imgUrl);

      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
}

var postkey = "@J4*A9N7&B^A9Y7j6sWv8m6%q_p+z-h=";
var post_url = "https://xiaocao.beyondin.com/?m=api&a=api";
var appid = "xiaocaoandroidappid@U*NDd8vK1^2pKh";
var UPLOAD_BASE_URL = "https://xiaocao.beyondin.com/api/uploadImage/appid/xiaocaoandroidappid@U%2ANDd8vK1%5E2pKh/submit/submit";
var UPFILE_NAME="upfile";
//var postParams = {};

// function getToken(json){ 
//    //遍历Json获取其属性  
//     var str = "";
//     for(var key in json){  
//        str+= key + "=" +json[key];
//        str+="&"
//     } 
//     str = str.substring(0,str.length-1);
//     console.log(JSON.parse(JSON.stringify(json)),function(k,v){

//     })
//     console.log(json);
//     // for(var i=0;i<array.length;i++){

//     // }
//     str = str + postkey;
//     console.log(str);
//     str = md5.hex_md5(str);
//     return str;
// }


//升顺排列参数 -- 可以优化，目前用的冒泡排序 -- 注意越界
function sortParams(array) {
  //console.log(array.length);
  var oneKey;
  var twoKey;
  var temp;
  for (var t = array.length; t > 0; t--) {
    for (var i = 0; i < t - 1; i++) {
      //console.log(t);
      for (var key in array[i]) {
        oneKey = key;
        //console.log(oneKey);
      }
      for (var key in array[i + 1]) {
        twoKey = key;
      }

      var len_one = oneKey.length;
      var len_two = twoKey.length;
      var len = len_one > len_two ? len_two : len_one;

      //字符串比大小
      for (var j = 0; j < len; j++) {
        if (oneKey.charAt(j) == twoKey.charAt(j)) {
          //前面字符都相等的话,长度短排前面
          if (j == len - 1) {
            if (len_one > len_two) {
              temp = array[i];
              array[i] = array[i + 1];
              array[i + 1] = temp;
              break;
            }
          }
          continue;//相等的跳过，不用比较
        }
        //交换参数位置
        if (oneKey.charAt(j) > twoKey.charAt(j)) {
          temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;

          break;
        }
        break;
      }
    }
  }
  return array;
}


//获取令牌
function getTokenByParams(array) {
  var k;
  var v;
  var str = "";
  for (var i = 0; i < array.length; i++) {
    for (var key in array[i]) {
      str += key + "=" + array[i][key];
      str += "&"
    }
  }
  //去掉最后一个字符 也就是最后的那个&符号
  str = str.substring(0, str.length - 1);

  //加入key
  str = str + postkey;
  //console.log(str);
  //进行md5码加密
  str = md5.hex_md5(uTF8Encode(str));
  console.log("md5:" + str);
  return str;
}

//构造json对象，用于post请求 [{a:b},{c:d},{f:e}] ---> {a:b,c:d,f:e}
function getPostParams(array) {
  var post = {};
  for (var i = 0; i < array.length; i++) {
    for (var key in array[i]) {
      post[key] = array[i][key];
    }
  }
  post.token = getTokenByParams(array);
  //console.log(post);
  return post;
}

//获取最终post数据
function getParams(array) {
  return getPostParams(sortParams(array));
}

//对中文进行utf8编码
function uTF8Encode(string) {
	string = string.replace(/\x0d\x0a/g, "\x0a");
  console.log(output);
	var output = "";
	for(var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		if(c < 128) {
			output += String.fromCharCode(c);
		} else if((c > 127) && (c < 2048)) {
			output += String.fromCharCode((c >> 6) | 192);
			output += String.fromCharCode((c & 63) | 128);
		} else {
			output += String.fromCharCode((c >> 12) | 224);
			output += String.fromCharCode(((c >> 6) & 63) | 128);
			output += String.fromCharCode((c & 63) | 128);
		}
	}
  console.log(output);
	return output;
};

//中文转unicode
function unicode(str){
			var value='';
			for (var i = 0; i < str.length; i++) {
				value += '\\u' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
			}
			return value;
		}
		function left_zero_4(str) {
			if (str != null && str != '' && str != 'undefined') {
				if (str.length == 2) {
					return '00' + str;
				}
			}
			return str;
		}


module.exports = {
  request: request,
  appid: appid,
  md5: md5,
  sortParams: sortParams,
  getPostParams: getPostParams,
  getParams: getParams,
  uTF8Encode:uTF8Encode,
  uploadImage:uploadImage,
}