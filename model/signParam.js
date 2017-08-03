function signParamSet(mobile,password,validCode){
 this.mobile = mobile;
 //this.mobile = "15168352432";
 this.password = password;
 //this.password = "123456";
 this.validCode = validCode;
}

module.exports = {
  signParamSet:signParamSet
}