function getArticleListParam(type,fetch_num,first_row){
 this.type = type;
 this.fetch_num = fetch_num;
 this.first_row = first_row;
}

module.exports = {
  getArticleListParam:getArticleListParam
}